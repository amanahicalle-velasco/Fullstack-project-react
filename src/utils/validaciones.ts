export function esCorreoValido(correo: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

type Tarea = {
  completada: boolean;
};

export function contarTareasPendientes(tareas: Tarea[]): number {
  return tareas.filter((t) => !t.completada).length;
}