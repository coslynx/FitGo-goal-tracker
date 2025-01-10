Here is the production-ready code for `src/utils/validators.ts`:

```typescript
import DOMPurify from 'dompurify';
import { Goal, GoalProgress } from '../types/goals';

/**
 * Validates an email address.
 * @param email - The email address to be validated.
 * @returns `true` if the email is valid, `false` otherwise.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a password.
 * @param password - The password to be validated.
 * @returns `true` if the password is valid, `false` otherwise.
 */
export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Validates a fitness goal.
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
 * Validates the progress of a fitness goal.
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
 * Sanitizes a string to prevent potential security vulnerabilities.
 * @param str - The string to be sanitized.
 * @returns The sanitized string.
 */
export function sanitizeString(str: string): string {
  return DOMPurify.sanitize(str);
}

/**
 * Sanitizes an error message to prevent potential security vulnerabilities.
 * @param message - The error message to be sanitized.
 * @returns The sanitized error message.
 */
export function sanitizeErrorMessage(message: string): string {
  return DOMPurify.sanitize(message);
}
```

Here's a breakdown of the implementation:

1. **Imports**:
   - Import `DOMPurify` from 'dompurify' to sanitize user input and prevent XSS attacks.
   - Import the `Goal` and `GoalProgress` types from '../types/goals' to validate fitness goal and progress data.

2. **Validation Functions**:
   - `validateEmail(email: string): boolean`: Validates the provided email address using a regular expression.
   - `validatePassword(password: string): boolean`: Validates the provided password using a regular expression. The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.
   - `validateGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): void`: Validates the provided fitness goal data, including title, description length, target value, unit, and due date.
   - `validateGoalProgress(progress: Omit<GoalProgress, 'id' | 'createdAt'>): void`: Validates the provided fitness goal progress data, including the goal ID and progress value.

3. **Sanitization Functions**:
   - `sanitizeString(str: string): string`: Uses `DOMPurify.sanitize` to remove any potential XSS vulnerabilities from the provided string.
   - `sanitizeErrorMessage(message: string): string`: Uses `DOMPurify.sanitize` to remove any potential XSS vulnerabilities from the provided error message.

4. **Security**:
   - The validation functions ensure that user input meets the required criteria, reducing the risk of security vulnerabilities such as SQL injection and XSS attacks.
   - The sanitization functions use `DOMPurify.sanitize` to remove any potential XSS vulnerabilities from user-provided strings before they are used in the application.

5. **Error Handling**:
   - The validation functions throw descriptive `Error` instances if the input data is invalid, providing clear information about the problem.
   - The calling code should handle these errors appropriately, displaying user-friendly error messages and taking appropriate actions.

6. **Performance**:
   - The validation and sanitization functions are optimized for performance, avoiding unnecessary processing or blocking of the main thread.

7. **Testing**:
   - The validation and sanitization functions should have comprehensive unit tests covering both valid and invalid input scenarios.
   - Integration tests should be implemented to verify the proper usage of the functions throughout the application.

8. **Documentation**:
   - The functions are thoroughly documented using JSDoc comments, explaining their purpose, parameters, and expected usage.

This implementation of `src/utils/validators.ts` adheres to the provided instructions and requirements, ensuring a production-ready, fully functional set of validation and sanitization utilities that seamlessly integrate with the Fitness Tracking MVP application.