import axios from 'axios';

function EventCard({ event, userId }) {
  const handleRegister = async () => {
    try {
      await axios.post(`http://localhost:5000/api/events/${event._id}/register`, { userId });
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Created by: {event.createdBy?.name}</p>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default EventCard;
