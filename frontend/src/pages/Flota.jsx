import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Flota() {

  const [vehiculos, setVehiculos] =
    useState([]);

  const [mostrarFormulario,
    setMostrarFormulario] =
    useState(false);

  const [nuevoVehiculo,
    setNuevoVehiculo] =
    useState({
      licencia_transito: "",
      placa: "",
      marca: "",
      linea: "",
      modelo: "",
      color: "",
      transportadora: "",
      kilometraje: 0
    });

  useEffect(() => {

    cargarVehiculos();

  }, []);

  const cargarVehiculos = async () => {

    try {

      const respuesta =
        await api.get(
          "/vehiculos"
        );

      setVehiculos(
        respuesta.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  const guardarVehiculo = async () => {

    try {

      await api.post(
        "/vehiculos",
        nuevoVehiculo
      );

      alert(
        "Vehículo creado correctamente"
      );

      setMostrarFormulario(
        false
      );

      cargarVehiculos();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar"
      );

    }

  };

  return (

    <MainLayout>

      <h1>Flota</h1>

      <button
        onClick={() =>
          setMostrarFormulario(true)
        }
      >
        + Nuevo Vehículo
      </button>

      <br />
      <br />

      {
        mostrarFormulario && (

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px"
            }}
          >

            <h3>
              Nuevo Vehículo
            </h3>

            <input
              placeholder="Licencia Transito"
              value={
                nuevoVehiculo.licencia_transito
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  licencia_transito:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Placa"
              value={
                nuevoVehiculo.placa
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  placa:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Marca"
              value={
                nuevoVehiculo.marca
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  marca:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Linea"
              value={
                nuevoVehiculo.linea
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  linea:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Modelo"
              value={
                nuevoVehiculo.modelo
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  modelo:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Color"
              value={
                nuevoVehiculo.color
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  color:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              placeholder="Transportadora"
              value={
                nuevoVehiculo.transportadora
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  transportadora:
                    e.target.value
                })
              }
            />

            <br /><br />

            <input
              type="number"
              placeholder="Kilometraje"
              value={
                nuevoVehiculo.kilometraje
              }
              onChange={(e) =>
                setNuevoVehiculo({
                  ...nuevoVehiculo,
                  kilometraje:
                    e.target.value
                })
              }
            />

            <br /><br />

            <button
              onClick={guardarVehiculo}
            >
              Guardar
            </button>

            <button
              style={{
                marginLeft: "10px"
              }}
              onClick={() =>
                setMostrarFormulario(false)
              }
            >
              Cancelar
            </button>

          </div>

        )
      }

      <table
        border="1"
        style={{
          width: "100%"
        }}
      >

        <thead>

          <tr>

            <th>Placa</th>

            <th>Marca</th>

            <th>Modelo</th>

            <th>Transportadora</th>

            <th>Kilometraje</th>

            <th>Estado</th>

          </tr>

        </thead>

        <tbody>

          {
            vehiculos.map(
              (vehiculo) => (

                <tr
                  key={vehiculo.id}
                >

                  <td>
                    {vehiculo.placa}
                  </td>

                  <td>
                    {vehiculo.marca}
                  </td>

                  <td>
                    {vehiculo.modelo}
                  </td>

                  <td>
                    {
                      vehiculo.transportadora
                    }
                  </td>

                  <td>
                    {
                      vehiculo.kilometraje
                    }
                  </td>

                  <td>
                    {vehiculo.estado}
                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </MainLayout>

  );

}

export default Flota;