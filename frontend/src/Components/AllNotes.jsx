import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import socket from '../socket';

const AllNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/note`);
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);


  useEffect(()=>{
    socket.on('noteCreated',(data)=>{
      console.log(data);
      setNotes((prev)=>[data,...prev])
      })

    socket.on('updateNote',(data)=>{
      console.log(data._id,notes._id)
      const updatedData = notes?.filter((i)=>i._id === data?._id);
      if(updatedData){
        setNotes(prev=>prev?.map((i)=>i?._id === data?._id ? {...i, ...data} : i))
      }
    })
  },[])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Notes</h1>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Note
        </button>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <p className="text-gray-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes available. Create your first note!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{note.title.slice(0,35)}</h2>
              <p className='text-gray-400 mb-4 text-sm'>{note.updatedAt ? dayjs(note.updatedAt).format('MMM D YYYY') : ''}</p>
              <p className="text-gray-700 mb-4">{note.content.slice(0,200)}</p>
              <button
  onClick={() => navigate(`/edit/${note._id}`, { state: note })}
  className="text-blue-600 hover:underline font-medium"
>
  Edit
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNotes;
