import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Flota() {

  const [vehiculos, setVehiculos] =
    useState([]);

  const [mostrarFormulario,
    setMostrarFormulario] =
    useState(false);

  const [modoEdicion,
    setModoEdicion] =
    useState(false);

  const [nuevoVehiculo,
    setNuevoVehiculo] =
    useState({
        id: null,

        licencia_transito: "",
        placa: "",
        marca: "",
        linea: "",
        modelo: "",
        color: "",
        transportadora: "",

        clase_vehiculo: "",
        tipo_carroceria: "",
        servicio: "",
        combustible: "",
        capacidad: "",
        cilindrada: "",

        kilometraje: 0,

        vin: "",
        numero_motor: "",
        registro_motor: "",

        numero_serie: "",
        registro_serie: "",

        numero_chasis: "",
        registro_chasis: "",

        propietario: "",
        tipo_documento: "",
        numero_documento: "",

        fecha_vencimiento_soat: "",
        fecha_vencimiento_tecnomecanica: "",

        observaciones: ""
    });


  useEffect(() => {

    cargarVehiculos();

  }, []);

  const cargarVehiculos = async () => {

    try {

      const respuesta =
        await api.get("/vehiculos");

      setVehiculos(
        respuesta.data
      );

    } catch (error) {

      console.error(error);

    }

  };

  const limpiarFormulario = () => {

    setNuevoVehiculo({
      id: null,
      licencia_transito: "",
      placa: "",
      marca: "",
      linea: "",
      modelo: "",
      color: "",
      transportadora: "",
      kilometraje: 0
    });

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

      limpiarFormulario();

      setMostrarFormulario(false);

      cargarVehiculos();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar"
      );

    }

  };

  const actualizarVehiculo =
    async () => {

      try {

        await api.put(
          `/vehiculos/${nuevoVehiculo.id}`,
          nuevoVehiculo
        );

        alert(
          "Vehículo actualizado correctamente"
        );

        setModoEdicion(false);

        setMostrarFormulario(false);

        limpiarFormulario();

        cargarVehiculos();

      } catch (error) {

        console.error(error);

        alert(
          "Error al actualizar"
        );

      }

    };

  const editarVehiculo =
    (vehiculo) => {

      setNuevoVehiculo(
        vehiculo
      );

      setModoEdicion(true);

      setMostrarFormulario(true);

    };

  const activarVehiculo =
    async (id) => {

      try {

        await api.put(
          `/vehiculos/${id}/activar`
        );

        cargarVehiculos();

      } catch (error) {

        console.error(error);

      }

    };

  const inactivarVehiculo =
    async (id) => {

      const motivo =
        prompt(
          "Motivo de inactivación"
        );

      if (!motivo) return;

      try {

        await api.delete(
          `/vehiculos/${id}`,
          {
            data: {
              motivo,
              observaciones: ""
            }
          }
        );

        cargarVehiculos();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <MainLayout>

      <h1>
        Flota
      </h1>

      <p
        style={{
          color: "#64748B"
        }}
      >
        Administración de vehículos de la operación logística.
      </p>

      <button
        onClick={() => {

          setModoEdicion(false);

          limpiarFormulario();

          setMostrarFormulario(true);

        }}
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
              padding: "30px",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow:
                "0px 2px 6px rgba(0,0,0,0.1)"
            }}
          >

            <h2>

              {
                modoEdicion
                ? "Editar Vehículo"
                : "Nuevo Vehículo"
              }

            </h2>

            <hr />

            <h3>
              Información General
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "15px"
              }}
            >

              <input
                placeholder="Licencia Tránsito"
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

              <input
                placeholder="Placa"
                value={nuevoVehiculo.placa}
                onChange={(e) =>
                  setNuevoVehiculo({
                    ...nuevoVehiculo,
                    placa:
                      e.target.value
                  })
                }
              />

              <input
                placeholder="Marca"
                value={nuevoVehiculo.marca}
                onChange={(e) =>
                  setNuevoVehiculo({
                    ...nuevoVehiculo,
                    marca:
                      e.target.value
                  })
                }
              />

              <input
                placeholder="Línea"
                value={nuevoVehiculo.linea}
                onChange={(e) =>
                  setNuevoVehiculo({
                    ...nuevoVehiculo,
                    linea:
                      e.target.value
                  })
                }
              />

              <input
                placeholder="Modelo"
                value={nuevoVehiculo.modelo}
                onChange={(e) =>
                  setNuevoVehiculo({
                    ...nuevoVehiculo,
                    modelo:
                      e.target.value
                  })
                }
              />

              <input
                placeholder="Color"
                value={nuevoVehiculo.color}
                onChange={(e) =>
                  setNuevoVehiculo({
                    ...nuevoVehiculo,
                    color:
                      e.target.value
                  })
                }
              />

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
              
            </div>
            <br />

            <h3>
            Características
            </h3>

            <div
            style={{
                display: "grid",
                gridTemplateColumns:
                "1fr 1fr",
                gap: "15px"
            }}
            >

            <input
                placeholder="Clase Vehículo"
                value={nuevoVehiculo.clase_vehiculo}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    clase_vehiculo:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Tipo Carrocería"
                value={nuevoVehiculo.tipo_carroceria}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    tipo_carroceria:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Servicio"
                value={nuevoVehiculo.servicio}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    servicio:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Combustible"
                value={nuevoVehiculo.combustible}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    combustible:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Capacidad"
                value={nuevoVehiculo.capacidad}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    capacidad:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Cilindrada"
                value={nuevoVehiculo.cilindrada}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    cilindrada:
                    e.target.value
                })
                }
            />
            </div>
            <br />
            
            <h3>
            Identificación Técnica
            </h3>

            <div
            style={{
                display: "grid",
                gridTemplateColumns:
                "1fr 1fr",
                gap: "15px"
            }}
            >

            <input
                placeholder="VIN"
                value={nuevoVehiculo.vin}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    vin: e.target.value
                })
                }
            />

            <input
                placeholder="Número Motor"
                value={nuevoVehiculo.numero_motor}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    numero_motor:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Registro Motor"
                value={nuevoVehiculo.registro_motor}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    registro_motor:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Número Serie"
                value={nuevoVehiculo.numero_serie}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    numero_serie:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Registro Serie"
                value={nuevoVehiculo.registro_serie}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    registro_serie:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Número Chasis"
                value={nuevoVehiculo.numero_chasis}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    numero_chasis:
                    e.target.value
                })
                }
            />

            <input
                placeholder="Registro Chasis"
                value={nuevoVehiculo.registro_chasis}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    registro_chasis:
                    e.target.value
                })
                }
            />

            </div>
            <br />

            <h3>
            Propietario
            </h3>

            <div
            style={{
                display: "grid",
                gridTemplateColumns:
                "1fr 1fr",
                gap: "15px"
            }}
            >

            <input
                placeholder="Propietario"
                value={nuevoVehiculo.propietario}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    propietario:
                    e.target.value
                })
                }
            />

            <select
                value={nuevoVehiculo.tipo_documento}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    tipo_documento:
                    e.target.value
                })
                }
            >
                <option value="">
                Tipo Documento
                </option>

                <option value="CC">
                CC
                </option>

                <option value="CE">
                CE
                </option>

                <option value="NIT">
                NIT
                </option>

                <option value="PAS">
                PAS
                </option>

                <option value="PPT">
                PPT
                </option>

            </select>

            <input
                placeholder="Número Documento"
                value={nuevoVehiculo.numero_documento}
                onChange={(e) =>
                setNuevoVehiculo({
                    ...nuevoVehiculo,
                    numero_documento:
                    e.target.value
                })
                }
            />

            </div>
            <br />

            <h3>
            Documentación
            </h3>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px"
            }}
            >

            <div
                style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px"
                }}
            >

                <label>
                Vencimiento SOAT
                </label>

                <input
                type="date"
                value={
                    nuevoVehiculo.fecha_vencimiento_soat
                }
                onChange={(e) =>
                    setNuevoVehiculo({
                    ...nuevoVehiculo,
                    fecha_vencimiento_soat:
                        e.target.value
                    })
                }
                />

            </div>

            <div
                style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px"
                }}
            >

                <label>
                Vencimiento Tecnomecánica
                </label>

                <input
                type="date"
                value={
                    nuevoVehiculo.fecha_vencimiento_tecnomecanica
                }
                onChange={(e) =>
                    setNuevoVehiculo({
                    ...nuevoVehiculo,
                    fecha_vencimiento_tecnomecanica:
                        e.target.value
                    })
                }
                />

            </div>

            </div>
            <br />

            <h3>
            Observaciones
            </h3>

            <textarea
            rows="4"
            style={{
                width: "100%"
            }}
            value={
                nuevoVehiculo.observaciones
            }
            onChange={(e) =>
                setNuevoVehiculo({
                ...nuevoVehiculo,
                observaciones:
                    e.target.value
                })
            }
            />
            {
              modoEdicion
              ? (
                <button
                  onClick={
                    actualizarVehiculo
                  }
                >
                  Actualizar
                </button>
              )
              : (
                <button
                  onClick={
                    guardarVehiculo
                  }
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

                setMostrarFormulario(
                  false
                );

                setModoEdicion(
                  false
                );

                limpiarFormulario();

              }}
            >
              Cancelar
            </button>

          </div>

        )
      }

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "15px"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
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

              <th>Acciones</th>

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

                    <td>

                      <button
                        onClick={() =>
                          editarVehiculo(
                            vehiculo
                          )
                        }
                      >
                        Editar
                      </button>

                      {" "}

                      {
                        vehiculo.estado ===
                        "ACTIVO"
                        ? (
                          <button
                            onClick={() =>
                              inactivarVehiculo(
                                vehiculo.id
                              )
                            }
                          >
                            Inactivar
                          </button>
                        )
                        : (
                          <button
                            onClick={() =>
                              activarVehiculo(
                                vehiculo.id
                              )
                            }
                          >
                            Activar
                          </button>
                        )
                      }

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </MainLayout>

  );

}

export default Flota;