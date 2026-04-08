const { supabaseAdmin } = require("../config/supabase");

const getAuthUser = async (req, res) => {
	if (!req.user) {
		return res.status(404).json({ message: `User Not Found` });
	}
	res.status(200).json({
		data: req.user,
	});
};

const updateUser = async (req, res) => {
	let { name, email, oldPassword, newPassword } = req.body;
	
	// Update Auth (Email/Password)
	const updates = {};
	if (email && email !== req.user.email) updates.email = email;
	if (newPassword) updates.password = newPassword;

	if (Object.keys(updates).length > 0) {
		const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(req.user.id, updates);
		if (authError) {
			return res.status(400).json({ message: authError.message });
		}
	}

	// Update Profile (Name)
	const { data: userData, error: profileError } = await supabaseAdmin
		.from('profiles')
		.update({ name })
		.eq('id', req.user.id)
		.select()
		.single();

	if (profileError) {
		return res.status(400).json({ message: profileError.message });
	}

	res.status(200).json({
		message: "success",
		data: { ...userData, _id: userData.id },
	});
};

const getAllUsers = async (req, res) => {
	const { data: allUsers, error } = await supabaseAdmin
		.from('profiles')
		.select('id, name, email')
		.neq('id', req.user.id)
		.order('id', { ascending: false });

	if (error) {
		return res.status(400).json({ message: error.message });
	}

	res.status(200).send({ data: allUsers.map(u => ({ ...u, _id: u.id })) });
};

const updateBoard = async (req, res) => {
	let { email } = req.body;
	
	// Fetch current board
	const { data: currentProfile } = await supabaseAdmin
		.from('profiles')
		.select('board')
		.eq('id', req.user.id)
		.single();
	
	const updatedBoard = [...(currentProfile?.board || []), email];

	const { data: userData, error } = await supabaseAdmin
		.from('profiles')
		.update({ board: updatedBoard })
		.eq('id', req.user.id)
		.select()
		.single();

	if (error) {
		return res.status(400).json({ message: error.message });
	}

	res.status(200).json({
		message: "success",
		data: { ...userData, _id: userData.id },
		email: email,
	});
};

module.exports = { getAuthUser, updateUser, getAllUsers, updateBoard };
