import TechIcons from "./TechIcons";

export default function About() {
  return (
    <section className="py-20 px-6 bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-emerald-400 tracking-tight">
          📖About Me
        </h2>
        <p className="text-lg leading-relzxed text-gray-300">
          I am a builder of systems, seeker of knowledge, and architect of code.
          My path weaves through full-stack engineering, cybersecurity
          awareness, and a passion for elegant solutions.
        </p>
        <p>
          From scripting in Python to deploying Node/Express APIs, from crafting
          clean React intrefaces to optimizing SQL queries - my toolkit is
          shaped for performance, clarity, and fire
        </p>
        <p className="italic text-sm text-gray-500">
          *Stone rots. Steel rusts. Only living myth endures.*
        </p>
        <TechIcons />
      </div>
    </section>
  );
}
