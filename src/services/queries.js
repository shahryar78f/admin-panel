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

export const getProducts = async () => {
  try {
    return api
      .get("/products")
      .then((res) => res.data)
      .catch((error) => {
        console.log("error fetching comment data:", error);
        return null;
      });
  } catch (error) {
    return { error };
  }
};

export const addProducts = async (data) => {
  return api
    .post("/products", data)
    .then((res) => res.data)
    .catch((error) => {
      return { error };
    });
};

export const deleteProduct = async (productId) => {
  return api
    .delete(`/products/${productId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log("error delete product, error", error);
      return { error };
    });
};

export const editProduct = async (productId, data) => {
  return api
    .put(`/products/${productId}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log("error delete product, error", error);
      return { error };
    });
};
