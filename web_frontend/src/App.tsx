import { Outlet, Link } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
