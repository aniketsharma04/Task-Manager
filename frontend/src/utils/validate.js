export const checkValidSignInFrom = (email, password) => {
	const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
		email
	);
	const isPasswordValid =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^((0-9)|(a-z)|(A-Z)|\s)]).{8,}$/.test(
			password
		);
	if (!isEmailValid) return "Invalid email format";
	if (!isPasswordValid) return "Invalid password";
	return null;
};
export const checkValidSignUpFrom = (name, email, password) => {
	const isName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
	const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
		email
	);
	if (!isName) return "Invalid name format";
	if (!isEmailValid) return "Invalid email format";
	if (password.length < 8) return "Min 8 characters";
	if (!/[a-z]/.test(password)) return "Needs 1 lowercase letter";
	if (!/[A-Z]/.test(password)) return "Needs 1 uppercase lette";
	if (!/\d/.test(password)) return "Needs 1 number";
	if (!/[^((0-9)|(a-z)|(A-Z)|\s)]/.test(password))
		return "Needs 1 special char";
	return null;
};

export const checkValidEmail = (email) => {
	const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
		email
	);
	if (!isEmailValid) return "Invalid email format";
	return null;
};
