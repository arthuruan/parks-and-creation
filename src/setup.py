import requests

from common.take_picture import take_picture
from common.coordinates_generator import CoordinatesGenerator
from common.colors import *

def initial_setup(data_path, sectorName):
    r = requests.post("localhost:8080/api/sectors", json={"name": sectorName})
    if(r.status_code != 200):
        print("[ERROR] Could not create sector!")

    picture = take_picture()

    with open(data_path, "w+") as points:
        generator = CoordinatesGenerator(picture, points, 1, COLOR_RED)
        generator.generate()
