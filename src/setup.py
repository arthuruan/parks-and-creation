from take_picture import take_picture
from coordinates_generator import CoordinatesGenerator
from colors import *

def initial_setup():
    image_path = 'images/parking.png'
    coordinates_path = 'data/coordinates.yml'

    cam = take_picture(image_path)
    image_saved = cam.take_picture()

    if image_saved:
        with open(coordinates_path, "w+") as points:
            generator = CoordinatesGenerator(image_path, points, COLOR_RED)
            generator.generate()

    return image_saved