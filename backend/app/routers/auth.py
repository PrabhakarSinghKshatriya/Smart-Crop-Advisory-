from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from .db import User, get_session
from sqlmodel import Session

router = APIRouter(prefix="/auth", tags=["auth"])

SECRET_KEY = "dev-secret-change"
ALGO = "HS256"
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Creds(BaseModel):
    email: str
    password: str

def create_token(user_id: int):
    payload = {"sub": str(user_id), "exp": datetime.utcnow() + timedelta(days=7)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGO)

def current_user(session: Session = Depends(get_session), token: str | None = None):
    # token is injected via dependency override in main; manual parse from header there
    return None

@router.post("/signup")
def signup(c: Creds, session: Session = Depends(get_session)):
    u = session.exec(select(User).where(User.email==c.email)).first()
    if u:
        raise HTTPException(status_code=400, detail="Email already registered")
    u = User(email=c.email, hashed_password=pwd.hash(c.password))
    session.add(u)
    session.commit()
    session.refresh(u)
    return {"id": u.id, "email": u.email}

@router.post("/login")
def login(c: Creds, session: Session = Depends(get_session)):
    u = session.exec(select(User).where(User.email==c.email)).first()
    if not u or not pwd.verify(c.password, u.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(u.id)
    return {"token": token, "user": {"id": u.id, "email": u.email}}