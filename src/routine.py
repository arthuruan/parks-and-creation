import time
import yaml

from common.take_picture import take_picture
from common.motion_detector import MotionDetector

def routine(sleep = 30, start_frame = 800):
    try:
        # while True:  # Run indefinitely
            image_path = 'images/current_parking.png'

            image_saved = take_picture(image_path)

            with open(image_path, "r") as data:
                print(data)
                points = yaml.safe_load(data)
                detector = MotionDetector(points, int(start_frame))
                detector.detect_live_motion()

            # time.sleep(sleep)  # Wait for 10 seconds before running again
    except KeyboardInterrupt:
        pass
    # finally:
        