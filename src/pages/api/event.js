import api from "./api";

export const callApiCreateEvent = async (eventData) => {
    // console.log("Api: ", eventData);
    const {data} = await api.post(`/events`,eventData);
    return data;
}

export const callApiUploadEventImgs = async (idEvent, imagesData) => {
    const formData = new FormData();
    formData.append('bannerFile',imagesData[0]);
    formData.append('QRImage',imagesData[1]);
    formData.append('voucherImg',imagesData[2]);

    const {data} = await api.patch(`/events/${idEvent}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return data;
}

export const callApiGetMyEvents = async () => {
    const {data} = await api.get(`/events`);
    return data;
}

// pending
export const callApiGetEventDetail = async (eventId) => {
    const {data} = await api.get(`/events/${eventId}`);
    return data;
}

// pending
export const callApiUpdateEventDetail = async (eventId, updateData) => {
    const {data} = await api.put(`/events/${eventId}`,updateData);
    return data;
}