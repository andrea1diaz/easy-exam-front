import React from 'react'
import validate from 'validate.js'

const getKeysOfObject = (obj) => {
  let keys = []
  for (let k in obj) {
    keys.push(k)
  }
  return keys
}

const getErrorFromError = (error) => {
  switch (typeof error) {
    default:
      return null

    case 'object':
      // console.log("!!!");
      if (error.response) {
        if (error.response.data) {
          const title =
            error.response.data.message || 'Houston, tenemos un problema'
          console.log(error.response.data.errors)
          const keys = getKeysOfObject(error.response.data.errors)
          console.log('KEYS: ', keys)
          let message = (
            <div>
              {keys.map(k => {
                // console.log("k", k);
                return (
                  <ul>
                    <li>{validate.capitalize(k)}</li>
                    <ul>
                      {keys}
                    </ul>
                  </ul>
                )
              })}
            </div>
          )
          return { title: title, message: message }
          // const message = error.response.data.errors;
        }
      } // TODO: Make more cases
      break
    case 'string':
      return { title: 'Ocurrio un error', message: error }
  }
}

export default getErrorFromError
