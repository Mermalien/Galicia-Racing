import "./DeleteUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserService } from "../../services/userService";
import { userPropTypes } from "../../utils/customPropTypes";
import { useUser } from "../../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const DeleteUser = () => {
  const { id } = useParams();
  const idNumber = parseInt(id);
  console.log(typeof idNumber);
  const { user, removeUser } = useUser(idNumber);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteUser = async (idNumber) => {
    try {
      if (user) {
        await deleteUserService(idNumber, token);
        removeUser(idNumber);
        logout();
        navigate("/");
        console.log("Usuario eliminado:", user);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    }
  };

  return (
    <div className="deletePage">
      <div className="delete-items">
        <div className="delete-text">
          <p>
            Sentimos mucho que te quieras ir... Antes de eliminar tu perfil ten
            en cuenta que se perderán tus publicaciones y participación en
            eventos. Si estás decidido a irte, puedes eliminar tu cuenta de
            forma permanente pulsando el botón a continuación.{" "}
          </p>
        </div>
        <button
          onClick={() => {
            handleDeleteUser(idNumber);
          }}
          className="delete-btn"
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};
DeleteUser.propTypes = {
  user: userPropTypes,
};
