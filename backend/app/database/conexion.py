from sqlalchemy import create_engine

DATABASE_URL = "mysql+pymysql://root:Osmwlz52890@localhost/anava_ia"

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        print("✅ Conectado a MySQL")
except Exception as e:
    print("❌ Error de conexión")
    print(e)