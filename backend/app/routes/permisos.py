from fastapi import APIRouter

from app.models.permiso_model import obtener_permisos

router = APIRouter()

@router.get("/permisos")
def listar_permisos():

    return obtener_permisos()