class Event {
  constructor(id, title, description, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = new Date(date);
  }

  // Metodos para modificar los detalles del evento
  editTitle(newTitle) {
    this.title = newTitle;
  }

  editDescription(newDescription) {
    this.description = newDescription;
  }

  editDate(newDate) {
    this.date = new Date(newDate);
  }
}

// Ejemplo de uso del evento:
const myEvent = new Event(1, "My Event", "This is my event", "2022-01-01");
console.log(myEvent);

myEvent.editTitle("My Edited Event");
console.log(myEvent);

myEvent.editDescription("This is my edited event");
console.log(myEvent);

myEvent.editDate("2022-01-02");
console.log(myEvent);


//administrar una lista de eventos:

class EventManager {
  constructor() {
    this.events = [];
  }

  // Metodos para crear, editar y eliminar eventos
  createEvent(title, description, date) {
    const newEvent = new Event(this.events.length + 1, title, description, date);
    this.events.push(newEvent);
    return newEvent;
  }

  editEvent(id, title, description, date) {
    const event = this.getEventById(id);
    if (event) {
      event.editTitle(title);
      event.editDescription(description);
      event.editDate(date);
    }
  }

  deleteEvent(id) {
    const index = this.events.findIndex((event) => event.id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }

  // Metodos para obtener eventos
  getEventById(id) {
    return this.events.find((event) => event.id === id);
  }

  getAllEvents() {
    return this.events;
  }

  getEventsByDate(date) {
    return this.events.filter((event) => event.date.toDateString() === date.toDateString());
  }
}

// uso de la administracion de eventos:
const eventManager = new EventManager();
const event1 = eventManager.createEvent("Event 1", "Description 1", "2022-01-01");
const event2 = eventManager.createEvent("Event 2", "Description 2", "2022-01-02");
const event3 = eventManager.createEvent("Event 3", "Description 3", "2022-01-03");
console.log(eventManager.getAllEvents());
console.log(eventManager.getEventsByDate(new Date("2022-01-01")));

eventManager.editEvent(event1.id, "Edited Event 1", "Description 1", "2022-01-01");
console.log(eventManager.getAllEvents());
console.log(eventManager.getEventsByDate(new Date("2022-01-01")));

eventManager.deleteEvent(event2.id);
console.log(eventManager.getAllEvents());
console.log(eventManager.getEventsByDate(new Date("2022-01-01")));


// visualizar una lista de eventos:

class EventList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.events.map((event) => (
          <li key={event.id}>
            {event.title} - {event.description} - {event.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
    );
  }
}

// lista de eventos:

const events = eventManager.getAllEvents();
ReactDOM.render(<EventList events={events} />, document.getElementById("root"));


// manejar confirmaciones:

class ConfirmationModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal">
        <div className="modal-content">
          <p>{this.props.message}</p>
          <button onClick={this.props.onConfirm}>Confirm</button>
          <button onClick={this.props.onClose}>Cancel</button>
        </div>
      </div>
    );
  }
}