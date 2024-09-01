import api from "./api";

export const callApiGetAllBrands = async () => {
    const {data} = await api.get(`/brands`);
    return data;
}