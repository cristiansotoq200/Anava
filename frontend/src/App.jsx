import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios"; 
import Roles from "./pages/Roles"; 
import Permisos from "./pages/Permisos";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/usuarios"
          element={<Usuarios />}
        />

        <Route
         path="/roles"
         element={<Roles />}
        />

        <Route
         path="/permisos"
         element={<Permisos />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;