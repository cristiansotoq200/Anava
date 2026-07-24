SELECT
    m.id,
    m.nombre,
    m.ruta
FROM roles_menus rm
INNER JOIN menus m
    ON rm.menu_id = m.id
WHERE rm.rol_id = 1
ORDER BY m.orden_menu;
