import fastapi

# Módulos de rotas
from app.api.routes import health

app = fastapi.FastAPI()

@app.get("/")
def read_root():
    return {
    "service": "DataForge API",
    "version": "0.1.0",
    "status": "running"
    }

app.include_router(health.router)