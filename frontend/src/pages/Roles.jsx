import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Roles() {

  const [roles, setRoles] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const [permisosRol, setPermisosRol] = useState([]);

  const [todosPermisos, setTodosPermisos] = useState([]);

  const [menusRol, setMenusRol] = useState([]);

  const [todosMenus, setTodosMenus] = useState([]);

  const [mostrarMenus, setMostrarMenus] = useState(false);

  const [nuevoRol, setNuevoRol] = useState({
    id: null,
    nombre: ""
  });

  useEffect(() => {

    cargarRoles();

  }, []);

  const cargarRoles = async () => {

    try {

      const respuesta = await api.get("/roles");

      setRoles(respuesta.data);

    } catch (error) {

      console.error(error);

    }

  };

  const cargarTodosPermisos = async () => {

    try {

      const respuesta = await api.get(
        "/permisos"
      );

      setTodosPermisos(
        respuesta.data
      );

    } catch (error) {

      console.error(error);

    }

  };

    const cargarTodosMenus = async () => {

    try {

      const respuesta = await api.get(
        "/menus"
      );

      setTodosMenus(
        respuesta.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  const guardarRol = async () => {

    try {

      await api.post(
        "/roles",
        nuevoRol
      );

      cargarRoles();

      setMostrarFormulario(false);

      setNuevoRol({
        id: null,
        nombre: ""
      });

      alert("Rol creado correctamente");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Error al crear rol"
      );

    }

  };

  const editarRol = (rol) => {

    setNuevoRol({
      id: rol.id,
      nombre: rol.nombre
    });

    setModoEdicion(true);

    setMostrarFormulario(true);

  };

  const actualizarRol = async () => {

    try {

      await api.put(
        `/roles/${nuevoRol.id}`,
        nuevoRol
      );

      cargarRoles();

      setMostrarFormulario(false);

      setModoEdicion(false);

      alert("Rol actualizado correctamente");

    } catch (error) {

      console.error(error);

      alert("Error al actualizar rol");

    }

  };

  const inactivarRol = async (id) => {

    try {

      await api.delete(
        `/roles/${id}`
      );

      cargarRoles();

      alert("Rol inactivado");

    } catch (error) {

      console.error(error);

    }

  };

  const activarRol = async (id) => {

    try {

      await api.put(
        `/roles/${id}/activar`
      );

      cargarRoles();

      alert("Rol activado");

    } catch (error) {

      console.error(error);

    }

  };

  const gestionarPermisos = async (rol) => {

    try {

      const respuesta = await api.get(
        `/roles/${rol.id}/permisos`
      );

      setPermisosRol(
        respuesta.data
      );

      setRolSeleccionado(
        rol
      );

      cargarTodosPermisos();

    } catch (error) {

      console.error(error);

    }

  };

    const gestionarMenus = async (rol) => {

    try {

      const respuesta = await api.get(
        `/roles/${rol.id}/menus`
      );

      setMenusRol(
        respuesta.data
      );

      setRolSeleccionado(
        rol
      );

      setMostrarMenus(true);

      cargarTodosMenus();

    } catch (error) {

      console.error(error);

    }

  };

    const asignarMenu = async (
    menuId
  ) => {

    try {

      await api.post(
        "/roles-menus",
        {
          rol_id: rolSeleccionado.id,
          menu_id: menuId
        }
      );

      gestionarMenus(
        rolSeleccionado
      );

      alert(
        "Menú asignado correctamente"
      );

    } catch (error) {

      console.error(error);

    }

  };

    const quitarMenu = async (
    rolMenuId
  ) => {

    try {

      await api.delete(
        `/roles-menus/${rolMenuId}`
      );

      gestionarMenus(
        rolSeleccionado
      );

      alert(
        "Menú eliminado correctamente"
      );

    } catch (error) {

      console.error(error);

    }

  };

  const asignarPermiso = async (
    permisoId
  ) => {

    try {

      await api.post(
        "/roles-permisos",
        {
          rol_id: rolSeleccionado.id,
          permiso_id: permisoId
        }
      );

      gestionarPermisos(
        rolSeleccionado
      );

      alert(
        "Permiso asignado correctamente"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al asignar permiso"
      );

    }

  };
    const quitarPermiso = async (
  permisoRolId
  ) => {

    try {

      await api.delete(
        `/roles-permisos/${permisoRolId}`
      );

      gestionarPermisos(
        rolSeleccionado
      );

      alert(
        "Permiso eliminado correctamente"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al eliminar permiso"
      );

    }

  };

  return (

    <MainLayout>

      <h1>Roles</h1>

      <button
        onClick={() => {

          setModoEdicion(false);

          setNuevoRol({
            id: null,
            nombre: ""
          });

          setMostrarFormulario(true);

        }}
      >
        + Nuevo Rol
      </button>

      <br /><br />

      {
        mostrarFormulario && (

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px"
            }}
          >

            <input
              placeholder="Nombre"
              value={nuevoRol.nombre}
              onChange={(e) =>
                setNuevoRol({
                  ...nuevoRol,
                  nombre: e.target.value
                })
              }
            />

            <br /><br />

            {
              modoEdicion
              ? (
                <button
                  onClick={actualizarRol}
                >
                  Actualizar
                </button>
              )
              : (
                <button
                  onClick={guardarRol}
                >
                  Guardar
                </button>
              )
            }

          </div>

        )
      }

      {
        rolSeleccionado && (

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px"
            }}
          >

            <h3>
              Permisos de {rolSeleccionado.nombre}
            </h3>

            <table
              style={{
                width: "100%"
              }}
            >

              <thead>

                <tr>

                  <th>Estado</th>

                  <th>Código</th>

                  <th>Nombre</th>

                </tr>

              </thead>

              <tbody>

                {
                  todosPermisos.map(
                    (permiso) => {

                      const asignado =
                        permisosRol.some(
                          (p) =>
                            p.codigo ===
                            permiso.codigo
                        );

                      return (

                        <tr
                          key={permiso.id}
                        >

                          <td>
                            {
                              asignado
                              ? (
                                <button
                                  onClick={() => {

                                    const permisoActual =
                                      permisosRol.find(
                                        (p) =>
                                          p.codigo ===
                                          permiso.codigo
                                      );

                                    quitarPermiso(
                                      permisoActual.id
                                    );

                                  }}
                                  style={{
                                    backgroundColor: "#DC2626",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    cursor: "pointer"
                                  }}
                                >
                                  Quitar
                                </button>
                              )
                              : (
                                <button
                                  onClick={() =>
                                    asignarPermiso(
                                      permiso.id
                                    )
                                  }
                                  style={{
                                    backgroundColor: "#16A34A",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    cursor: "pointer"
                                  }}
                                >
                                  Asignar
                                </button>
                              )
                            }
                            
                          </td>

                          <td>
                            {permiso.codigo}
                          </td>

                          <td>
                            {permiso.nombre}
                          </td>

                        </tr>

                      );

                    }
                  )
                }

              </tbody>

            </table>

          </div>

        )
      }

      {
      mostrarMenus && rolSeleccionado && (

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginBottom: "20px"
          }}
        >

          <h3>
            Menús de {rolSeleccionado.nombre}
          </h3>

          <table
            style={{
              width: "100%"
            }}
          >

            <thead>

              <tr>

                <th>Estado</th>

                <th>Menú</th>

                <th>Ruta</th>

              </tr>

            </thead>

            <tbody>

              {
                todosMenus.map(
                  (menu) => {

                    const asignado =
                      menusRol.some(
                        (m) =>
                          m.menu_id ===
                          menu.id
                      );

                    return (

                      <tr key={menu.id}>

                        <td>

                          {
                            asignado
                            ? (
                              <button
                                onClick={() => {

                                  const menuActual =
                                    menusRol.find(
                                      (m) =>
                                        m.menu_id ===
                                        menu.id
                                    );

                                  quitarMenu(
                                    menuActual.id
                                  );

                                }}
                                style={{
                                  backgroundColor: "#DC2626",
                                  color: "white"
                                }}
                              >
                                Quitar
                              </button>
                            )
                            : (
                              <button
                                onClick={() =>
                                  asignarMenu(
                                    menu.id
                                  )
                                }
                                style={{
                                  backgroundColor: "#16A34A",
                                  color: "white"
                                }}
                              >
                                Asignar
                              </button>
                            )
                          }

                        </td>

                        <td>{menu.nombre}</td>

                        <td>{menu.ruta}</td>

                      </tr>

                    );

                  }
                )
              }

            </tbody>

          </table>

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
            <th>Estado</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {
            roles.map((rol) => (

              <tr key={rol.id}>

                <td>{rol.id}</td>

                <td>{rol.nombre}</td>

                <td>{rol.estado}</td>

                <td>

                  <button
                    onClick={() =>
                      editarRol(rol)
                    }
                  >
                    Editar
                  </button>

                  {
                    rol.estado === "ACTIVO"
                    ? (
                      <button
                        onClick={() =>
                          inactivarRol(
                            rol.id
                          )
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
                          activarRol(
                            rol.id
                          )
                        }
                        style={{
                          marginLeft: "10px"
                        }}
                      >
                        Activar
                      </button>
                    )
                  }

                  <button
                    onClick={() =>
                      gestionarPermisos(rol)
                    }
                    style={{
                      marginLeft: "10px"
                    }}
                  >
                    Permisos
                  </button>
                  <button
                    onClick={() =>
                      gestionarMenus(rol)
                    }
                    style={{
                      marginLeft: "10px"
                    }}
                  >
                    Menús
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </MainLayout>

  );

}

export default Roles;