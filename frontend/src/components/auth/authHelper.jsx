export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.clear();
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const isUser = () => {
  const user = getUser();
  return user?.role === "user";
};