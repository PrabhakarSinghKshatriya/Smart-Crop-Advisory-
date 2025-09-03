# 🌾 Smart Crop Advisory 

End-to-end demo with:
- FastAPI backend
- React (Vite) frontend
- **Auth (JWT)** + **SQLite** via SQLModel
- **History logging** of user actions
- **Weather endpoint** using Open-Meteo (with offline fallback)
- ML-lite crop recommendation + image disease check + bilingual FAQ

## Run

### Backend
```
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend
```
cd frontend
npm install
npm run dev
```

### Configure
Create `frontend/.env` (optional):
```
VITE_API_BASE=http://localhost:8000
```

## API Summary
- `POST /auth/signup` {email, password}
- `POST /auth/login` -> {token}
- `GET /history` (requires Bearer token) — your activity
- `POST /recommend-crops` — crop + weather-tuned
- `POST /detect-disease` — image upload
- `POST /ask-bot` — Q&A
- `POST /weather` — {lat, lon} -> current

> Auth is optional for using features, but only **logged-in** users will see **history**.

## Upgrade Hooks (for real ML)
- Replace `ml/disease_classifier.py` with CNN inference (e.g., ONNX/Torch) — keep return shape the same.
- Swap `nlp/faq_bot.py` with a proper intent/FAQ classifier.
- Plug live geocoding to convert city -> lat/lon.
