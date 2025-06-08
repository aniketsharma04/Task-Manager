import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
	name: "task",
	initialState: {
		backlog: [],
		todo: [],
		inProgress: [],
		done: [],
	},
	reducers: {
		setBacklog: (state, action) => {
			state.backlog = action.payload;
		},
		setTodo: (state, action) => {
			state.todo = action.payload;
		},
		setInProgress: (state, action) => {
			state.inProgress = action.payload;
		},
		setDone: (state, action) => {
			state.done = action.payload;
		},
		addBacklogTask: (state, action) => {
			state.backlog = [...state.backlog, action.payload];
		},
		addTodoTask: (state, action) => {
			state.todo = [...state.todo, action.payload];
		},
		addInProgressTask: (state, action) => {
			state.inProgress = [...state.inProgress, action.payload];
		},
		addDoneTask: (state, action) => {
			state.done = [...state.done, action.payload];
		},
		updateBacklogTask: (state, action) => {
			state.backlog = state.backlog.map((t) =>
				t._id == action.payload._id ? action.payload : t
			);
		},
		updateTodoTask: (state, action) => {
			state.todo = state.todo.map((t) =>
				t._id == action.payload._id ? action.payload : t
			);
		},
		updateInProgressTask: (state, action) => {
			state.inProgress = state.inProgress.map((t) =>
				t._id == action.payload._id ? action.payload : t
			);
		},
		updateDoneTask: (state, action) => {
			state.done = state.done.map((t) =>
				t._id == action.payload._id ? action.payload : t
			);
		},
		deleteBacklogTask: (state, action) => {
			state.backlog = state.backlog.filter(
				(t) => t._id != action.payload._id
			);
		},
		deleteTodoTask: (state, action) => {
			state.todo = state.todo.filter((t) => t._id != action.payload._id);
		},
		deleteInProgressTask: (state, action) => {
			state.inProgress = state.inProgress.filter(
				(t) => t._id != action.payload._id
			);
		},
		deleteDoneTask: (state, action) => {
			state.done = state.done.filter((t) => t._id != action.payload._id);
		},
	},
});
export const {
	setBacklog,
	setTodo,
	setInProgress,
	setDone,
	addBacklogTask,
	addTodoTask,
	addInProgressTask,
	addDoneTask,
	updateBacklogTask,
	updateTodoTask,
	updateInProgressTask,
	updateDoneTask,
	deleteBacklogTask,
	deleteTodoTask,
	deleteInProgressTask,
	deleteDoneTask,
} = taskSlice.actions;
export default taskSlice.reducer;
