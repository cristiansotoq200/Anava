import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    id: null,
    nombre: "",
    usuario: "",
    correo: "",
    password: "",
    rol_id: 1
  });

  useEffect(() => {

    cargarUsuarios();

  }, []);

  const cargarUsuarios = async () => {

    try {

      const respuesta = await api.get("/usuarios");

      setUsuarios(respuesta.data);

    } catch (error) {

      console.error(error);

    }

  };

  const guardarUsuario = async () => {

    try {

      await api.post(
        "/usuarios",
        nuevoUsuario
      );

      cargarUsuarios();

      setMostrarFormulario(false);

      setNuevoUsuario({
        id: null,
        nombre: "",
        usuario: "",
        correo: "",
        password: "",
        rol_id: 1
      });

      alert("Usuario creado correctamente");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.mensaje ||
        "Error al crear usuario"
      );

    }

  };

  const editarUsuario = (usuario) => {

    setNuevoUsuario({
      id: usuario.id,
      nombre: usuario.nombre,
      usuario: usuario.usuario,
      correo: usuario.correo,
      password: "",
      rol_id: usuario.rol_id || 1
    });

    setModoEdicion(true);

    setMostrarFormulario(true);

  };

  const actualizarUsuario = async () => {

    try {

      await api.put(
        `/usuarios/${nuevoUsuario.id}`,
        nuevoUsuario
      );

      cargarUsuarios();

      setMostrarFormulario(false);

      setModoEdicion(false);

      setNuevoUsuario({
        id: null,
        nombre: "",
        usuario: "",
        correo: "",
        password: "",
        rol_id: 1
      });

      alert("Usuario actualizado correctamente");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.mensaje ||
        "Error al actualizar usuario"
      );

    }

  };

  const inactivarUsuario = async (id) => {

    try {

      await api.delete(
        `/usuarios/${id}`
      );

      cargarUsuarios();

      alert("Usuario inactivado correctamente");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.mensaje ||
        "Error al inactivar usuario"
      );

    }

  };

  const activarUsuario = async (id) => {

    try {

      await api.put(
        `/usuarios/${id}/activar`
      );

      cargarUsuarios();

      alert("Usuario activado correctamente");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.mensaje ||
        "Error al activar usuario"
      );

    }

  };

  return (

    <MainLayout>

      <h1>Usuarios</h1>

      <button
        onClick={() => {

          setModoEdicion(false);

          setNuevoUsuario({
            id: null,
            nombre: "",
            usuario: "",
            correo: "",
            password: "",
            rol_id: 1
          });

          setMostrarFormulario(true);

        }}
        style={{
          marginBottom: "20px",
          padding: "10px",
          cursor: "pointer"
        }}
      >
        + Nuevo Usuario
      </button>

      {
        mostrarFormulario && (

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px"
            }}
          >

            <h3>
              {
                modoEdicion
                  ? "Editar Usuario"
                  : "Nuevo Usuario"
              }
            </h3>

            <input
              placeholder="Nombre"
              value={nuevoUsuario.nombre}
              onChange={(e) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  nombre: e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Usuario"
              value={nuevoUsuario.usuario}
              onChange={(e) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  usuario: e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Correo"
              value={nuevoUsuario.correo}
              onChange={(e) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  correo: e.target.value
                })
              }
            />

            <br /><br />

            <input
              type="password"
              placeholder="Contraseña"
              value={nuevoUsuario.password}
              onChange={(e) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  password: e.target.value
                })
              }
            />

            <br /><br />

            <input
              type="number"
              placeholder="Rol ID"
              value={nuevoUsuario.rol_id}
              onChange={(e) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  rol_id: Number(e.target.value)
                })
              }
            />

            <br /><br />

            {
              modoEdicion ? (

                <button
                  onClick={actualizarUsuario}
                >
                  Actualizar
                </button>

              ) : (

                <button
                  onClick={guardarUsuario}
                >
                  Guardar
                </button>

              )
            }

            <button
              style={{
                marginLeft: "10px"
              }}
              onClick={() => {

                setMostrarFormulario(false);

                setModoEdicion(false);

              }}
            >
              Cancelar
            </button>

          </div>

        )
      }

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white"
        }}
      >

        <thead>

          <tr
            style={{
              backgroundColor: "#0F172A",
              color: "white"
            }}
          >
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {
            usuarios.map((usuario) => (

              <tr key={usuario.id}>

                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.correo}</td>

                <td>
                  <span
                    style={{
                      color:
                        usuario.estado === "ACTIVO"
                          ? "green"
                          : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {usuario.estado}
                  </span>
                </td>

                <td>

                  <button
                    onClick={() =>
                      editarUsuario(usuario)
                    }
                  >
                    Editar
                  </button>

                  {
                    usuario.estado === "ACTIVO"
                      ? (
                        <button
                          onClick={() =>
                            inactivarUsuario(usuario.id)
                          }
                          style={{
                            marginLeft: "10px"
                          }}
                        >
                          Inactivar
                        </button>
                      )
                      : (
                        <button
                          onClick={() =>
                            activarUsuario(usuario.id)
                          }
                          style={{
                            marginLeft: "10px"
                          }}
                        >
                          Activar
                        </button>
                      )
                  }

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </MainLayout>

  );

}

export default Usuarios;