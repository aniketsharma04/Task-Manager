const Task = require("../models/task");

const getTask = async (req, res) => {
	const { id } = req.params;
	let task = await Task.findById(id);
	res.status(200).send({ message: "success", data: task });
};

const getAllTask = async (req, res) => {
	const daysAgo = (days) => new Date(new Date() - days * 24 * 3600000);
	let backlog = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ category: "backlog" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ category: "backlog" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
		],
	}).populate({
		path: "userName",
		select: "name",
	});
	let todo = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ category: "to-do" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ category: "to-do" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
		],
	}).populate({
		path: "userName",
		select: "name",
	});
	let inProgress = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ category: "in-progress" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ category: "in-progress" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
		],
	}).populate({
		path: "userName",
		select: "name",
	});
	let done = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ category: "done" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ category: "done" },
					{ createdAt: { $gte: daysAgo(req.query.days || 365) } },
				],
			},
		],
	}).populate({
		path: "userName",
		select: "name",
	});
	res.status(200).send({
		message: "success",
		data: { backlog, todo, inProgress, done },
	});
};

const addTask = async (req, res) => {
	let { title, priority, checklist, dueDate, assign } = req.body;
	let userName = req.user._id;
	let newTask = new Task({
		title,
		priority,
		checklist,
		dueDate,
		userName,
		assign,
	});
	let createTask = await newTask.save();
	let task = await Task.findById(createTask._id).populate({
		path: "userName",
		select: "name",
	});
	res.status(200).send({ message: "success", data: task });
};

const updateTask = async (req, res) => {
	let { title, priority, checklist, dueDate, assign } = req.body;
	const { id } = req.params;
	let oldTask = await Task.findById(id);
	let updatedTask = await Task.findByIdAndUpdate(
		id,
		{ title, priority, checklist, dueDate, assign },
		{ new: true }
	).populate({
		path: "userName",
		select: "name",
	});
	if (
		(assign == "" && oldTask.assign == req.user.email) ||
		(assign != "" &&
			assign != req.user.email &&
			updatedTask.userName._id.toString() != req.user._id.toString())
	) {
		res.status(200).send({
			message: "success",
			data: updatedTask,
			removeAssignCategory: oldTask.category,
		});
	} else {
		res.status(200).send({ message: "success", data: updatedTask });
	}
};
const deleteTask = async (req, res) => {
	const { id } = req.params;
	const deleteTask = await Task.findByIdAndDelete(id);
	res.status(200).send({ message: "success", data: deleteTask });
};

const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { category } = req.body;
	let task = await Task.findByIdAndUpdate(
		id,
		{ category: category },
		{ new: true }
	).populate({
		path: "userName",
		select: "name",
	});

	res.status(200).send({
		message: "success",
		data: task,
	});
};

module.exports = {
	getTask,
	getAllTask,
	addTask,
	updateTask,
	deleteTask,
	updateCategory,
};
