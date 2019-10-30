export const validateEmail = (value) => {
	let email = '';
	if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
		email = value.trim().toLowerCase;
	}
	return validate(
		{ email: email },
		{
			email: {
				presence: true,
				email: true
			}
		}
	);
};


