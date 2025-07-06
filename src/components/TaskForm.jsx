import React, { useState, useEffect } from 'react';

function TaskForm({ onSave, selectedTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedTask ? 'Edit Task' : 'New Task'}</h3>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">{selectedTask ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default TaskForm;
