//URL base del backend
const baseURL = import.meta.env.VITE_APP_BACKEND;

// Registro
export const registerUserService = async (data) => {
  console.log(data);
  const response = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.data;
};

// Login

export const loginUserService = async ({ email, password }) => {
  //console.log(email, password);
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body.data.token;
};

//Mi info

export const getMyDataService = async (token) => {
  const response = await fetch(`${baseURL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.data;
};

export const getUserDataService = async (id, token) => {
  const response = await fetch(`${baseURL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};
