import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/useEvent";
import { ErrorMessage } from "../../components/ErrorMessage";
import { SingleEvent } from "../../components/SingleEvent/SingleEvent";

export const SingleEventPage = () => {
  const { id } = useParams();
  const { event, loading, error } = useEvent(id);

  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h2>Publicación</h2>
      <SingleEvent event={event} />
    </section>
  );
};
