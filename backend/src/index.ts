
require("dotenv").config();

const express = require("express");

const cors= require("cors");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient ({ adapter });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/*
let tasks = [
  { id: 1, title: 'Study Express', completed: false },
  { id: 2, title: 'Build backend', completed: true },
];
*/
app.get("/", (req:any, res:any) => {
    res.send("Backend is running");
});

app.get("/tasks",async (req:any, res:any) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error en GET/tasks tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

/*
app.get ("/tasks", (req:any , res:any) => {
    res.json (tasks);
});

app.post("/tasks", (req:any , res:any) => {

    console.log("POST /tasks fue llamado");
    
    console.log("Datos recibidos", req.body);


    const newTask = {
        id: req.body.id,
        title: req.body.title,
        completed: req.body.completed
    };
    tasks.push(newTask);
    console.log("Lista actualizada:", tasks);
    res.json(newTask);
});*/

app.post("/tasks", async (req:any, res:any) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        text: req.body.text,
        completed: false,
      },
    });

    res.json(newTask);
  } catch (error) {
    console.error("Error en POST/tasks:", error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

/*

app.delete("/tasks/:id", (req:any, res:any) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Tarea eliminada" });
});

app.put("/tasks/:id", (req:any, res:any) => {
  const id = Number(req.params.id);

  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  res.json({ message: "Tarea actualizada" });
});
*/
app.put("/tasks/:id", async (req:any, res:any) => {
  try {
  const TaskId = Number(req.params.id);

  const updatedTask = await prisma.task.update({
    where: { id: TaskId },
    data: { completed: req.body.completed },
  });

  res.json(updatedTask);
} catch (error) {
  console.error("Error en PUT/tasks/:id:", error);
  res.status(500).json({ error: "Error al actualizar tarea" });
}
});

app.delete("/tasks/:id", async (req:any, res:any) => {
  try {
    const TaskId = Number(req.params.id);

    await prisma.task.delete({
      where: { id: TaskId },
    });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error("Error en DELETE/tasks/:id:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

app.listen (PORT, () => {
    console.log (`Server is running on port ${PORT}`);
});