import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import { Helmet } from "react-helmet-async";

export default function App() {
  return (
    <>
      <Helmet>
        <title>Home | Portfolio Codex</title>
        <meta name="description" content="Explore my developer portfolio and featured projects." />
        <meta property="og:title" content="Home | Portfolio Codex" />
        <meta property="og:description" content="Explore my developer portfolio and featured projects." />
        <meta property="og:image" content="/images/og-cover.png" />
      </Helmet>
      <Hero />
      <Projects />
      <About />
    </>
  );
}
