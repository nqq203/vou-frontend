import api from "./api";

export const callApiGetItems = async () => {
    const {data} = await api.get(`/items`);
    return data;
}