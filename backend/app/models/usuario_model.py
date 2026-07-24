from sqlalchemy import text
from fastapi import HTTPException

from app.database.conexion import engine


def obtener_usuarios(estado=None):

    if estado:

        query = text("""
            SELECT
                id,
                nombre,
                usuario,
                correo,
                estado
            FROM usuarios
            WHERE estado = :estado
        """)

        parametros = {
            "estado": estado
        }

    else:

        query = text("""
            SELECT
                id,
                nombre,
                usuario,
                correo,
                estado
            FROM usuarios
        """)

        parametros = {}

    with engine.connect() as conn:

        resultado = conn.execute(
            query,
            parametros
        )

        usuarios = []

        for fila in resultado:

            usuarios.append({
                "id": fila.id,
                "nombre": fila.nombre,
                "usuario": fila.usuario,
                "correo": fila.correo,
                "estado": fila.estado
            })

        return usuarios


def crear_usuario(datos):

    query_usuario = text("""
        SELECT id
        FROM usuarios
        WHERE usuario = :usuario
    """)

    query_correo = text("""
        SELECT id
        FROM usuarios
        WHERE correo = :correo
    """)

    with engine.connect() as conn:

        usuario_existe = conn.execute(
            query_usuario,
            {
                "usuario": datos["usuario"]
            }
        ).fetchone()

        if usuario_existe:

            raise HTTPException(
                status_code=400,
                detail="El usuario ya existe"
            )

        correo_existe = conn.execute(
            query_correo,
            {
                "correo": datos["correo"]
            }
        ).fetchone()

        if correo_existe:

            raise HTTPException(
                status_code=400,
                detail="El correo ya está registrado"
            )

    query = text("""
        INSERT INTO usuarios
        (
            nombre,
            usuario,
            correo,
            password,
            rol_id,
            estado
        )
        VALUES
        (
            :nombre,
            :usuario,
            :correo,
            :password,
            :rol_id,
            'ACTIVO'
        )
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "nombre": datos["nombre"],
                "usuario": datos["usuario"],
                "correo": datos["correo"],
                "password": datos["password"],
                "rol_id": datos["rol_id"]
            }
        )

    return {
        "success": True,
        "mensaje": "Usuario creado correctamente"
    }


def actualizar_usuario(id, datos):

    query = text("""
        UPDATE usuarios
        SET
            nombre = :nombre,
            usuario = :usuario,
            correo = :correo,
            rol_id = :rol_id
        WHERE id = :id
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "id": id,
                "nombre": datos["nombre"],
                "usuario": datos["usuario"],
                "correo": datos["correo"],
                "rol_id": datos["rol_id"]
            }
        )

    return {
        "success": True,
        "mensaje": "Usuario actualizado correctamente"
    }


def inactivar_usuario(id):

    query = text("""
        UPDATE usuarios
        SET estado = 'INACTIVO'
        WHERE id = :id
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "id": id
            }
        )

    return {
        "success": True,
        "mensaje": "Usuario inactivado correctamente"
    }


def activar_usuario(id):

    query = text("""
        UPDATE usuarios
        SET estado = 'ACTIVO'
        WHERE id = :id
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "id": id
            }
        )

    return {
        "success": True,
        "mensaje": "Usuario activado correctamente"
    }