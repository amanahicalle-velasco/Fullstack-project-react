require("dotenv").config();

const express = require("express");
const cors= require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_clave_secreta";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient ({ adapter });
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

app.get("/private", verifyToken, (req: any, res: any) => {
  res.json({ message: "Acceso permitido" });
});

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
app.post("/login", (req: any, res: any) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  if (username === "admin" && password === "1234") {

    const token = jwt.sign(
      { username: username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
});

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