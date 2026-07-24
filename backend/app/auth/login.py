from fastapi import APIRouter
from sqlalchemy import text

from app.database.conexion import engine
from app.auth.jwt import crear_token

router = APIRouter()


@router.post("/login")
def login(datos: dict):

    usuario = datos.get("usuario")
    password = datos.get("password")

    query = text("""
        SELECT
            u.id,
            u.nombre,
            u.usuario,
            u.password,
            u.estado,
            r.id AS rol_id,
            r.nombre AS rol_nombre
        FROM usuarios u
        INNER JOIN roles r
            ON u.rol_id = r.id
        WHERE u.usuario = :usuario
    """)

    query_permisos = text("""
        SELECT
            p.codigo
        FROM roles_permisos rp
        INNER JOIN permisos p
            ON rp.permiso_id = p.id
        WHERE rp.rol_id = :rol_id
    """)

    with engine.connect() as conn:

        resultado = conn.execute(
            query,
            {"usuario": usuario}
        ).fetchone()

        # Usuario no existe
        if not resultado:

            return {
                "success": False,
                "mensaje": "Usuario no encontrado"
            }

        # Contraseña incorrecta
        if resultado.password != password:

            return {
                "success": False,
                "mensaje": "Contraseña incorrecta"
            }

        # Obtener permisos del rol
        resultado_permisos = conn.execute(
            query_permisos,
            {
                "rol_id": resultado.rol_id
            }
        )

        permisos = []

        for permiso in resultado_permisos:

            permisos.append(
                permiso.codigo
            )

        # Generar JWT
        token = crear_token({
            "id": resultado.id,
            "usuario": resultado.usuario,
            "rol": resultado.rol_nombre
        })

        return {
            "success": True,
            "mensaje": "Login correcto",
            "usuario": resultado.usuario,
            "nombre": resultado.nombre,
            "rol": resultado.rol_nombre,
            "permisos": permisos,
            "token": token,
            "rol_id": resultado.rol_id
        }