import { useParams } from "react-router-dom";
import "./UserPage.css";
import { useUser } from "../../hooks/useUser";
import { ErrorMessage } from "../../components/ErrorMessage";
import { userPropTypes } from "../../utils/customPropTypes";

const baseURL = import.meta.env.VITE_APP_BACKEND;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return <p>Cargando...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="user-page">
      <h2>Hola {user.name}!</h2>

      <div className="user-data-container">
        <h3>Tus datos de usuario</h3>
        <p>Email actual {user.email}</p>
        <p>{user.biografia}</p>
        <p>
          <img src={`${baseURL}/${user.avatar}`} alt="avatar-de-usuario">
            {user.avatar}
          </img>
        </p>
      </div>
    </div>
  );
};

UserPage.propTypes = {
  name: userPropTypes,
  email: userPropTypes,
  biografia: userPropTypes,
  avatar: userPropTypes,
};
