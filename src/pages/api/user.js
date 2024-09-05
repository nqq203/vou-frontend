import api from "./api";

export const callApiSignIn = async (userData) => {
    const {data} = await api.post('/auth/login',userData);
    return data;
}

export const callApiSignUp = async (userData) => {
    const {data} = await api.post('/auth/register',userData);
    return data;
}

export const callApiChangePassword = async (newData) => {
    const {data} = await api.post(`/auth/change-password`,newData);
    return data;
}

export const callApiUpdateAccount = async (idUser,updatedData) => {
    const {data} = await api.put(`/users/${idUser}`,updatedData);
    return data;
}

export const callApiUpdateAccountImage = async (idUser,avatar) => {
    console.log("ava: ",avatar)
    const formData = new FormData();
    formData.append('avatar',avatar);

    const {data} = await api.patch(`/users/${idUser}/avatar`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        }
    );
    return data;
}

export const callApiGetUser = async (idUser) => {
    const {data} = await api.get(`/brands/${idUser}`);
    return data;
}

export const callApiGetAllUser = async (idUser) => {
    const {data} = await api.get(`/users?id_user=${idUser}`);
    return data;
}

