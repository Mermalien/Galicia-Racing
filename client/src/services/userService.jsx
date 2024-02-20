//URL base del backend
const baseURL = import.meta.env.VITE_APP_BACKEND;
import { getToken } from "../utils/getToken";

// Registro
export const registerUserService = async (formData) => {
  const response = await fetch(`${baseURL}/register`, {
    method: "POST",
    body: formData,
  });

  const body = await response.json();

  return body;
};

// Login

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const body = await response.json();

  return body;
};

//Mi info

export const getMyDataService = async (token) => {
  const response = await fetch(`${baseURL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();

  return body.data;
};

// Usuario por ID
export const getUserDataService = async (id, token) => {
  const response = await fetch(`${baseURL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  return body.data;
};

// Actualizar mis datos
export const updateMyDataService = async (formData, token) => {
  const response = await fetch(`${baseURL}/user/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const body = await response.json();
  return body.data;
};

// Eliminar mi usuario
export const deleteUserService = async (id) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/deleteUser/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }
  const body = await response.json();
  return body;
};
