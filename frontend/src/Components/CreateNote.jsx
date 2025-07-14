import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const CreateNote = () => {
  const { id } = useParams();                  // If exists → edit mode
  const navigate = useNavigate();
  const location = useLocation();              // To access passed state
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 🧠 Prefill data if in edit mode and state exists
  useEffect(() => {
    if (isEditMode && location.state) {
      setTitle(location.state.title);
      setContent(location.state.content);
    }
  }, [isEditMode, location.state]);

  const handleSave = async () => {
    if (!title || !content) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const res = await fetch(
        isEditMode
          ? `https://scriptguru-mern-project.onrender.com/note/${id}`
          : `https://scriptguru-mern-project.onrender.com/note`,
        {
          method: isEditMode ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        }
      );

      if (res.ok) {
        alert(isEditMode ? 'Note updated' : 'Note created');
        navigate('/');
      } else {
        const err = await res.json();
        throw new Error(err.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Save error:', error.message);
      alert('Error saving note');
    }
  };

  return (
    <div className="m-3 bg-gray-100 h-[100vh] rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Edit Note' : 'Create Note'}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        rows="6"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg"
      >
        {isEditMode ? 'Update' : 'Save'}
      </button>
    </div>
  );
};
