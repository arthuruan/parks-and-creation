import time
import yaml

from common.take_picture import take_picture
from common.motion_detector import MotionDetector

def routine(data_path, debug = False, sleep = 3):
    try:
        while True:  # Run indefinitely
            picture = take_picture()

            with open(data_path, "r") as data:
                points = yaml.safe_load(data)
                detector = MotionDetector(picture, points, debug)
                detector.detect_live_motion()

            time.sleep(sleep)

    except KeyboardInterrupt:
        pass