from sqlalchemy import text

from app.database.conexion import engine


def obtener_vehiculos():

    query = text("""
        SELECT
            *
        FROM vehiculos
        ORDER BY placa
    """)

    with engine.connect() as conn:

        resultado = conn.execute(query)

        vehiculos = []

        for fila in resultado:

            vehiculos.append(
                dict(fila._mapping)
            )

        return vehiculos


def crear_vehiculo(datos):

    validar = text("""
        SELECT id
        FROM vehiculos
        WHERE placa = :placa
    """)

    with engine.connect() as conn:

        existe = conn.execute(
            validar,
            {
                "placa": datos["placa"]
            }
        ).fetchone()

        if existe:

            raise Exception(
                "La placa ya existe"
            )

    query = text("""
        INSERT INTO vehiculos
        (
            licencia_transito,
            placa,
            marca,
            linea,
            modelo,
            cilindrada,
            color,
            servicio,
            clase_vehiculo,
            tipo_carroceria,
            combustible,
            capacidad,
            kilometraje,
            numero_motor,
            registro_motor,
            vin,
            numero_serie,
            registro_serie,
            numero_chasis,
            registro_chasis,
            propietario,
            tipo_documento,
            numero_documento,
            transportadora,
            fecha_vencimiento_soat,
            fecha_vencimiento_tecnomecanica,
            observaciones,
            estado
        )
        VALUES
        (
            :licencia_transito,
            :placa,
            :marca,
            :linea,
            :modelo,
            :cilindrada,
            :color,
            :servicio,
            :clase_vehiculo,
            :tipo_carroceria,
            :combustible,
            :capacidad,
            :kilometraje,
            :numero_motor,
            :registro_motor,
            :vin,
            :numero_serie,
            :registro_serie,
            :numero_chasis,
            :registro_chasis,
            :propietario,
            :tipo_documento,
            :numero_documento,
            :transportadora,
            :fecha_vencimiento_soat,
            :fecha_vencimiento_tecnomecanica,
            :observaciones,
            'ACTIVO'
        )
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            datos
        )

    return {
        "success": True,
        "mensaje": "Vehículo creado correctamente"
    }

def actualizar_vehiculo(
    id,
    datos
):

    validar = text("""
        SELECT id
        FROM vehiculos
        WHERE placa = :placa
        AND id <> :id
    """)

    with engine.connect() as conn:

        existe = conn.execute(
            validar,
            {
                "placa": datos["placa"],
                "id": id
            }
        ).fetchone()

        if existe:

            raise Exception(
                "La placa ya existe"
            )

    query = text("""
        UPDATE vehiculos
        SET
            licencia_transito = :licencia_transito,
            placa = :placa,
            marca = :marca,
            linea = :linea,
            modelo = :modelo,
            cilindrada = :cilindrada,
            color = :color,
            servicio = :servicio,
            clase_vehiculo = :clase_vehiculo,
            tipo_carroceria = :tipo_carroceria,
            combustible = :combustible,
            capacidad = :capacidad,
            kilometraje = :kilometraje,
            numero_motor = :numero_motor,
            registro_motor = :registro_motor,
            vin = :vin,
            numero_serie = :numero_serie,
            registro_serie = :registro_serie,
            numero_chasis = :numero_chasis,
            registro_chasis = :registro_chasis,
            propietario = :propietario,
            tipo_documento = :tipo_documento,
            numero_documento = :numero_documento,
            transportadora = :transportadora,
            fecha_vencimiento_soat = :fecha_vencimiento_soat,
            fecha_vencimiento_tecnomecanica = :fecha_vencimiento_tecnomecanica,
            observaciones = :observaciones
        WHERE id = :id
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                **datos,
                "id": id
            }
        )

    return {
        "success": True,
        "mensaje": "Vehículo actualizado correctamente"
    }

def inactivar_vehiculo(
    id,
    motivo,
    observaciones
):

    query = text("""
        UPDATE vehiculos
        SET
            estado = 'INACTIVO',
            motivo_inactivacion = :motivo,
            observaciones = :observaciones
        WHERE id = :id
    """)

    historial = text("""
        INSERT INTO vehiculos_inactivaciones
        (
            vehiculo_id,
            motivo,
            observaciones
        )
        VALUES
        (
            :id,
            :motivo,
            :observaciones
        )
    """)

    with engine.begin() as conn:

        conn.execute(
            query,
            {
                "id": id,
                "motivo": motivo,
                "observaciones": observaciones
            }
        )

        conn.execute(
            historial,
            {
                "id": id,
                "motivo": motivo,
                "observaciones": observaciones
            }
        )

    return {
        "success": True,
        "mensaje": "Vehículo inactivado"
    }


def activar_vehiculo(id):

    query = text("""
        UPDATE vehiculos
        SET
            estado = 'ACTIVO',
            motivo_inactivacion = NULL
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
        "mensaje": "Vehículo activado"
    }