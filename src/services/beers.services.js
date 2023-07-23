import axiosInstance from "./axiosInstance";

export const getBeers = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};
