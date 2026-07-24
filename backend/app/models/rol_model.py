from sqlalchemy import text
from app.database.conexion import engine


def obtener_roles():

    query = text("""
        SELECT
            id,
            nombre,
            descripcion,
            estado
        FROM roles
        ORDER BY nombre
    """)

    with engine.connect() as conn:

        resultado = conn.execute(query)

        roles = []

        for fila in resultado:

            roles.append({
                "id": fila.id,
                "nombre": fila.nombre,
                "descripcion": fila.descripcion,
                "estado": fila.estado
            })

        return roles
    
def crear_rol(datos):

    query = text("""
        INSERT INTO roles
        (
            nombre,
            descripcion,
            estado
        )
        VALUES
        (
            :nombre,
            :descripcion,
            'ACTIVO'
        )
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "nombre": datos["nombre"],
                "descripcion": datos["descripcion"]
            }
        )

    return {
        "success": True,
        "mensaje": "Rol creado correctamente"
    }

def actualizar_rol(id, datos):

    query = text("""
        UPDATE roles
        SET
            nombre = :nombre,
            descripcion = :descripcion
        WHERE id = :id
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "id": id,
                "nombre": datos["nombre"],
                "descripcion": datos["descripcion"]
            }
        )

    return {
        "success": True,
        "mensaje": "Rol actualizado correctamente"
    }

def inactivar_rol(id):

    query = text("""
        UPDATE roles
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
        "mensaje": "Rol inactivado correctamente"
    }

def activar_rol(id):

    query = text("""
        UPDATE roles
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
        "mensaje": "Rol activado correctamente"
    }