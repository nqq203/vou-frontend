import api from "./api";

export const callApiCreateEvent = async (eventData) => {
    console.log("Api: ", eventData);
    const {data} = await api.post(`/events`,eventData);
    // const {data} = await api.get(`/events`,eventData);
    return data;
}