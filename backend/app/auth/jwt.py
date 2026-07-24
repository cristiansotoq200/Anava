from jose import jwt, JWTError
from datetime import datetime, timedelta

SECRET_KEY = "ANAVA_IA_2026"
ALGORITHM = "HS256"


def crear_token(datos: dict):

    datos_token = datos.copy()

    expiracion = datetime.utcnow() + timedelta(hours=8)

    datos_token.update({
        "exp": expiracion
    })

    return jwt.encode(
        datos_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def validar_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None