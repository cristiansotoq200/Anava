import { useState } from "react";
import api from "../services/api";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {

    try {

      const respuesta = await api.post("/login", {
        usuario,
        password
      });

      console.log(respuesta.data);

      localStorage.setItem(
        "token",
        respuesta.data.token
      );

      localStorage.setItem(
        "usuario",
        respuesta.data.usuario
      );

      localStorage.setItem(
        "rol",
        respuesta.data.rol
      );

      localStorage.setItem(
        "rol_id",
        respuesta.data.rol_id
      );

      localStorage.setItem(
        "permisos",
        JSON.stringify(
          respuesta.data.permisos
        )
      );

      window.location.href = "/dashboard";

    } catch (error) {

      console.error(error);

      alert("Usuario o contraseña incorrectos");

    }

  };

  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px"
        }}
      >
        ANAVA
      </h1>

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) =>
          setUsuario(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={iniciarSesion}
      >
        Ingresar
      </button>

    </div>
  );
}

export default Login;