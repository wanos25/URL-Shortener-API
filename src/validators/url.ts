export function validateShorten(body: any) {
  if (!body?.originalUrl) return "originalUrl is required";
  try {
    new URL(body.originalUrl);
  } catch {
    return "originalUrl must be a valid URL";
  }
  return null;
}
