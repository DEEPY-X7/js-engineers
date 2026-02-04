// ------------------------------------------------------
// Validation Utilities for All API Inputs
// No external library required (simple, fast, stable)
// ------------------------------------------------------

// Helper: return uniform error format
function error(msg) {
  return { success: false, errors: [msg] };
}

// Helper: check required fields
function missing(field, value) {
  if (!value || value.toString().trim() === "") {
    return `${field} is required`;
  }
  return null;
}

// ------------------------------------------------------
// SERVICE Validation
// ------------------------------------------------------
export function validateService(data) {
  let errors = [];

  const e1 = missing("title", data.title);
  if (e1) errors.push(e1);

  const e2 = missing("description", data.description);
  if (e2) errors.push(e2);

  return errors.length  
    ? { success: false, errors }
    : { success: true };
}



// ------------------------------------------------------
// GALLERY Validation
// ------------------------------------------------------
export function validateGallery(data) {
  let errors = [];

  const e1 = missing("image", data.image);
  if (e1) errors.push(e1);

  // caption optional (so no validation needed)

  return errors.length  
    ? { success: false, errors }
    : { success: true };
}



// ------------------------------------------------------
// TESTIMONIAL Validation
// ------------------------------------------------------
export function validateTestimonial(data) {
  let errors = [];

  const e1 = missing("name", data.name);
  if (e1) errors.push(e1);

  const e2 = missing("message", data.message);
  if (e2) errors.push(e2);

  // rating: optional but if provided must be valid
  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    errors.push("rating must be between 1 and 5");
  }

  return errors.length  
    ? { success: false, errors }
    : { success: true };
}



// ------------------------------------------------------
// CONTACT Validation
// ------------------------------------------------------
export function validateContact(data) {
  let errors = [];

  const e1 = missing("name", data.name);
  if (e1) errors.push(e1);

  const e2 = missing("email", data.email);
  if (e2) errors.push(e2);

  const e3 = missing("message", data.message);
  if (e3) errors.push(e3);

  // phone optional
  return errors.length
    ? { success: false, errors }
    : { success: true };
}



// ------------------------------------------------------
// APPOINTMENT Validation
// ------------------------------------------------------
export function validateAppointment(data) {
  let errors = [];

  const e1 = missing("name", data.name);
  if (e1) errors.push(e1);

  const e2 = missing("email", data.email);
  if (e2) errors.push(e2);

  const e3 = missing("phone", data.phone);
  if (e3) errors.push(e3);

  const e4 = missing("serviceType", data.serviceType);
  if (e4) errors.push(e4);

  const e5 = missing("date", data.date);
  if (e5) errors.push(e5);

  return errors.length  
    ? { success: false, errors }
    : { success: true };
}