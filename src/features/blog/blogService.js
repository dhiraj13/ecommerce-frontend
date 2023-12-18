import api from "api/api";

const getBlogs = () => {
  return api.get("blog").then((res) => res.data);
};

const getBlog = (id) => {
  return api.get(`blog/${id}`).then((res) => res.data);
};

export const blogService = {
  getBlogs,
  getBlog,
};
