from fastapi import APIRouter

from app.auth.jwt import validar_token

router = APIRouter()

@router.get("/perfil")
def perfil(token: str):

    datos = validar_token(token)

    if not datos:
        return {
            "success": False,
            "mensaje": "Token inválido"
        }

    return {
        "success": True,
        "usuario": datos["usuario"],
        "id": datos["id"]
    }