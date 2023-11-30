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
      <h2>Usuario {user.name}</h2>

      <div className="user-data-container">
        <p className="myEmail">
          Tu email actual es <strong>{user.email}</strong>{" "}
        </p>
        <section className="myBio">
          <p className="bio">Biografía: {user.biografia}</p>
          <p>
            <img
              src={`${baseURL}/${user.avatar}`}
              alt="avatar-de-usuario"
              className="user-avatar"
            ></img>
          </p>
        </section>
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
