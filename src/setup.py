from common.take_picture import take_picture
from common.coordinates_generator import CoordinatesGenerator
from common.colors import *

def initial_setup():
    image_path = 'images/parking.png'
    coordinates_path = 'data/coordinates.yml'

    image_saved = take_picture(image_path)

    if image_saved:
        with open(coordinates_path, "w+") as points:
            generator = CoordinatesGenerator(image_path, points, COLOR_RED)
            generator.generate()

    return image_saved