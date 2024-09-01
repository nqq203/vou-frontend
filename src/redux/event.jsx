import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	listAvailableItems: [],
    listAvailableBrands: [],
};

const event = createSlice({
	name: 'event',
	initialState,
	reducers: {
		updateStatesEvent(state,action) {
			Object.assign(state, action.payload);
		}
	},
});
export const { updateStatesEvent } = event.actions;

export default event.reducer;
