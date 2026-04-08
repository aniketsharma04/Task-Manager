const { supabaseAdmin } = require("../config/supabase");

const getAnalytics = async (req, res) => {
	const userFilter = `user_id.eq.${req.user.id},assign.eq.${req.user.email}`;

	const getCount = async (filters) => {
		let query = supabaseAdmin
			.from('tasks')
			.select('id', { count: 'exact', head: true })
			.or(userFilter);
		
		for (const [key, value] of Object.entries(filters)) {
			if (value === 'isnot.null') {
				query = query.not(key, 'is', null);
			} else {
				query = query.eq(key, value);
			}
		}
		
		const { count, error } = await query;
		if (error) throw error;
		return count || 0;
	};

	try {
		const [
			backlog, 
			todo, 
			inProgress, 
			done, 
			high, 
			moderate, 
			low, 
			dueDate
		] = await Promise.all([
			getCount({ category: 'backlog' }),
			getCount({ category: 'to-do' }),
			getCount({ category: 'in-progress' }),
			getCount({ category: 'done' }),
			getCount({ priority: 'High Priority' }),
			getCount({ priority: 'Moderate Priority' }),
			getCount({ priority: 'Low Priority' }),
			getCount({ due_date: 'isnot.null' }),
		]);

		res.status(200).send({
			message: "success",
			data: { backlog, todo, inProgress, done, high, moderate, low, dueDate },
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching analytics", error: error.message });
	}
};

module.exports = { getAnalytics };
