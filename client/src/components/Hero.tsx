export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
        Raphael Braniff
      </h1>
      <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
        Software Alchemist · Full Stack Developer · Interface Architect
      </h2>
      <div className="flex gap-4 flex-wrap jsutify-center">
        <a 
        href="#projects"
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors duration-200"
        >
            View Projects
        </a>
        <a 
        href="/resume.pdf"
        className="px-6 py-3 border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-md transition-colors duration-200"
        >
            Download Resume
        </a>
      </div>
    </section>
  );
}
