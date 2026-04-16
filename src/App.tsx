import { useEffect, useState } from "react";
import Header from "./Componentes/Header";
import TaskList from "./Componentes/TaskList";
import TaskInput from "./Componentes/TaskInput";
import Footer from "./Componentes/Footer";
import EmptyState from "./Componentes/EmptyState";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {

  /*1) Cambio importante: 
  Quitamos los datos fake del frontend.
  Ahora las tareas vendran del backend */
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTasks = () => {
  fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(data => {
      const formatted = data.map((task: any) => ({
        id: task.id,
        text: task.text,
        completed: task.completed
      }));
      setTasks(formatted);
      })
    .catch(error => console.error("Error al obtener tareas:", error));
};


  useEffect(() => {
   fetchTasks();
    }, []);
  //2)Conexion con el backend:

 /* useEffect(() => {
  fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((data) => {
      const formattedTasks = data.map((task: any) => ({
        text: task.title,
        completed: task.completed
      }));
      setTasks(formattedTasks);
    })
    .catch((error) => console.error("Error al obtener tareas:", error));
}, []);*/

/* 1.1) Funcion ADD conecta al Backend (POST)
  Ahora React ya no crea la tarea solo localmente
  Ahora la envia al backend*/

  const addTask= (taskText: string) => {
    
   /* const newTask = { 
      id: Date.now(),
      title: taskText,
      completed: false,
    };*/

    const newTask = { 
     text: taskText, // 🔥 CAMBIO AQUÍ
       completed: false,
    };

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask),
    })
    
    .then ((response) => response.json())
    .then(data => {
      console.log("Tarea creada en backend:", data);
      const formattedTask = {
      id: data.id,
      text: data.text,
      completed: data.completed
  };
      //Agregamos la nueva tarea al estado para actualizar la pantalla
     // setTasks([...tasks, formattedTask]);
      setTasks(prev => [...prev, formattedTask]);
    })
    .catch(error => console.error("Error al crear tarea:", error));
  };  
 
 /* const deleteTask = (index: number) => {
  setTasks(tasks.filter((_, i) => i !== index));
  }; */

    const toggleTask = (id: number, completed: boolean) => {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed:!completed })
  })
    .then(() => fetchTasks())
    .catch(error => console.error("Error al actualizar:", error));
};
  
  const deleteTask = (id: number) => {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE"
  })
    .then(() => fetchTasks()) // 🔥 vuelve a cargar todo
    .catch(error => console.error("Error al eliminar:", error));
};
  
  /*const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };*/

  const pendingTasks = tasks.filter(task => !task.completed);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="container">
      <Header />
      <TaskInput onAddTask={addTask} />
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <TaskList 
          tasks={tasks} 
          onDelete={deleteTask}
          onToggle={toggleTask} 
          
        />
      )}
      <Footer 
      total={totalTasks} 
      pending={pendingTasks.length} 
      completed={completedTasks.length} 
      />
    </div>
  );
}
export default App;
