export const setTokenCookie = (token) => {
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // یک هفته اعتبار
  document.cookie = `token=${token}; expires=${expiryTime.toUTCString()}; path=/; Secure; SameSite=Strict`;
};
