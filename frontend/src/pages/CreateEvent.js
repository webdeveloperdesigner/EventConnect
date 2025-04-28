import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/events', {
        title,
        description,
        date,
        userId: user._id
      });
      alert('Event created!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateEvent;
