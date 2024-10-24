import { api } from "../config/api";

export const postUserData = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return { res };
  } catch (error) {
    return { error };
  }
};
