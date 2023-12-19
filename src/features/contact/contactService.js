import api from "api/api"

const postQuery = (contactData) => {
  return api.post("enquiry", contactData).then((res) => res.data)
}

export const contactService = {
  postQuery,
}
