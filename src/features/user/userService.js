import api from "api/api";

const register = (userData) => {
  return api.post("user/register", userData).then((res) => res.data);
};

const login = (userData) => {
  return api.post("user/login", userData).then((res) => res.data);
};

export const authService = {
  register,
  login,
};
