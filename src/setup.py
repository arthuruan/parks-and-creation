from common.take_picture import take_picture
from common.coordinates_generator import CoordinatesGenerator
from common.colors import *

def initial_setup(data_path):
    picture = take_picture()

    if picture:
        with open(data_path, "w+") as points:
            generator = CoordinatesGenerator(picture, points, COLOR_RED)
            generator.generate()