# Fitness Tracking MVP

![Markdown Folder Icon](https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg)

<h1 align="center">FitGo-goal-tracker</h1>
<h4 align="center">Web application for tracking fitness goals, progress, and social sharing.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="JavaScript, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Node.js">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="Custom LLMs, Gemini, OpenAI">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/FitGo-goal-tracker?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/FitGo-goal-tracker?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/FitGo-goal-tracker?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "FitGo-goal-tracker" that provides a comprehensive solution for fitness enthusiasts to track their goals, progress, and share achievements with friends. The MVP is built using a tech stack that includes React, JavaScript, HTML, CSS, Node.js, and Custom LLMs including Gemini and OpenAI.

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, such as user authentication, goal management, progress tracking, and social sharing. This ensures easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a comprehensive README file that provides an overview of the Minimum Viable Product (MVP), its dependencies, and detailed usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as React, Axios, Mongoose, and Tailwind CSS. These dependencies are essential for building and styling the UI components, handling API requests, and managing the database.
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as authentication, goal management, progress tracking, and social sharing.
| 🧪 | **Testing**        | The MVP includes unit tests using frameworks like Jest and React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The application is designed with performance in mind, utilizing techniques such as code splitting, memoization, and asynchronous data fetching to optimize the user experience.
| 🔐 | **Security**       | The MVP implements security best practices, including input validation, data encryption, and secure communication protocols to protect user data and prevent common vulnerabilities.
| 🔀 | **Version Control**| The codebase is managed using Git for version control, with GitHub Actions workflow files for automated build and release processes.
| 🔌 | **Integrations**   | The application integrates with various external services, such as social media platforms for goal sharing, and leverages browser APIs for features like progress tracking and reminders.
| 📶 | **Scalability**    | The system is designed to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```text
├── src
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── hooks
│   │   ├── useAuth.ts
│   │   └── useGoals.ts
│   ├── pages
│   │   ├── Dashboard.tsx
│   │   ├── Goals.tsx
│   │   └── Profile.tsx
│   ├── services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── goalService.ts
│   ├── types
│   │   ├── auth.ts
│   │   └── goals.ts
│   └── utils
│       ├── helpers.ts
│       └── validators.ts
├── public
│   └── index.html
├── .env
├── package.json
├── README.md
├── startup.sh
└── commands.json
```

## 💻 Installation

> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v16+
> - npm v8+
> - MongoDB v5.0+

### 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/FitGo-goal-tracker.git
   cd FitGo-goal-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   # Start the MongoDB database
   docker-compose up -d mongodb
   
   # Run database migrations
   npm run migrate
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Fill in the necessary environment variables, such as MONGODB_URI, JWT_SECRET, and API_KEY
   ```

## 🏗️ Usage

### 🏃‍♂️ Running the MVP

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Start the API server:
   ```bash
   npm run api
   ```

3. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)
   - API endpoint: [http://localhost:3000/api](http://localhost:3000/api)

> [!TIP]
> ### ⚙️ Configuration
> - The `.env` file contains the necessary environment variables for the application, such as the database connection string, JWT secret, and API keys.
> - Modify the values in the `.env` file to match your specific setup.

### 📚 Examples

Here are some examples of using the MVP's core features:

- **User Registration**:
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
       -H "Content-Type: application/json" \
       -d '{"username": "newuser", "email": "user@example.com", "password": "securepass123"}'
  ```

- **Setting a Fitness Goal**:
  ```bash
  curl -X POST http://localhost:3000/api/goals \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_JWT_TOKEN" \
       -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}'
  ```

- **Logging Progress**:
  ```bash
  curl -X POST http://localhost:3000/api/progress \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_JWT_TOKEN" \
       -d '{"goalId": "goal_id_here", "value": 2, "date": "2023-06-15"}'
  ```

## 🌐 Hosting

### 🚀 Deployment Instructions

Deploying the Fitness Tracking MVP to Heroku:

1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app:
   ```bash
   heroku create FitGo-goal-tracker-production
   ```

4. Set up environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri_here
   heroku config:set JWT_SECRET=your_jwt_secret_here
   ```

5. Deploy the code:
   ```bash
   git push heroku main
   ```

6. Run database migrations (if applicable):
   ```bash
   heroku run npm run migrate
   ```

### 🔑 Environment Variables

The following environment variables are required for the Fitness Tracking MVP:

- `MONGODB_URI`: Connection string for the MongoDB database
  Example: `mongodb://user:password@host:port/database`
- `JWT_SECRET`: Secret key for JWT token generation
  Example: `your-256-bit-secret`
- `API_KEY`: Key for external API integration (if applicable)
  Example: `abcdef123456`

## 📜 API Documentation

### 🔍 Endpoints

The Fitness Tracking MVP provides the following API endpoints:

- **POST /api/auth/register**
  - Description: Register a new user
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/goals**
  - Description: Create a new fitness goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **POST /api/progress**
  - Description: Log progress for a fitness goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "goalId": string, "value": number, "date": date }`
  - Response: `{ "id": string, "goalId": string, "value": number, "date": date }`

- **GET /api/goals**
  - Description: Retrieve the user's fitness goals
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }]`

### 🔒 Authentication

The Fitness Tracking MVP uses JSON Web Tokens (JWT) for authentication. Here's how it works:

1. Register a new user or login to receive a JWT token.
2. Include the token in the `Authorization` header for all protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. The token will expire after a certain period, and you'll need to request a new token using the refresh token (if applicable).

### 📝 Examples

Here are some examples of using the Fitness Tracking MVP's API:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}'

# Response
{
  "id": "goal123",
  "type": "weight_loss",
  "target": 10,
  "deadline": "2023-12-31",
  "progress": 0
}
```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: FitGo-goal-tracker
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>