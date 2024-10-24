import { api } from "../config/api";

export const postUserData = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return { res };
  } catch (error) {
    return { error };
  }
};
export const postLoginUserData = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return { res };
  } catch (error) {
    return { error };
  }
};
