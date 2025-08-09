import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is Required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is Required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("https://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      console.log("form submitted:", form);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <>
      <section className="min-h-screen bg-zing-900 text-white flex items-center justify-center">
        <Helmet>
          <title>Contact | Portfolio Codex</title>
          <meta
            name="description"
            content="Get in touch with the architect of this digital realm. Open channels for collaboration, feedback, or summoning your next project."
          />
          <meta property="og:title" content="Contact | Portfolio Codex" />
          <meta
            property="og:description"
            content="Reach out via the arcane forms of email or summon a connection via GitHub."
          />
          <meta property="og:image" content="/images/og-contact.png" />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-amber-300mb-8">
            📬 Contact Me
          </h1>

          {submitted ? (
            <p className="text-emerald-400">
              Message succesfully sent. I'll respond soon!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block md-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
