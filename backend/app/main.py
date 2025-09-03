from fastapi import FastAPI, UploadFile, File, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from jose import jwt, JWTError
from .ml.crop_recommender import recommend_crops, fertilizer_suggestions
from .ml.disease_classifier import classify_disease
from .nlp.faq_bot import answer_query
from .routers.auth import router as auth_router, ALGO, SECRET_KEY
from .routers.db import init_db, get_session, QueryLog
from sqlmodel import Session
from .routers import weather as weather_mod

app = FastAPI(title="Smart Crop Advisory PRO", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
init_db()

class CropInput(BaseModel):
    soil_type: str
    season: str
    temperature_c: Optional[float] = None
    rainfall_mm: Optional[float] = None
    state: Optional[str] = None

class QueryInput(BaseModel):
    text: str

def get_user_id(authorization: Optional[str] = Header(None)) -> Optional[int]:
    if not authorization: return None
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer": return None
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGO])
        return int(payload["sub"])
    except Exception:
        return None

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/recommend-crops")
def recommend(crop_in: CropInput, session: Session = Depends(get_session), user_id: Optional[int] = Depends(get_user_id)):
    recs = recommend_crops(crop_in.soil_type, crop_in.season, crop_in.temperature_c, crop_in.rainfall_mm, crop_in.state)
    fert = fertilizer_suggestions(recs)
    session.add(QueryLog(user_id=user_id, type="crop", payload=crop_in.model_dump_json(), result=str({"recs":recs})) )
    session.commit()
    return {"recommendations": recs, "fertilizers": fert}

@app.post("/detect-disease")
async def detect_disease(file: UploadFile = File(...), session: Session = Depends(get_session), user_id: Optional[int] = Depends(get_user_id)):
    img_bytes = await file.read()
    result = classify_disease(img_bytes)
    session.add(QueryLog(user_id=user_id, type="disease", payload=file.filename or "upload", result=str(result)))
    session.commit()
    return result

@app.post("/ask-bot")
def ask_bot(q: QueryInput, session: Session = Depends(get_session), user_id: Optional[int] = Depends(get_user_id)):
    ans = answer_query(q.text)
    session.add(QueryLog(user_id=user_id, type="bot", payload=q.model_dump_json(), result=ans))
    session.commit()
    return {"answer": ans}

class WeatherIn(BaseModel):
    lat: float
    lon: float

@app.post("/weather")
async def weather(w: WeatherIn, session: Session = Depends(get_session), user_id: Optional[int] = Depends(get_user_id)):
    data = await weather_mod.get_weather(w.lat, w.lon)
    session.add(QueryLog(user_id=user_id, type="weather", payload=str({"lat":w.lat,"lon":w.lon}), result=str(data)))
    session.commit()
    return data

@app.get("/history")
def history(session: Session = Depends(get_session), user_id: Optional[int] = Depends(get_user_id)):
    if not user_id:
        return []
    rows = session.exec(QueryLog.select().where(QueryLog.user_id==user_id).order_by(QueryLog.created_at.desc())).all()
    return [{"id": r.id, "type": r.type, "payload": r.payload, "result": r.result, "created_at": r.created_at.isoformat()} for r in rows]