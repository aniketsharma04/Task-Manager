const { supabase, supabaseAdmin } = require("../config/supabase");
const wrapAsync = require("./wrapAsync");

const authorization = wrapAsync(async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).send({ message: "Token not found" });
	}

	const { data: { user }, error } = await supabase.auth.getUser(token);

	if (error || !user) {
		return res.status(401).send({ message: "Invalid or expired token" });
	}

	// Use supabaseAdmin to bypass RLS since we already verified the user's token
	const { data: profile, error: profileError } = await supabaseAdmin
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();

	if (profileError || !profile) {
		// If profile doesn't exist, we fallback to user auth data but log it
		console.error("Profile not found for user:", user.id);
		req.user = { _id: user.id, id: user.id, email: user.email, ...user.user_metadata };
	} else {
		// Map profile to req.user for compatibility with existing code
		req.user = { 
			_id: profile.id, 
			id: profile.id, 
			...profile 
		};
	}
	
	next();
});

module.exports = { authorization };
