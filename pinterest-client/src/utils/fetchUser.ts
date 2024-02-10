export const fetchUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  return userInfo;
};
