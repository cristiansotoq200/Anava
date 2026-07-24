from sqlalchemy import text

from app.database.conexion import engine


def asignar_permiso(datos):

    query = text("""
        INSERT INTO roles_permisos
        (
            rol_id,
            permiso_id
        )
        VALUES
        (
            :rol_id,
            :permiso_id
        )
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "rol_id": datos["rol_id"],
                "permiso_id": datos["permiso_id"]
            }
        )

    return {
        "success": True,
        "mensaje": "Permiso asignado correctamente"
    }


def obtener_permisos_rol(rol_id):

    query = text("""
        SELECT
            rp.id,
            p.codigo,
            p.nombre
        FROM roles_permisos rp
        INNER JOIN permisos p
            ON rp.permiso_id = p.id
        WHERE rp.rol_id = :rol_id
    """)

    with engine.connect() as conn:

        resultado = conn.execute(
            query,
            {
                "rol_id": rol_id
            }
        )

        permisos = []

        for fila in resultado:

            permisos.append({
                "id": fila.id,
                "codigo": fila.codigo,
                "nombre": fila.nombre
            })

        return permisos


def quitar_permiso(id):

    query = text("""
        DELETE
        FROM roles_permisos
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
        "mensaje": "Permiso eliminado correctamente"
    }
