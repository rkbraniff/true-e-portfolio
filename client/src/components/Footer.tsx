import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";



export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-md">
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()} Robert Fischer-Paustian. All rights reserved.
                </p>

                <div className="flex space-x-4">
                    <a 
                    href="https://github.com/rkbraniff"
                    title="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 hover:scale-110 transition-all hover:shadow-5xl"
                    >
                        <FaGithub />
                    </a>
                    <a 
                    href="https://www.linkedin.com/in/robert-fischer-paustian-9b0282313/"
                    title="LinkedIn"
                    target="_blank"
                    rel="noopener noreffer"
                    className="hover:text-emerald-400 hover:scale-110 transition-all hover:shadow-5xl"
                    >
                        <FaLinkedin />
                    </a>
                    <a 
                    href="mailto:rfpaustianbusiness@gmail.com"
                    title="Email"
                    className="hover:text-emerald-400 hover:scale-110 transition-all hover:shadow-5xl"
                    >
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </footer>
    )
}