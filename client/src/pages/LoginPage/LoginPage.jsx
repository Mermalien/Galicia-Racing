import "./LoginPage.css";
import { useContext, useState } from "react";
import { loginUserService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleForm = async (e) => {
    try {
      e.preventDefault();

      const body = await loginUserService({ email, password });

      // Si hay algún error lo lanzamos.
      if (body.status === "error") {
        throw new Error(body.message);
      }

      login(body.data.token);

      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <section className="login-page">
      <h1>Inicia sesión</h1>
      <form onSubmit={handleForm} className="login-form">
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="pass"
            id="pass"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button className="login-button">Inicia sesión</button>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </section>
  );
};
