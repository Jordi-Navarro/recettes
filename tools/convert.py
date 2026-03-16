import csv
import json

recettes = []

with open("source/recettes.csv", encoding="utf8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        recettes.append({
            "id": int(row["id"]),
            "titre": row["titre"],
            "type": row["type"],
            "temps": int(row["temps"]),
            "ingredients": row["ingredients"].split(";"),
            "tags": row["tags"].split(";")
        })

with open("recettes.json","w",encoding="utf8") as f:
    json.dump(recettes,f,indent=2,ensure_ascii=False)