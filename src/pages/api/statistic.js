import api from "./api";

export const callApiGetDashboardAdmin = async () => {
    const {data} = await api.get(`/events/statistics`);
    return data;
}