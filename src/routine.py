import time
import yaml

from common.take_picture import take_picture
from common.motion_detector import MotionDetector

def routine(data_path, sleep = 30, start_frame = 800):
    try:
        while True:  # Run indefinitely
            picture = take_picture()

            with open(data_path, "r") as data:
                points = yaml.safe_load(data)
                detector = MotionDetector(picture, points)
                detector.detect_live_motion()

            time.sleep(sleep)  # Wait for 10 seconds before running again
    except KeyboardInterrupt:
        pass