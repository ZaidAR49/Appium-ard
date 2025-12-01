export function extractOtp(emailBody) {
  if (!emailBody || typeof emailBody !== "string") return null;
  const otpRegex = /\b(\d{4,8})\b/;
  const match = emailBody.match(otpRegex);
  return match ? match[1] : null;
}
