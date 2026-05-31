import Link from "next/link";
import "./page.css";

export default function HomePage() {
  return (
    <main className="homeContainer">
      <h1 className="homeTitle">Appium Framework - Test Results Dashboard</h1>
      <p className="homeSubtitle">
        Monitorización de tests en tiempo real
      </p>
      <Link href="/results" className="homeButton">
        Ver Resultados
      </Link>
    </main>
  );
}
