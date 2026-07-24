from fastapi import APIRouter

from app.models.rol_model import (
    obtener_roles,
    crear_rol,
    actualizar_rol,
    inactivar_rol,
    activar_rol
)
router = APIRouter()

@router.get("/roles")
def listar_roles():

    return obtener_roles()

@router.post("/roles")
def nuevo_rol(datos: dict):

    return crear_rol(datos)

@router.put("/roles/{id}")
def editar_rol(id: int, datos: dict):

    return actualizar_rol(id, datos)

@router.delete("/roles/{id}")
def eliminar_rol(id: int):

    return inactivar_rol(id)

@router.put("/roles/{id}/activar")
def reactivar_rol(id: int):

    return activar_rol(id)