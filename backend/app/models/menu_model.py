from sqlalchemy import text

from app.database.conexion import engine


def obtener_menus_por_rol(rol_id):

    query = text("""
        SELECT
            rm.id,
            m.id AS menu_id,
            m.nombre,
            m.ruta,
            m.icono,
            m.orden_menu
        FROM roles_menus rm
        INNER JOIN menus m
            ON rm.menu_id = m.id
        WHERE rm.rol_id = :rol_id
        ORDER BY m.orden_menu
    """)

    with engine.connect() as conn:

        resultado = conn.execute(
            query,
            {
                "rol_id": rol_id
            }
        )

        menus = []

        for fila in resultado:

            menus.append({
                "id": fila.id,
                "menu_id": fila.menu_id,
                "nombre": fila.nombre,
                "ruta": fila.ruta,
                "icono": fila.icono,
                "orden": fila.orden_menu
            })

        return menus


def obtener_todos_los_menus():

    query = text("""
        SELECT
            id,
            nombre,
            ruta,
            icono,
            orden_menu
        FROM menus
        ORDER BY orden_menu
    """)

    with engine.connect() as conn:

        resultado = conn.execute(query)

        menus = []

        for fila in resultado:

            menus.append({
                "id": fila.id,
                "nombre": fila.nombre,
                "ruta": fila.ruta,
                "icono": fila.icono,
                "orden": fila.orden_menu
            })

        return menus


def asignar_menu(datos):

    query = text("""
        INSERT INTO roles_menus
        (
            rol_id,
            menu_id
        )
        VALUES
        (
            :rol_id,
            :menu_id
        )
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "rol_id": datos["rol_id"],
                "menu_id": datos["menu_id"]
            }
        )

    return {
        "success": True,
        "mensaje": "Menú asignado correctamente"
    }


def quitar_menu(id):

    query = text("""
        DELETE
        FROM roles_menus
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
        "mensaje": "Menú eliminado correctamente"
    }