import api from "./api";

export const callApiSignIn = async (userData) => {
    const {data} = await api.post('/auth/login',userData);
    return data;
}

export const callApiSignUp = async (userData) => {
    const {data} = await api.post('/auth/register',userData);
    return data;
}