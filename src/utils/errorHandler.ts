import { toast } from 'react-toastify';

export const handleError = (error: any) => {
  console.error('An error occurred:', error);
  
  let errorMessage = 'An unexpected error occurred. Please try again.';
  
  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Invalid email or password.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters long.';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
  }

  toast.error(errorMessage);
};