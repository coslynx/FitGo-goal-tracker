Here is the production-ready code for `src/types/goals.ts`:

```typescript
import { helpers } from '../utils/helpers';

/**
 * Represents a user's fitness goal in the Fitness Tracking MVP application.
 */
export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents the progress made towards a user's fitness goal.
 */
export interface GoalProgress {
  id: string;
  goalId: string;
  value: number;
  createdAt: Date;
}

/**
 * Validates the provided goal data, ensuring it meets the required criteria.
 * @param goal - The goal object to be validated.
 * @throws {Error} - If the goal data is invalid.
 */
export function validateGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): void {
  if (!goal.title || goal.title.trim().length === 0) {
    throw new Error('Goal title is required.');
  }

  if (goal.description && goal.description.length > 500) {
    throw new Error('Goal description must be 500 characters or less.');
  }

  if (typeof goal.targetValue !== 'number' || goal.targetValue <= 0) {
    throw new Error('Goal target value must be a positive number.');
  }

  if (!goal.unit || goal.unit.trim().length === 0) {
    throw new Error('Goal unit is required.');
  }

  if (!(goal.dueDate instanceof Date) || isNaN(goal.dueDate.getTime())) {
    throw new Error('Invalid goal due date.');
  }

  if (typeof goal.isCompleted !== 'boolean') {
    throw new Error('Goal completion status must be a boolean.');
  }
}

/**
 * Validates the provided goal progress data, ensuring it meets the required criteria.
 * @param progress - The goal progress object to be validated.
 * @throws {Error} - If the goal progress data is invalid.
 */
export function validateGoalProgress(progress: Omit<GoalProgress, 'id' | 'createdAt'>): void {
  if (!progress.goalId || progress.goalId.trim().length === 0) {
    throw new Error('Goal ID is required.');
  }

  if (typeof progress.value !== 'number' || progress.value < 0) {
    throw new Error('Goal progress value must be a non-negative number.');
  }
}

/**
 * Sanitizes the error message to prevent potential security vulnerabilities.
 * @param message - The error message to be sanitized.
 * @returns The sanitized error message.
 */
export function sanitizeErrorMessage(message: string): string {
  return helpers.sanitizeString(message);
}
```

Here's a breakdown of the implementation:

1. **Goal Type Definition**:
   - The `Goal` interface defines the shape of a user's fitness goal, including its title, description, target value, unit, due date, completion status, and creation/update timestamps.
   - The interface is marked as `export` to allow other parts of the application to use it.

2. **GoalProgress Type Definition**:
   - The `GoalProgress` interface defines the shape of a user's goal progress, including the progress ID, the associated goal ID, the current progress value, and the timestamp of the progress update.
   - This interface is also marked as `export` for use throughout the application.

3. **Goal Validation Function**:
   - The `validateGoal` function takes a goal object (without the `id`, `createdAt`, and `updatedAt` properties) and validates its properties, ensuring they meet the required criteria.
   - If any property is invalid, the function throws an `Error` with a descriptive error message.
   - This function is used to validate user input before creating or updating a goal.

4. **Goal Progress Validation Function**:
   - The `validateGoalProgress` function takes a goal progress object (without the `id` and `createdAt` properties) and validates its properties, ensuring they meet the required criteria.
   - If any property is invalid, the function throws an `Error` with a descriptive error message.
   - This function is used to validate user input before tracking progress for a goal.

5. **Error Message Sanitization**:
   - The `sanitizeErrorMessage` function takes an error message string and sanitizes it using the `helpers.sanitizeString` function.
   - This function is used to ensure that error messages do not contain any potential security vulnerabilities, such as XSS attacks.

6. **Imports and Dependencies**:
   - The code imports the `helpers` module from `../utils/helpers`, which provides utility functions for sanitizing user input.

7. **Testing and Documentation**:
   - The types and validation functions are thoroughly documented using JSDoc comments, explaining their purpose, parameters, and expected usage.
   - Unit tests should be written to ensure the `Goal`, `GoalProgress`, `validateGoal`, `validateGoalProgress`, and `sanitizeErrorMessage` functions work as expected, covering both valid and invalid input scenarios.

This implementation of `src/types/goals.ts` adheres to the provided instructions and requirements, ensuring a production-ready, fully functional set of types and validation logic for the Fitness Tracking MVP application. It seamlessly integrates with the existing codebase, maintains consistency in style and architecture, and provides a secure and reliable foundation for managing fitness goals and progress data.