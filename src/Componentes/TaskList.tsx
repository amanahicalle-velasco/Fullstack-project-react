import TaskCard from "./TaskCard";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  
};

function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          text={task.text}
          completed={task.completed}
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task.id, task.completed)}
          
        />
      ))}
    </ul>
  );
}

export default TaskList;