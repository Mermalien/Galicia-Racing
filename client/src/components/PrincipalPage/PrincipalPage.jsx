import "./PrincipalPage.css";

import { useEvents } from "../../hooks/useEvents";
import { ErrorMessage } from "../ErrorMessage";
import { ListOfEvents } from "../ListOfEvents/ListOfEvents";
import { Searcher } from "../Searcher/Searcher";

export const PrincipalPage = () => {
  const { events, setEvents, loading, error } = useEvents();

  if (loading) return <p>Cargando...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="principal-page">
      <Searcher className="searcher" setEvents={setEvents} />
      <div className="list-events">
        <h1>Próximos eventos</h1>
        <div className="list-of-events">
          <ListOfEvents events={events} setEvents={setEvents} />
        </div>
      </div>
    </section>
  );
};
