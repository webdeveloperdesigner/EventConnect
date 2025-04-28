import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events');
    setEvents(res.data);
  };

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      <button onClick={() => navigate('/create-event')}>Create Event</button>
      <div>
        {events.map(event => (
          <EventCard key={event._id} event={event} userId={user?._id} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
