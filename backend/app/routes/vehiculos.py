from fastapi import APIRouter

from app.models.vehiculo_model import (
    obtener_vehiculos,
    crear_vehiculo,
    actualizar_vehiculo,
    inactivar_vehiculo,
    activar_vehiculo
)

router = APIRouter()


@router.get("/vehiculos")
def listar_vehiculos():

    return obtener_vehiculos()


@router.post("/vehiculos")
def crear(datos: dict):

    return crear_vehiculo(datos)


@router.put("/vehiculos/{id}")
def actualizar(
    id: int,
    datos: dict
):

    return actualizar_vehiculo(
        id,
        datos
    )


@router.delete("/vehiculos/{id}")
def inactivar(
    id: int,
    datos: dict
):

    return inactivar_vehiculo(
        id,
        datos["motivo"],
        datos.get(
            "observaciones",
            ""
        )
    )


@router.put(
    "/vehiculos/{id}/activar"
)
def activar(id: int):

    return activar_vehiculo(id)