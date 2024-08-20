import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	idUser: null,
	role: null,
	accessToken: null,
	expiresIn: null,
};

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action) {
			const { accessToken, expiresIn, idUser, role } = action.payload;
			state.accessToken = accessToken;
			state.expiresIn = expiresIn;
			state.idUser = idUser;
			state.role = role;
		},
		logout(state){
			for (const key in state) {
				state[key] = null;
			}
		}
	},
});
export const { loginSuccess, logout } = auth.actions;

export default auth.reducer;
