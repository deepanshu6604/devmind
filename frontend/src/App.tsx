import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Chat from "./pages/Chat";
import Onboarding from "./pages/Onboarding";
import Documentation from "./pages/Documentation";
import Settings from "./pages/Settings";
import Repository from "./pages/Repository";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/repository/:id" element={<Repository />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;