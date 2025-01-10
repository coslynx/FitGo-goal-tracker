#!/bin/bash

set -euo pipefail

# Environment setup
source .env

# Directories and files
PROJECT_ROOT=$(pwd)
LOG_FILE="${PROJECT_ROOT}/logs/startup.log"
PID_FILE="${PROJECT_ROOT}/logs/startup.pid"

# Environment variables
DB_HOST="${MONGODB_URI}"
API_PORT="${API_PORT:-3000}"
FRONTEND_PORT="${FRONTEND_PORT:-3001}"

# Utility functions
log_info() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

log_error() {
  >&2 echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: $1" >> "$LOG_FILE"
}

cleanup() {
  log_info "Cleaning up..."
  
  if [ -f "$PID_FILE" ]; then
    local backend_pid=$(cat "$PID_FILE" | head -n 1)
    local frontend_pid=$(cat "$PID_FILE" | tail -n 1)
    
    kill "$backend_pid" || true
    kill "$frontend_pid" || true
    
    rm -f "$PID_FILE"
  fi
  
  log_info "Cleanup complete."
}

trap cleanup EXIT ERR

# Dependency checks
check_dependencies() {
  log_info "Checking dependencies..."
  
  command -v node >/dev/null 2>&1 || { log_error "Node.js is required but it's not installed."; exit 1; }
  command -v npm >/dev/null 2>&1 || { log_error "npm is required but it's not installed."; exit 1; }
  command -v mongod >/dev/null 2>&1 || { log_error "MongoDB is required but it's not installed."; exit 1; }
  
  log_info "All dependencies are met."
}

# Health checks
check_port() {
  local port=$1
  
  if nc -z localhost "$port"; then
    return 0
  else
    return 1
  fi
}

wait_for_service() {
  local service_name=$1
  local port=$2
  local timeout=$3
  
  log_info "Waiting for $service_name to start on port $port..."
  
  local start_time=$(date +%s)
  while ! check_port "$port"; do
    if [ $(($(date +%s) - start_time)) -gt "$timeout" ]; then
      log_error "$service_name failed to start within $timeout seconds."
      return 1
    fi
    sleep 1
  done
  
  log_info "$service_name is now available on port $port."
  return 0
}

verify_service() {
  local service_name=$1
  local endpoint=$2
  local timeout=$3
  
  log_info "Verifying $service_name health..."
  
  local start_time=$(date +%s)
  while ! curl -s "$endpoint" >/dev/null; do
    if [ $(($(date +%s) - start_time)) -gt "$timeout" ]; then
      log_error "$service_name health check failed within $timeout seconds."
      return 1
    fi
    sleep 1
  done
  
  log_info "$service_name is healthy."
  return 0
}

# Service management
start_database() {
  log_info "Starting MongoDB..."
  mongod --fork --logpath "$PROJECT_ROOT/logs/mongodb.log"
  
  if ! wait_for_service "MongoDB" "$DB_HOST" 30; then
    log_error "Failed to start MongoDB."
    return 1
  fi
  
  log_info "MongoDB is running."
}

start_backend() {
  log_info "Starting backend server..."
  
  cd "$PROJECT_ROOT/src/backend"
  npm install
  npm run start &
  local backend_pid=$!
  
  if ! wait_for_service "Backend" "$API_PORT" 60; then
    log_error "Failed to start backend server."
    return 1
  fi
  
  if ! verify_service "Backend" "http://localhost:$API_PORT/health" 30; then
    log_error "Backend server is not healthy."
    return 1
  fi
  
  echo "$backend_pid" >> "$PID_FILE"
  log_info "Backend server is running."
}

start_frontend() {
  log_info "Starting frontend service..."
  
  cd "$PROJECT_ROOT/src/frontend"
  npm install
  npm run start &
  local frontend_pid=$!
  
  if ! wait_for_service "Frontend" "$FRONTEND_PORT" 60; then
    log_error "Failed to start frontend service."
    return 1
  fi
  
  if ! verify_service "Frontend" "http://localhost:$FRONTEND_PORT" 30; then
    log_error "Frontend service is not healthy."
    return 1
  fi
  
  echo "$frontend_pid" >> "$PID_FILE"
  log_info "Frontend service is running."
}

store_pid() {
  log_info "Storing process IDs..."
  echo "$!" >> "$PID_FILE"
}

# Main execution
check_dependencies
start_database
start_backend
start_frontend

log_info "Startup complete. Application is running."
log_info "Backend API: http://localhost:$API_PORT"
log_info "Frontend: http://localhost:$FRONTEND_PORT"