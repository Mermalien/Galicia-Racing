import "./ListOfEvents.css";
import { useEvents } from "../../hooks/useEvents";
import { eventItemPropTypes } from "../../utils/customPropTypes";
import { SingleEvent } from "../SingleEvent/SingleEvent";

export const ListOfEvents = () => {
  const { events } = useEvents();
  return (
    <ul className="list-of-events">
      {events.map((eventItem) => {
        return (
          <li key={eventItem.id}>
            <SingleEvent eventItem={eventItem} />
          </li>
        );
      })}
    </ul>
  );
};

ListOfEvents.propTypes = {
  events: eventItemPropTypes,
};
