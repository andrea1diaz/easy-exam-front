import React from 'react';
import validate from 'validate.js';

const getKeysOfObject = (obj) => {
  const keys = [];
  for (let k in obj) {
    keys.push(k);
  }
  return keys;
};

const getErrorFromError = (error) => {
  switch (typeof error) {
		default:
			return null;

    case 'object':
      if (error.response) {
        if (error.response.data) {
          const title =
            error.response.data.message || 'Houston, tenemos un problema';
					const keys = getKeysOfObject(error.response.data.errors);
          const message = (
            <div>
              {keys.map(k => {
                return (
                  <ul>
                    <li>{validate.capitalize(k)}</li>
                    <ul>
                      {keys}
                    </ul>
                  </ul>
                );
              })}
            </div>
          );
          return { title: title, message: message };
          // const message = error.response.data.errors;
        }
      } // TODO: Make more cases
      break;
    case "string":
      return { title: "Ocurrio un error", message: error };
  }
};

export default getErrorFromError;
