import "./TaskCard.css";

type Props = {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;
  
};

function TaskCard({ text, completed, onToggle, onDelete }: Props) {
  return (
    <li className={`task-card ${completed ? "completed" : ""}`}>
      
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />

      <span>{text}</span>
      <button onClick={onDelete}>Eliminar</button>

    </li>
  );
}

export default TaskCard;