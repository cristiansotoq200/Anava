from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.conexion import engine
from app.routes.usuarios import router as usuarios_router
from app.auth.login import router as login_router
from app.auth.perfil import router as perfil_router
from app.routes.roles import router as roles_router
from app.routes.permisos import router as permisos_router
from app.routes.roles_permisos import router as roles_permisos_router
from app.routes.menus import router as menus_router


app = FastAPI(
    title="ANAVA IA",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios_router)
app.include_router(login_router)
app.include_router(perfil_router)
app.include_router(roles_router)
app.include_router(permisos_router)
app.include_router(roles_permisos_router)
app.include_router(menus_router)


@app.get("/")
def inicio():
    return {
        "estado": "ok",
        "mensaje": "ANAVA funcionando"
    }