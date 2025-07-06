import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="task">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
