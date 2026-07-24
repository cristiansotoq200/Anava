from fastapi import APIRouter

from app.models.usuario_model import (
    obtener_usuarios,
    crear_usuario,
    actualizar_usuario,
    inactivar_usuario,
    activar_usuario
)


router = APIRouter()

@router.get("/usuarios")
def listar_usuarios(estado: str = None):

    return obtener_usuarios(estado)

@router.post("/usuarios")
def nuevo_usuario(datos: dict):

    return crear_usuario(datos)

@router.put("/usuarios/{id}")
def editar_usuario(id: int, datos: dict):

    return actualizar_usuario(id, datos)

@router.delete("/usuarios/{id}")
def eliminar_usuario(id: int):

    return inactivar_usuario(id)

@router.put("/usuarios/{id}/activar")
def reactivar_usuario(id: int):

    return activar_usuario(id)
