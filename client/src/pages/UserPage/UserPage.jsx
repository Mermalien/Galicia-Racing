import { Link, useParams } from "react-router-dom";
import "./UserPage.css";
import { useUser } from "../../hooks/useUser";
import { ErrorMessage } from "../../components/ErrorMessage";
import { userPropTypes } from "../../utils/customPropTypes";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCog } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";

const baseURL = import.meta.env.VITE_APP_BACKEND;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const { currentUser } = useContext(AuthContext);

  // Verificar si la página de usuario es mía
  const itsMe = currentUser?.id === user?.id;

  if (loading) return <p>Cargando...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="user-page-container">
      <div className="user-page" key={user.id}>
        <h2>Usuario {user.name}</h2>

        <div className="user-data-container">
          <section className="myEmail">
            <p>
              Email: <strong>{user.email}</strong>{" "}
            </p>
          </section>
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
          {itsMe && (
            <div className="user-options">
              <div className="update">
                <Link to={"/user/update"} className="link">
                  <FaUserCog className="react-icon" />
                </Link>
              </div>
              <div className="delete-user">
                <Link to={`/deleteUser/${user.id}`} className="link">
                  <TiUserDelete className="react-icon" />
                </Link>
              </div>
            </div>
          )}
        </div>
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
