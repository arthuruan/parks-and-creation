import requests

from common.take_picture import take_picture
from common.coordinates_generator import CoordinatesGenerator
from common.colors import *

def initial_setup(data_path, sectorName, host):
    r = requests.post(f"http://{host}:8080/api/sectors", json={"name": sectorName})
    print(r)
    if(r.status_code != 201):
        print("[ERROR] Could not create sector!")

    picture = take_picture()

    with open(data_path, "w+") as points:
        generator = CoordinatesGenerator(picture, points, r.json()['id'], host, COLOR_RED)
        generator.generate()
