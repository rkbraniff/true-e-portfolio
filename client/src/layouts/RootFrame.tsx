import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootFrame() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />
            <main className="flex-grow px-4 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}