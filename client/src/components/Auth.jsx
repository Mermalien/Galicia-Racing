import "../components/Header/Header.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <section className="btns-user">
      <p>
        <Link
          to={`/users/${user.id}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          Mi perfil
        </Link>
      </p>{" "}
      <p>
        <Link
          to={"/createEvent"}
          style={{ color: "white", textDecoration: "none" }}
        >
          Publica algo
        </Link>
      </p>
      <button
        onClick={() => logout()}
        style={{
          color: "white",
          backgroundColor: "black",
          fontSize: "19px",
        }}
      >
        Salir
      </button>
    </section>
  ) : (
    <ul style={{ listStyle: "none" }} className="btns-user">
      <li>
        <Link to={"/login"} style={{ color: "white", textDecoration: "none" }}>
          Iniciar sesión
        </Link>
      </li>

      <li>
        <Link
          to={"/register"}
          style={{ color: "white", textDecoration: "none" }}
        >
          Registro
        </Link>
      </li>
    </ul>
  );
};
