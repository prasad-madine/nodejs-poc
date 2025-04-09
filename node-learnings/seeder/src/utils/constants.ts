export const DATABASE_SYNC_SUCCESS = "Database synced successfully";
export const DATABASE_SYNC_FAILED = "Error connecting to the database:";
export const SERVICE_LISTEN = "Server is running on port";
export const USER = "/api/v1/users";
export const PAYMENT = "/api/v1/payments";
export const CONTRACT = "/api/v1/contracts";
export const CASHKICK = "/api/v1/cashkicks";
export const AUTH = "/api/v1";
export const LOGIN_ROUTE = "/login";
export const BY_USER_ID_ROUTE = "/:userId";
export const REGISTER_ROUTE = "/register";
export const GET_ALL_ROUTE = "/";

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  USER_EXIST: 409,
  UNAUTHORIZED: 403,
};

export const VALIDATION_ERRORS = {
  ERROR_NAME_REQUIRED: "Name is required.",
  ERROR_INVALID_EMAIL: "Invalid email format.",
  ERROR_EMAIL_REQUIRED: "Email is required.",
  ERROR_PASSWORD_REQUIRED: "Password is required.",
  ERROR_PASSWORD_REQUIREMENTS: "Password must meet the required criteria.",
  PASSWORD_REGEX:
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
  ERROR_CASH_KICK_AMOUNT: "Cash kick amount must be a non-negative integer.",
  ERROR_DUE_DATE_REQUIRED: "Due date is required.",
  ERROR_INVALID_DUE_DATE: "Invalid due date format.",
  ERROR_STATUS_REQUIRED: "Status is required.",
  ERROR_INVALID_STATUS: "Invalid status value.",
  ERROR_EXPECTED_AMOUNT_REQUIRED: "Expected amount is required.",
  ERROR_EXPECTED_AMOUNT_NUMBER: "Expected amount must be a number.",
  ERROR_OUTSTANDING_REQUIRED: "Outstanding amount is required.",
  ERROR_OUTSTANDING_NUMBER: "Outstanding amount must be a number.",
  ERROR_USER_ID_REQUIRED: "User ID is required.",
  ERROR_USER_ID_NUMBER: "User ID must be a number.",
  ERROR_MATURITY_REQUIRED: "Maturity date is required.",
  ERROR_INVALID_MATURITY: "Invalid maturity date format.",
  ERROR_INVALID_AMOUNT: "Invalid amount",
  ERROR_TYPE_REQUIRED: "Type is required.",
  ERROR_INVALID_TYPE: "Invalid type value.",
  ERROR_PER_PAYMENT_REQUIRED: "Per payment is required.",
  ERROR_PER_PAYMENT_NUMBER: "Per payment must be a number.",
  ERROR_TERM_LENGTH_REQUIRED: "Term length is required.",
  ERROR_TERM_LENGTH_NUMBER: "Term length must be a number.",
  ERROR_PAYMENT_AMOUNT_REQUIRED: "Payment amount is required.",
  ERROR_PAYMENT_AMOUNT_NUMBER: "Payment amount must be a number.",
};

export const INVALID_MSG = "Invalid email or password";
export const JWT_DEFAULT_KEY = "secretkey";
export const EXP_TIME = "10m";
export const INVALID_ID = "Invalid user ID";
export const CASHKICK_MSG = {
  CREATION_SUCCESS: "Cashkick created successfully",
  CREATION_FAILED: "Failed to create cashkick:",
  RETRIEVE_FAILED: "Failed to retrieve cashkicks for user:",
  NOT_FOUND: "Cashkick not found",
  RETRIEVE_SUCCESS: "Cashkicks retrieved successfully",
  ID_REQUIRED: "Contact id's are required",
};

export const CONTRACT_MSG = {
  CREATION_SUCCESS: "Successfully created contract",
  CREATION_FAILED: "Failed to create contract",
  RETRIEVE_FAILED: "Failed to retrieve contracts",
  RETRIEVE_SUCCESS: "Successfully fetced contracts",
};

export const PAYMENT_MSG = {
  CREATION_SUCCESS: "Payment created successfully",
  CREATION_FAILED: "Failed to create payment:",
  RETRIEVE_FAILED: "Failed to retrieve payments for user:",
  RETRIEVE_SUCCESS: "Payments retrieved successfully",
};

export const USER_MSG = {
  CREATION_SUCCESS: "User created successfully",
  CREATION_FAILED: "An error occurred while creating user:",
  RETRIEVE_FAILED: "Failed to retrieve cashkicks for user:",
  NOT_FOUND: "User not found",
  RETRIEVE_SUCCESS: "Successfully fetced user",
  UPDATE_SUCCESS: "Successfully updated user",
  UPDATE_FAILED: "An error occurred while updating user:",
  ALREADY_IN_USE: "Email already in use",
  USER_ID_NOT_FOUND: "User with id not found",
};
