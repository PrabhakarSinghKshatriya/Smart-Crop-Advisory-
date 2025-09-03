from typing import List, Optional

CROP_DB = {
    ("alluvial", "kharif"): ["Rice", "Maize", "Pulses (Arhar)", "Bajra"],
    ("alluvial", "rabi"): ["Wheat", "Mustard", "Gram", "Barley"],
    ("black", "kharif"): ["Cotton", "Soybean", "Sorghum (Jowar)"],
    ("black", "rabi"): ["Wheat", "Chickpea", "Sunflower"],
    ("red", "kharif"): ["Groundnut", "Millets", "Cotton"],
    ("red", "rabi"): ["Wheat", "Linseed", "Gram"],
    ("laterite", "kharif"): ["Cashew", "Pineapple", "Rubber (region-specific)"],
    ("laterite", "rabi"): ["Pulses", "Vegetables"],
    ("sandy", "kharif"): ["Bajra", "Groundnut", "Sesame"],
    ("sandy", "rabi"): ["Mustard", "Cumin", "Barley"],
}

def _filter_by_weather(crops: List[str], temperature_c: Optional[float], rainfall_mm: Optional[float]) -> List[str]:
    if temperature_c is None and rainfall_mm is None:
        return crops[:4]
    scored = []
    for c in crops:
        score = 0
        if c.lower() in ["rice"] and (rainfall_mm or 0) >= 120: score += 2
        if c.lower() in ["wheat"] and (temperature_c or 0) <= 25: score += 2
        if c.lower() in ["mustard", "gram", "barley", "cumin"] and (rainfall_mm or 0) <= 60: score += 1
        if c.lower() in ["cotton", "sorghum (jowar)", "bajra", "millets"] and (temperature_c or 0) >= 28: score += 1
        scored.append((score, c))
    scored.sort(reverse=True)
    return [c for _, c in scored[:4]]

def recommend_crops(soil_type: str, season: str, temperature_c: Optional[float], rainfall_mm: Optional[float], state: Optional[str]) -> List[str]:
    key = (soil_type.strip().lower(), season.strip().lower())
    fallback = ["Wheat", "Rice", "Maize", "Pulses"]
    crops = CROP_DB.get(key, fallback)
    return _filter_by_weather(crops, temperature_c, rainfall_mm)

def fertilizer_suggestions(crops: List[str]):
    base = {
        "Rice": ["Urea (N)", "DAP (P)", "MOP (K)", "Zinc Sulphate"],
        "Wheat": ["Urea (N)", "DAP (P)", "MOP (K)"],
        "Maize": ["Urea", "SSP/DAP", "MOP"],
        "Pulses": ["DAP", "Rhizobium culture"],
        "Mustard": ["Urea", "SSP", "Sulphur"],
        "Gram": ["DAP", "Vermicompost"],
        "Barley": ["Urea", "SSP"],
        "Cotton": ["NPK 19:19:19", "MOP", "Micronutrients"],
        "Soybean": ["SSP", "Gypsum"],
        "Sorghum (Jowar)": ["Urea", "MOP"],
        "Bajra": ["Urea"],
        "Groundnut": ["Gypsum", "SSP"],
        "Sesame": ["SSP"],
        "Cumin": ["Urea", "SSP"],
        "Sunflower": ["NPK 15:15:15"],
        "Linseed": ["Urea", "SSP"],
        "Chickpea": ["DAP", "Rhizobium culture"],
        "Millets": ["Urea", "MOP"],
    }
    out = {}
    for c in crops:
        out[c] = base.get(c, ["NPK balanced", "Organic manure/compost"])
    return out