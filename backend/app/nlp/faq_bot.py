import re

def answer_query(text: str) -> str:
    t = text.lower().strip()
    if re.search(r"\b(hello|hi|namaste|namaskar)\b", t):
        return "Namaste! Kaise madad kar sakta/sakti hoon?"
    if "paani" in t or "irrigation" in t or "watering" in t:
        return "Sinchai 5-7 din ke antar par karein; mitti ki nami dekh kar paani dein."
    if "fertilizer" in t or "khaad" in t or "urvarak" in t:
        return "Fasal ke anusar santulit NPK ka upyog karein; micronutrients (Zn, S) par dhyan dein."
    if "beej" in t or "seed" in t:
        return "Gehun 100–125 kg/ha; Dhan (transplant) 20–30 kg/ha — kheti ke tarike par nirbhar."
    if "keeda" in t or "pest" in t or "insect" in t:
        return "Nigrani karein; pheromone/ sticky traps; avashyak ho to label ke anusar kiitnashak."
    return "Maaf kijiye, aur vivaran dein (crop, soil, samasya)."