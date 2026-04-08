const { supabase, supabaseAdmin } = require("../config/supabase");

const registerUser = async (req, res, next) => {
	let { name, email, password } = req.body;

	// Use admin client to create user with auto-confirmed email
	const { data, error } = await supabaseAdmin.auth.admin.createUser({
		email,
		password,
		email_confirm: true,
		user_metadata: {
			name: name
		}
	});

	if (error) {
		return res.status(400).json({ message: error.message });
	}

	res.status(200).json({
		message: "Registration Successfully",
		token: "registered",
	});
};

const loginUser = async (req, res) => {
	let { email, password } = req.body;
	
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		return res.status(401).json({ message: error.message });
	}

	// Fetch profile to get name and board (use admin client to bypass RLS)
	const { data: profile } = await supabaseAdmin
		.from('profiles')
		.select('*')
		.eq('id', data.user.id)
		.single();

	res.status(200).json({
		message: "Login Successfully",
		data: { 
			_id: data.user.id, 
			id: data.user.id, 
			name: profile?.name,
			email: data.user.email,
			board: profile?.board || []
		},
		token: data.session.access_token,
	});
};

module.exports = { registerUser, loginUser };
