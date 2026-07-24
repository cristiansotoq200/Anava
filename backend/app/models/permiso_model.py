from sqlalchemy import text
from app.database.conexion import engine


def obtener_permisos():

    query = text("""
        SELECT
            id,
            codigo,
            nombre,
            descripcion,
            estado
        FROM permisos
        ORDER BY nombre
    """)

    with engine.connect() as conn:

        resultado = conn.execute(query)

        permisos = []

        for fila in resultado:

            permisos.append({
                "id": fila.id,
                "codigo": fila.codigo,
                "nombre": fila.nombre,
                "descripcion": fila.descripcion,
                "estado": fila.estado
            })

        return permisos