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
			Object.assign(state, action.payload);
		},
		
		logout(state){
			for (const key in state) {
				state[key] = null;
			}
			localStorage.clear();
		},

		updateStates(state,action) {
			Object.assign(state, action.payload);
		}
	},
});
export const { loginSuccess, logout, updateStates } = auth.actions;

export default auth.reducer;
