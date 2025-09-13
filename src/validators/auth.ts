export function validateRegister(body: any) {
  if (!body?.email || !body?.password) return "Email and password are required";
  if (String(body.password).length < 6) return "Password must be at least 6 characters";
  return null;
}

export function validateLogin(body: any) {
  if (!body?.email || !body?.password) return "Email and password are required";
  return null;
}
