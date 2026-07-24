import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Permisos() {

  const [permisos, setPermisos] = useState([]);

  useEffect(() => {

    cargarPermisos();

  }, []);

  const cargarPermisos = async () => {

    try {

      const respuesta =
        await api.get("/permisos");

      setPermisos(
        respuesta.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <MainLayout>

      <h1>Permisos</h1>

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
            <th>Código</th>
            <th>Nombre</th>
          </tr>

        </thead>

        <tbody>

          {
            permisos.map((permiso) => (

              <tr key={permiso.id}>

                <td>{permiso.id}</td>

                <td>{permiso.codigo}</td>

                <td>{permiso.nombre}</td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </MainLayout>

  );

}

export default Permisos;