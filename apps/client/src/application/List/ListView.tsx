import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import TaskDetails from '../Task/TaskView';
import { List } from '../../domain';

interface ListViewProps {
  list: List,
  isLoading: boolean,
  onDeleteList: (id: string) => void,
  onEditList: (lsitId: string, title: string) => void,
  onToggleTask: (listId: string, id: string) => void,
  onDeleteTask: (listId: string, id: string) => void,
  onCreateTask: (listId: string, description: string) => void,
}

const ListView = ({
  list,
  isLoading,
  onDeleteList,
  onEditList,
  onToggleTask,
  onDeleteTask,
  onCreateTask
}: ListViewProps) => {
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    onEditList(list.id, title);
  };

  const handleCreateTask = () => {
    if (newTaskDescription.trim()) {
      onCreateTask(list.id, newTaskDescription);
      setNewTaskDescription('');
    }
  };

  const confirmAndDelete = (listId: string) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      onDeleteList(listId);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 transition duration-300 ease-in-out hover:shadow-lg">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          className="mb-4 text-center text-xl font-bold bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
          autoFocus
        />
      ) : (
        <h2 onClick={handleTitleClick} className="text-gray-800 text-xl font-bold mb-4">{list.title}</h2>
      )}
      <ul className="space-y-2">
        {list.tasks?.map((task) => (
          <TaskDetails
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
      <div className="mt-4">
      <button
        onClick={() => confirmAndDelete(list.id)}
        className="p-2 text-gray-300 hover:text-gray-400 border border-transparent rounded-full cursor-pointer transition-colors duration-150 mr-2"
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </button>
        <input
          className="p-2.5 text-base border border-gray-300 rounded flex-grow shadow-sm mr-4"
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Add something to your list"
        />
        {
          isLoading ?
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-gray-600 text-white font-bold cursor-not-allowed focus:outline-none disabled:opacity-75"
            >
              Add
            </button> :
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded cursor-pointer transition-colors duration-150"
            >
              Add
            </button>
        }
      </div>

    </div>
  );
};

export default ListView;
