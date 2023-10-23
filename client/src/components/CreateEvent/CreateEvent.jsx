import "./createEvent.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createEventService } from "../../services/eventService";
import { eventItemPropTypes } from "../../utils/customPropTypes";

export const CreateEvent = ({ createEvent }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [theme, setTheme] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (loading) return <p>Cargando...</p>;
  if (error) {
    throw new Error(error);
  }
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  const handleNewEvent = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      const newEventItem = await createEventService({ data, token });

      createEvent(newEventItem);
      e.target.reset();
      setLoading(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Crea una publicación</h2>
      <form className="new-event" onSubmit={handleNewEvent}>
        <fieldset>
          <label htmlFor="title">Titulo</label>
          <input
            type="title"
            name="title"
            id={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="text">Descripción</label>
          <input
            type="desription"
            name="description"
            id={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            name="image"
            id={image}
            accept={"image/*"}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="theme">Temática</label>
          <select name="theme" onChange={handleThemeChange} value={theme}>
            <option value="clasicos">Clásicos</option>
            <option value="ocasion">Ocasión</option>
            <option value="rally">Rally</option>
            <option value="tunning">Tunning</option>
            <option value="moto">Moto</option>
            <option value="otro">Otro</option>
          </select>
          <input
            type="hidden"
            name="theme"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="city">Ciudad</label>
          <input
            type="city"
            name="city"
            id={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            name="date"
            id={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </fieldset>
        <button>Publicar</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Publicando...</p> : null}
      </form>
    </>
  );
};

CreateEvent.propTypes = {
  createEvent: eventItemPropTypes,
};
