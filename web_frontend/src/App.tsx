import { Outlet, Link } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import './index.css';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto mt-[60px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
