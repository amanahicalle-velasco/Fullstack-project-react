# Task Manager (Gestor de Tareas)
 
Aplicación web Full Stack tipo Task Manager que permite a los usuarios realizar operaciones CRUD (crear, ver, actualizar y eliminar) para gestionar tareas de manera eficiente y persistente.
 
[![CI](https://github.com/amanahicalle-velasco/Fullstack-project-react/actions/workflows/ci.yml/badge.svg)](https://github.com/amanahicalle-velasco/Fullstack-project-react/actions/workflows/ci.yml)
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/amanahicalle-velasco/Fullstack-project-react.git
cd Fullstack-project-react
npm install
```

### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL=
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 1).

Prueba de protección de la rama main.