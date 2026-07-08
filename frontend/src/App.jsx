import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Progress from "./pages/Progress";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/problems" element={<Problems />} />

          <Route
            path="/problems/:slug"
            element={<ProblemDetails />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;