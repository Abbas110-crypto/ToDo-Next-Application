import Image from "next/image";
import styles from "./page.module.css";
import ToDo from './pages/index';

export default function Home() {
  return (
    <div>
      <ToDo />
    </div>
  );
}
