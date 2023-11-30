import "./createEvent.css";
import { useState } from "react";

import { createEventService } from "../../services/eventService";
import { eventItemPropTypes } from "../../utils/customPropTypes";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [theme, setTheme] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (loading) return <p>Cargando...</p>;

  const handleNewEvent = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      setErrorMsg("");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("theme", theme);
      formData.append("city", city);
      formData.append("date", date);
      if (image) formData.append("image", image);

      const body = await createEventService(formData);

      if (body.status === "error") {
        throw new Error(body.message);
      }

      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-post">
      <h2>Crea una publicación</h2>
      <form className="new-event" onSubmit={handleNewEvent}>
        <fieldset>
          <label htmlFor="title">Titulo</label>
          <input
            type="title"
            name="title"
            id={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="text">Descripción</label>
          <input
            type="desription"
            name="description"
            id={description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="image">Imagen</label>
          <input
            className="input-image"
            type="file"
            name="image"
            id={image}
            accept={"image/*"}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="theme">Temática</label>
          <select
            name="theme"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            required
          >
            <option value="">Selecciona</option>
            <option value="clasicos">Clásicos</option>
            <option value="ocasion">Ocasión</option>
            <option value="rally">Rally</option>
            <option value="tunning">Tunning</option>
            <option value="moto">Moto</option>
            <option value="otro">Otro</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="city">Ciudad</label>
          <input
            type="city"
            name="city"
            id={city}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            name="date"
            id={date}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </fieldset>
        <button className="post-btn">Publicar</button>
        {errorMsg ? <p>{errorMsg}</p> : null}
        {loading ? <p>Publicando...</p> : null}
      </form>
    </div>
  );
};

CreateEvent.propTypes = {
  createEvent: eventItemPropTypes,
};
