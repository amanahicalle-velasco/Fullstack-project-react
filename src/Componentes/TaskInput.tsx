import "./TaskInput.css";
import { useState } from "react";

type Props = {
  onAddTask: (text: string) => void;
};

export default function TaskInput({ onAddTask }: Props) {
  const [input, setInput] = useState("");

  return (
    <div className="task-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Agrega una nueva tarea"
      />
      <button onClick={() => {
        if(input.trim() === "") return;
        onAddTask(input);
        setInput("");
      }}>
        Agregar
      </button>
    </div>
  );
}