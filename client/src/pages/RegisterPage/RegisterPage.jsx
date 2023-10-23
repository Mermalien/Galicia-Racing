import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../../services/userService";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [biografia, setBiografia] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  if (error) return <p>Ups algo ha fallado</p>;

  // Manejador del registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Vemos que las password sean iguales
    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUserService({
        name,
        email,
        password: pass1,
        biografia,
        avatar,
      });
      navigate("/login");
      console.log("Registro exitoso");
    } catch (error) {
      setError(error.message);
      console.log("Registro fallido");
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
              value={biografia}
              required
              onChange={(e) => setBiografia(e.target.value)}
            ></input>
          </fieldset>

          <fieldset>
            <label htmlFor="avatar">Foto de perfil</label>
            <input
              type="file"
              name="avatar"
              id={avatar}
              accept={"image/*"}
              onChange={(e) => setAvatar(e.target.value)}
            ></input>
          </fieldset>

          <button>Registro</button>
        </form>
      </section>
    </div>
  );
};
