const Task = require("../models/task");

const getAnalytics = async (req, res) => {
	let backlog = await Task.find({
		$or: [
			{ $and: [{ userName: req.user._id }, { category: "backlog" }] },
			{ $and: [{ assign: req.user.email }, { category: "backlog" }] },
		],
	}).countDocuments();
	let todo = await Task.find({
		$or: [
			{ $and: [{ userName: req.user._id }, { category: "to-do" }] },
			{ $and: [{ assign: req.user.email }, { category: "to-do" }] },
		],
	}).countDocuments();
	let inProgress = await Task.find({
		$or: [
			{ $and: [{ userName: req.user._id }, { category: "in-progress" }] },
			{ $and: [{ assign: req.user.email }, { category: "in-progress" }] },
		],
	}).countDocuments();
	let done = await Task.find({
		$or: [
			{ $and: [{ userName: req.user._id }, { category: "done" }] },
			{ $and: [{ assign: req.user.email }, { category: "done" }] },
		],
	}).countDocuments();
	let high = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ priority: "High Priority" },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ priority: "High Priority" },
				],
			},
		],
	}).countDocuments();
	let moderate = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ priority: "Moderate Priority" },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ priority: "Moderate Priority" },
				],
			},
		],
	}).countDocuments();
	let low = await Task.find({
		$or: [
			{
				$and: [
					{ userName: req.user._id },
					{ priority: "Low Priority" },
				],
			},
			{
				$and: [
					{ assign: req.user.email },
					{ priority: "Low Priority" },
				],
			},
		],
	}).countDocuments();
	let dueDate = await Task.find({
		$or: [
			{ $and: [{ userName: req.user._id }, { dueDate: { $ne: "" } }] },
			{ $and: [{ assign: req.user.email }, { dueDate: { $ne: "" } }] },
		],
	}).countDocuments();
	res.status(200).send({
		message: "success",
		data: { backlog, todo, inProgress, done, high, moderate, low, dueDate },
	});
};

module.exports = { getAnalytics };
