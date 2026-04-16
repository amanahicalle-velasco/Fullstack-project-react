import "./Footer.css";

type Props = {
  total: number;
  pending: number;
  completed: number;
};

export default function Footer({ total, pending, completed }: Props) 
  {
  return <footer className="footer">
    Tareas en total: {total} | Pendientes: {pending} | Completadas: {completed}
  </footer>;
}