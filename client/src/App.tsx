import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import Contact from "./pages/Contact";
import RootFrame from "./layouts/RootFrame";
import ProjectDetail from "./pages/ProjectDetail";
import DocsPage from "./pages/DocPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootFrame />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs/:slug" element={<DocsPage />} />
        </Route>
      </Routes>
    </>
  );
}
