import os

for file in os.listdir('img'):
    try:
        if os.path.isfile('img/' + file):
            os.mkdir('img/' + file[4:12])
    except:
        pass

for file in os.listdir('img'):
    if os.path.isfile('img/' + file):
        os.system('move img\\{} img\\{}'.format(file, file[4:12]))
