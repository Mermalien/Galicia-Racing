import { createContext, useEffect, useState } from "react";
import { getMyDataService } from "../services/userService";

// Creamos un contexto que maneje los datos de autenticación
export const AuthContext = createContext(null);

// Componente que provee el contexto de autenticación

export const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  //console.log(user);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyDataService(token);

        setUser(data);
      } catch (error) {
        setToken("");
        setUser(null);
      }
    };

    //console.log(typeof token);
    if (token) getUserData();
  }, [token, setToken]);

  //Iniciar sesión
  const login = (token) => {
    setToken(token);
  };

  // Cerrar sesión
  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
