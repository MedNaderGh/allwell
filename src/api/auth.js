import { api } from "../boot/axios";
/****************user************** */
export const signup = async (data) => {
  const response = await api.post(`/signup`, data);
  return response.data;
};
export const login = async (data) => {
  const response = await api.post(`/login`, data).catch(() => {
    return {};
  });
  return response.data;
};
export const sendEmail = async (data) => {
  const response = await api.post("/ResetMail", data);
  return response.data;
};
export const updatePassword = async (data) => {
  const response = await api.post("/changePassword", data);
  return response.data;
};
