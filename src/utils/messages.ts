import { ErrorCodes } from "./error-code"; // Ensure correct import path

export const SuccessMessages = {
  BOOKING_CREATED_SUCCESSFULLY: 'Booking created successfully.',
  BOOKING_UPDATED_SUCCESSFULLY: 'Booking updated successfully.',
  BOOKING_DELETED_SUCCESSFULLY: 'Booking deleted successfully.',
};

export const ErrorMessages = {
  [ErrorCodes.BOOKING_NOT_FOUND]: {
    message: 'Booking not found.',
    statusCode: 404,
    errorCode: ErrorCodes.BOOKING_NOT_FOUND,
  },
  [ErrorCodes.INVALID_BOOKING_DATA]: {
    message: 'Invalid booking data.',
    statusCode: 400,
    errorCode: ErrorCodes.INVALID_BOOKING_DATA,
  },
  [ErrorCodes.INTERNAL_SERVER_ERROR]: {
    message: 'Internal server error occurred.',
    statusCode: 500,
    errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
  },
  [ErrorCodes.INVALID_REQUEST]: {
    message: 'Invalid request.',
    statusCode: 400,
    errorCode: ErrorCodes.INVALID_REQUEST,
  },
};
