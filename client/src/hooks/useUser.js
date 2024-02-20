import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserDataService } from "../services/userService";

export const useUser = (id) => {
  const [user, setUser] = useState([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Traemos los datos del usuario logueado
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUserDataService(id, token);
        setUser(data);
        setLoading(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id, token]);

  const removeUser = (id) => {
    setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  return { user, removeUser, loading, error };
};
