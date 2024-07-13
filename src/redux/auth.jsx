import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: null,
	refreshToken: null,
	expireIn: null,
};

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action) {
			const { accessToken, refreshToken, expireIn } = action.payload;
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			state.expireIn = expireIn;
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
