import httpx
from typing import Dict, Optional

async def get_weather(lat: float, lon: float) -> Dict:
    url = "https://api.open-meteo.com/v1/forecast"
    params = {"latitude": lat, "longitude": lon, "current_weather": True}
    try:
        async with httpx.AsyncClient(timeout=6.0) as client:
            r = await client.get(url, params=params)
            r.raise_for_status()
            data = r.json()
            cw = data.get("current_weather", {})
            return {"ok": True, "source": "open-meteo", "current": cw}
    except Exception as e:
        # Fallback demo values
        return {"ok": False, "source": "fallback", "current": {"temperature": 28.0, "windspeed": 5.0, "weathercode": 0}}