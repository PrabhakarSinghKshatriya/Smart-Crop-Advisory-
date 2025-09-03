from io import BytesIO
from typing import Dict
from PIL import Image
import numpy as np

def classify_disease(img_bytes: bytes) -> Dict:
    img = Image.open(BytesIO(img_bytes)).convert("RGB").resize((256, 256))
    arr = np.array(img).astype(np.float32) / 255.0
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    brown_mask = (r>0.35) & (g>0.2) & (b<0.2)
    yellow_mask = (r>0.6) & (g>0.6) & (b<0.3)
    green_mask = (g>0.5) & (r<0.5) & (b<0.5)
    brown_ratio = float(brown_mask.mean())
    yellow_ratio = float(yellow_mask.mean())
    green_ratio = float(green_mask.mean())

    if brown_ratio > 0.08:
        label = "Leaf Blight-like"
        advice = [
            "Remove heavily affected leaves.",
            "Consider Mancozeb/Copper oxychloride as per label.",
            "Improve airflow; avoid overhead watering."
        ]
    elif yellow_ratio > 0.10:
        label = "Nutrient Deficiency-like"
        advice = [
            "Apply balanced NPK; check Zn/Fe.",
            "Ensure regular irrigation."
        ]
    else:
        label = "Healthy or Minor Spots"
        advice = [
            "Maintain irrigation and balanced fertilization.",
            "Monitor weekly."
        ]
    return {
        "label": label,
        "metrics": {"brown_ratio": round(brown_ratio, 4), "yellow_ratio": round(yellow_ratio, 4), "green_ratio": round(green_ratio, 4)},
        "advice": advice
    }