// Helper function for unified API responses
export const sendResponse = (success, message, data = null, status = 200) => {
  if (success) {
    return {
      success: true,
      message: message || 'Request was successful',
      data: data || null,
    };
  } else {
    return {
      success: false,
      message: message || 'An error occurred',
      error: data || 'Server error',
    };
  }
};