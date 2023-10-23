// Importamos la constante
import { TOKEN_LOCAL_STORAGE_KEY } from "./constants";

//Función que obtiene el token del localStorage
export const getToken = () => {
  const authToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);

  //Si existe el token lo devolvemos, sino nulo
  return authToken ? authToken : null;
};
