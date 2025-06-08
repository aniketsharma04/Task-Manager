import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
	name: "state",
	initialState: {
		dashboardSection: "board",
		loading: false,
		addPeopleM: false,
		addedPeopleM: false,
		logoutM: false,
		taskDeleteM: false,
		taskCardM: false,
		taskFilterP: false,
		taskFilterName: "This month",
		taskMId: "",
		taskM: "",
		boardEmail: "",
		updateCategoryM: false,
		categoryName: "",
	},
	reducers: {
		updateDashboardSection: (state, action) => {
			state.dashboardSection = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setAddPeopleM: (state, action) => {
			state.addPeopleM = action.payload;
		},
		setAddedPeopleM: (state, action) => {
			state.addedPeopleM = action.payload;
		},
		setLogoutM: (state, action) => {
			state.logoutM = action.payload;
		},
		setTaskDeleteM: (state, action) => {
			state.taskDeleteM = action.payload;
		},
		setTaskCardM: (state, action) => {
			state.taskCardM = action.payload;
		},
		setTaskFilterP: (state, action) => {
			state.taskFilterP = action.payload;
		},
		setTaskFilterName: (state, action) => {
			state.taskFilterName = action.payload;
		},
		setTaskMId: (state, action) => {
			state.taskMId = action.payload;
		},
		setTaskM: (state, action) => {
			state.taskM = action.payload;
		},
		setBoardEmail: (state, action) => {
			state.boardEmail = action.payload;
		},
		setUpdateCategoryM: (state, action) => {
			state.updateCategoryM = action.payload;
		},
		setCategoryName: (state, action) => {
			state.categoryName = action.payload;
		},
	},
});
export const {
	updateDashboardSection,
	setLoading,
	setAddPeopleM,
	setAddedPeopleM,
	setLogoutM,
	setTaskDeleteM,
	setTaskCardM,
	setTaskFilterP,
	setTaskFilterName,
	setTaskMId,
	setTaskM,
	setBoardEmail,
	setUpdateCategoryM,
	setCategoryName,
} = stateSlice.actions;
export default stateSlice.reducer;
