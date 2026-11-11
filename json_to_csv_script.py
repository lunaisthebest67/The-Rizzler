import pandas as pd

df = pd.read_json("huge_json_obj.json", orient="index")

df.index.name = 'word'
df = df.reset_index()

df.to_csv("newdefs.csv", index=False)

