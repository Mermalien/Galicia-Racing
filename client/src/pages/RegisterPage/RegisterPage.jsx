import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../images/default-image.png";
import { registerUserService } from "../../services/userService";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(defaultImage);
  const [errorMsg, setErrorMsg] = useState("");

  // Manejador del registro
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg("");

      // Vemos que las password sean iguales
      if (pass1 !== pass2) {
        setErrorMsg("Las contraseñas no coinciden");
        return;
      }

      // Creamos un objeto FormData.
      const formData = new FormData();

      // Añadimos las propiedades.
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", pass1);
      formData.append("bio", bio);

      if (avatar !== defaultImage) {
        formData.append("avatar", avatar);
      }

      // Registramos el usuario en la base de datos.
      const body = await registerUserService(formData);

      // Si hay algún error lo lanzamos.
      if (body.status === "error") {
        throw new Error(body.message);
      }

      navigate("/login");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="register-page">
      <section className="register">
        <h2>Registro</h2>

        <form onSubmit={handleRegister} className="register-form">
          <fieldset>
            <label htmlFor="name">Nombre</label>
            <input
              type="name"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </fieldset>

          <fieldset>
            <label htmlFor="pass1">Contraseña</label>
            <input
              type="password"
              id="pass1"
              value={pass1}
              required
              onChange={(e) => setPass1(e.target.value)}
            ></input>
          </fieldset>

          <fieldset>
            <label htmlFor="pass2">Repite la contraseña</label>
            <input
              type="password"
              id="pass2"
              value={pass2}
              required
              onChange={(e) => setPass2(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="biografia">Algo sobre ti...</label>
            <input
              type="text"
              id="biografia"
              value={bio}
              required
              onChange={(e) => setBio(e.target.value)}
            ></input>
          </fieldset>

          <fieldset>
            <label htmlFor="avatar">Foto de perfil</label>
            <input
              type="file"
              name="avatar"
              className="input-image"
              id={avatar}
              accept={"image/*"}
              onChange={(e) => setAvatar(e.target.files[0])}
            ></input>
          </fieldset>

          <button className="register-btn">Registro</button>
        </form>
        {errorMsg && <p>{errorMsg}</p>}
      </section>
    </div>
  );
};
