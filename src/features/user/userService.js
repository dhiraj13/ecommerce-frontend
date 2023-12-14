const { default: api } = require("@api/api");

const register = (userData) => {
  return api.post("user/register", userData).then((res) => res.data);
};

export const authService = {
  register,
};
