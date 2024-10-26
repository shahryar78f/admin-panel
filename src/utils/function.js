export const setTokenCookie = (token) => {
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // یک هفته اعتبار
  document.cookie = `token=${token}; expires=${expiryTime.toUTCString()}; path=/; Secure; SameSite=Strict`;
};

export const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export const sp = (number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber.join(",");
  return e2p(joinedNumber);
};
