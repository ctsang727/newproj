from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Must have this!

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Critical for React connection
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Hello from FastAPI!"}  # Exact match this text

@app.get("/api/data")
def get_data():
    print("API Data endpoint was called")
    return {"data": [1, 2, 3, 4, 5]}  # Keep this structure

