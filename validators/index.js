import validate from 'validate.js';

export const validateEmail = (value) => {
	let email = '';
	if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
		email = value.trim().toLowerCase;
	}
	return validate(
		{ email },
		{
			email: {
				presence: true,
				email: true,
			},
		},
	);
};

export const validateFirstName = value => {
  let firstName = '';
  if (value && !/^[\s]{0,20}$/.test(value)) {
    firstName = validate.capitalize(value.trim());
  }

  return validate(
    { firstName },
    {
      firstName: {
        presence: true,
        length: {
          minimum: 1
        }
      }
    }
  );
};

export const validateLastName = (value) => {
  // TODO: Explore util functions of validate.js
  let lastName = "";
  if (value && !/^[\s]{0,20}$/.test(value)) {
    lastName = validate.capitalize(value.trim());
  }
  return validate(
    { lastName: lastName },
    {
      lastName: {
        presence: true,
        length: {
          minimum: 1
        }
      }
    }
  );
};

export const validatePassword = value => {
  return validate(
    { password: value },
    {
      password: {
        presence: true,
        length: {
          minimum: 1,
          message: "La contraseña debe de tener, al menos, 6 caracteres"
        }
      }
    }
  );
};
