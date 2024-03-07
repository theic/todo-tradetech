import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Task, TaskStatus } from '../../domain/Task';

interface TaskDetailsProps {
  task: Task,
  onToggleTask: (listId: string, taskId: string) => void,
  onDeleteTask: (listId: string, taskId: string) => void,
}

const TaskDetails = ({ task, onToggleTask, onDeleteTask }: TaskDetailsProps) => {
  return (
    <li className="flex justify-between items-center bg-white border-b border-gray-200 px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-50">
      <span onClick={() => onToggleTask(task.listId, task.id)} className={`cursor-pointer ${task.status === TaskStatus.COMPLETED ? 'line-through' : ''}`}>
        {task.description}
      </span>
      <div>
        <button onClick={() => onDeleteTask(task.listId, task.id)} className="text-gray-200 hover:text-purple-700 ml-2">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </li>

  );
};

export default TaskDetails;
