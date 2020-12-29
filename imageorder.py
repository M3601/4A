import os
import json

for file in os.listdir('img'):
    try:
        if os.path.isfile('img/' + file):
            os.mkdir('img/' + file[4:12])
    except:
        pass

diz = dict()

for file in sorted(os.listdir('img')):
    if os.path.isfile('img/' + file):
        os.system('mv img/{} img/{}'.format(file, file[4:12]))
        try:
            diz[file[4:12]].append(file)
        except Exception as e:
            diz[file[4:12]] = [file]

for giorno in diz.items():
    cartella = giorno[0]
    print(json.dumps(
        {
            "titolo": "Immagini del giorno",
            "data": f"{cartella[6:]}/{cartella[4:6]}/{cartella[0:4]}",
            "tipo": "immagine",
            "immagini": [{
                "pos": f"img/{cartella}/{file}"
            } for file in giorno[1]]
        }) + ',',
          end='\n\n',
          flush=True,
          file=open('tmp_img.json', 'a'))
