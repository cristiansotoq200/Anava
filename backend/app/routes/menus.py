from fastapi import APIRouter

from app.models.menu_model import (
    obtener_menus_por_rol,
    obtener_todos_los_menus,
    asignar_menu,
    quitar_menu
)

router = APIRouter()


@router.get("/roles/{rol_id}/menus")
def listar_menus_rol(rol_id: int):

    return obtener_menus_por_rol(rol_id)


@router.get("/menus")
def listar_menus():

    return obtener_todos_los_menus()


@router.post("/roles-menus")
def crear_asignacion(datos: dict):

    return asignar_menu(datos)


@router.delete("/roles-menus/{id}")
def eliminar_asignacion(id: int):

    return quitar_menu(id)