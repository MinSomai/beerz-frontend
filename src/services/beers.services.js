import axiosInstance from "./axiosInstance";

export const getBeers = async ({ page = 1, limit = 10 } = {}) =>
  axiosInstance.get(`/beers?page=${page}&per_page=${limit}`).then((resp) => resp?.data);
