import api from "./api";

export const callApiGetDashboardAdmin = async () => {
    const {data} = await api.get(`/events/statistics`);
    return data;
}

export const callApiGetEventStatistic = async (idEvent) => {
    const {data} = await api.get(`/statistics/events/${idEvent}`);
    return data;
}

