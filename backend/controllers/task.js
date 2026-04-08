const { supabaseAdmin } = require("../config/supabase");

const getTask = async (req, res) => {
	const { id } = req.params;
	const { data: task, error } = await supabaseAdmin
		.from('tasks')
		.select('*, profiles(name)')
		.eq('id', id)
		.single();

	if (error) {
		return res.status(404).json({ message: "Task not found", error: error.message });
	}
	res.status(200).send({ message: "success", data: { ...task, _id: task.id } });
};

const getAllTask = async (req, res) => {
	const days = req.query.days || 365;
	const dateLimit = new Date();
	dateLimit.setDate(dateLimit.getDate() - days);
	const isoDateLimit = dateLimit.toISOString();

	const fetchByCategory = async (category) => {
		const { data, error } = await supabaseAdmin
			.from('tasks')
			.select('*, profiles(name)')
			.eq('category', category)
			.gte('created_at', isoDateLimit)
			.or(`user_id.eq.${req.user.id},assign.eq.${req.user.email}`);
		
		if (error) throw error;
		
		// Map profiles.name to userName and id to _id for frontend compatibility
		return data.map(task => ({
			...task,
			_id: task.id,
			userName: task.profiles ? { name: task.profiles.name } : null
		}));
	};

	try {
		const [backlog, todo, inProgress, done] = await Promise.all([
			fetchByCategory("backlog"),
			fetchByCategory("to-do"),
			fetchByCategory("in-progress"),
			fetchByCategory("done"),
		]);

		res.status(200).send({
			message: "success",
			data: { backlog, todo, inProgress, done },
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching tasks", error: error.message });
	}
};

const addTask = async (req, res) => {
	let { title, priority, checklist, dueDate, assign } = req.body;
	let user_id = req.user.id;

	const { data: createTask, error } = await supabaseAdmin
		.from('tasks')
		.insert([{
			title,
			priority,
			checklist,
			due_date: dueDate || null,
			user_id,
			assign,
		}])
		.select('*, profiles(name)')
		.single();

	if (error) {
		return res.status(400).json({ message: error.message });
	}

	// Map for frontend
	const task = {
		...createTask,
		_id: createTask.id,
		userName: createTask.profiles ? { name: createTask.profiles.name } : null
	};

	res.status(200).send({ message: "success", data: task });
};

const updateTask = async (req, res) => {
	let { title, priority, checklist, dueDate, assign } = req.body;
	const { id } = req.params;

	// Get old task for logic check
	const { data: oldTask } = await supabaseAdmin
		.from('tasks')
		.select('*')
		.eq('id', id)
		.single();

	const { data: updatedTaskRaw, error } = await supabaseAdmin
		.from('tasks')
		.update({
			title,
			priority,
			checklist,
			due_date: dueDate || null,
			assign,
		})
		.eq('id', id)
		.select('*, profiles(name)')
		.single();

	if (error) {
		return res.status(400).json({ message: error.message });
	}

	const updatedTask = {
		...updatedTaskRaw,
		_id: updatedTaskRaw.id,
		userName: updatedTaskRaw.profiles ? { name: updatedTaskRaw.profiles.name } : null
	};

	if (
		(assign == "" && oldTask.assign == req.user.email) ||
		(assign != "" &&
			assign != req.user.email &&
			updatedTask.user_id != req.user.id)
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
	const { data: deletedTask, error } = await supabaseAdmin
		.from('tasks')
		.delete()
		.eq('id', id)
		.select()
		.single();

	if (error) {
		return res.status(400).json({ message: error.message });
	}
	res.status(200).send({ message: "success", data: { ...deletedTask, _id: deletedTask.id } });
};

const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { category } = req.body;

	const { data: taskRaw, error } = await supabaseAdmin
		.from('tasks')
		.update({ category: category })
		.eq('id', id)
		.select('*, profiles(name)')
		.single();

	if (error) {
		return res.status(400).json({ message: error.message });
	}

	const task = {
		...taskRaw,
		_id: taskRaw.id,
		userName: taskRaw.profiles ? { name: taskRaw.profiles.name } : null
	};

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
