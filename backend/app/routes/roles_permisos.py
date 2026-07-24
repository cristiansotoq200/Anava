from fastapi import APIRouter

from backend.app.models.rol_permiso_model import (
    asignar_permiso,
    obtener_permisos_rol,
    quitar_permiso
)

router = APIRouter()


@router.post("/roles-permisos")
def crear_asignacion(datos: dict):

    return asignar_permiso(datos)


@router.get("/roles/{rol_id}/permisos")
def listar_permisos_rol(rol_id: int):

    return obtener_permisos_rol(rol_id)


@router.delete("/roles-permisos/{id}")
def eliminar_asignacion(id: int):

    return quitar_permiso(id)