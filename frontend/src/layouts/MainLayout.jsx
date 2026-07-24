import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MainLayout({ children }) {

  const usuario =
    localStorage.getItem("usuario");

  const rol =
    localStorage.getItem("rol");

  const rolId =
    localStorage.getItem("rol_id");

  const [menus, setMenus] = useState([]);

  useEffect(() => {

    cargarMenus();

  }, []);

  const cargarMenus = async () => {

    try {

      const respuesta =
        await api.get(
          `/roles/${rolId}/menus`
        );

      setMenus(
        respuesta.data
      );

    } catch (error) {

      console.error(
        "Error cargando menús:",
        error
      );

    }

  };

  const cerrarSesion = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div
      style={{
        display: "flex",
        height: "100vh"
      }}
    >

      <div
        style={{
          width: "250px",
          backgroundColor: "#0F172A",
          color: "white",
          padding: "20px"
        }}
      >

        <h2
          style={{
            textAlign: "center"
          }}
        >
          ANAVA
        </h2>

        <hr />

        <p
          style={{
            textAlign: "center"
          }}
        >
          <strong>{usuario}</strong>
        </p>

        <p
          style={{
            textAlign: "center"
          }}
        >
          {rol}
        </p>

        <hr />

        {menus.map((menu) => (

          <Link
            key={menu.id}
            to={menu.ruta}
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              padding: "10px",
              marginBottom: "5px",
              borderRadius: "5px"
            }}
          >
            {menu.nombre}
          </Link>

        ))}

        <hr />

        <button
          onClick={cerrarSesion}
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          Cerrar Sesión
        </button>

      </div>

      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#F1F5F9"
        }}
      >
        {children}
      </div>

    </div>

  );

}

export default MainLayout;