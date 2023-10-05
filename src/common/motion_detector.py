import cv2 as open_cv
import numpy as np
import logging
from common.drawing_utils import draw_contours
from common.colors import COLOR_GREEN, COLOR_WHITE, COLOR_BLUE


class MotionDetector:
    LAPLACIAN = 1.4
    DETECT_DELAY = 1
    COLOR_THRESHOLD = 140

    def __init__(self, image, coordinates, debug):
        self.image = image.copy()
        self.debug = debug
        self.coordinates_data = coordinates
        self.contours = []
        self.bounds = []
        self.mask = []

    def detect_live_motion(self):
        coordinates_data = self.coordinates_data
        logging.debug("coordinates data: %s", coordinates_data)

        for p in coordinates_data:
            coordinates = self._coordinates(p)
            logging.debug("coordinates: %s", coordinates)

            rect = open_cv.boundingRect(coordinates)
            logging.debug("rect: %s", rect)

            new_coordinates = coordinates.copy()
            new_coordinates[:, 0] = coordinates[:, 0] - rect[0]
            new_coordinates[:, 1] = coordinates[:, 1] - rect[1]
            logging.debug("new_coordinates: %s", new_coordinates)

            self.contours.append(coordinates)
            self.bounds.append(rect)

            mask = open_cv.drawContours(
                np.zeros((rect[3], rect[2]), dtype=np.uint8),
                [new_coordinates],
                contourIdx=-1,
                color=255,
                thickness=-1,
                lineType=open_cv.LINE_8)
            
            mask = mask == 255
            self.mask.append(mask)
            logging.debug("mask: %s", self.mask)

        blurred = open_cv.GaussianBlur(self.image.copy(), (5, 5), 3)
        grayed = open_cv.cvtColor(blurred, open_cv.COLOR_BGR2GRAY)
        new_frame = self.image.copy()
        logging.debug("new_frame: %s", new_frame)

        status_group = []

        for index, p in enumerate(coordinates_data):
            status = self.__apply(grayed, index, p)
            status_group.append(status)
            coordinates = self._coordinates(p)

            color = COLOR_GREEN if status else COLOR_BLUE
            draw_contours(new_frame, coordinates, str(p["id"] + 1), COLOR_WHITE, color)

        print('Status: ', status_group)
        
        if self.debug:
            open_cv.imshow('Result', new_frame)
            open_cv.waitKey(0)
            open_cv.destroyAllWindows()

    def __apply(self, grayed, index, p):
        coordinates = self._coordinates(p)
        logging.debug("points: %s", coordinates)

        rect = self.bounds[index]
        logging.debug("rect: %s", rect)

        roi_color = self.image[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
        average_color = np.mean(roi_color, axis=(0, 1))
        logging.debug("average color: %s", average_color)

        coordinates[:, 0] = coordinates[:, 0] - rect[0]
        coordinates[:, 1] = coordinates[:, 1] - rect[1]

        status = np.mean(average_color) > MotionDetector.COLOR_THRESHOLD
        logging.debug("status: %s", status)

        print('avg', np.mean(average_color))

        return status

    @staticmethod
    def _coordinates(p):
        return np.array(p["coordinates"])

    @staticmethod
    def same_status(coordinates_status, index, status):
        return status == coordinates_status[index]

    @staticmethod
    def status_changed(coordinates_status, index, status):
        return status != coordinates_status[index]


class CaptureReadError(Exception):
    pass
