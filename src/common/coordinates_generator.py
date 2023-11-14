import cv2 as open_cv
import numpy as np
import requests
import json

from common.colors import COLOR_WHITE
from common.drawing_utils import draw_contours

class CoordinatesGenerator:
    KEY_RESET = ord("r")
    KEY_QUIT = ord("q")

    def __init__(self, image, output, sectorId, color):
        self.output = output
        self.out_json = []
        self.caption = "Marque as vagas"
        self.color = color
        self.sectorId = sectorId

        self.image = image.copy()
        self.original_image = image.copy()
        self.click_count = 0
        self.ids = 0
        self.coordinates = []

        open_cv.namedWindow(self.caption, open_cv.WINDOW_GUI_EXPANDED)
        open_cv.setMouseCallback(self.caption, self.__mouse_callback)

    def generate(self):
        while True:
            open_cv.imshow(self.caption, self.image)
            key = open_cv.waitKey(0)

            if key == CoordinatesGenerator.KEY_RESET:
                self.image = self.image.copy()
            elif key == CoordinatesGenerator.KEY_QUIT:
                final_json = {"sectorId": self.sectorId, "vacancies": self.out_json}

                json.dump(final_json, self.output, ensure_ascii=False)
                
                r = requests.post("http://localhost:8080/api/vacancies/multiples", json=final_json)

                if(r.status_code != 200):
                    print("[ERROR] Could not create parking lots!")
                break
        open_cv.destroyWindow(self.caption)

    def __mouse_callback(self, event, x, y, flags, params):

        if event == open_cv.EVENT_LBUTTONDOWN:
            self.coordinates.append((x, y))
            self.click_count += 1

            if self.click_count >= 4:
                self.__handle_done()

            elif self.click_count > 1:
                self.__handle_click_progress()

        open_cv.imshow(self.caption, self.image)

    def __handle_click_progress(self):
        open_cv.line(self.image, self.coordinates[-2], self.coordinates[-1], (255, 0, 0), 1)

    def __handle_done(self):
        open_cv.line(self.image,
                     self.coordinates[2],
                     self.coordinates[3],
                     self.color,
                     1)
        open_cv.line(self.image,
                     self.coordinates[3],
                     self.coordinates[0],
                     self.color,
                     1)

        self.click_count = 0

        coordinates = np.array(self.coordinates)
        rect = open_cv.boundingRect(coordinates)

        new_coordinates = coordinates.copy()
        new_coordinates[:, 0] = coordinates[:, 0] - rect[0]
        new_coordinates[:, 1] = coordinates[:, 1] - rect[1]

        mask = open_cv.drawContours(
                np.zeros((rect[3], rect[2]), dtype=np.uint8),
                [new_coordinates],
                contourIdx=-1,
                color=255,
                thickness=-1,
                lineType=open_cv.LINE_8)
        mask = mask == 255

        blurred = open_cv.GaussianBlur(self.original_image.copy(), (5, 5), 3)
        grayed = open_cv.cvtColor(blurred, open_cv.COLOR_BGR2GRAY)

        roi_gray = grayed[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
        laplacian = open_cv.Laplacian(roi_gray, open_cv.CV_64F)

        self.out_json.append({
            "name": f"{self.sectorId}-{self.ids}",
            "coordinates": str(coordinates.tolist()),
            "status": "free",
            "mean": np.mean(np.abs(laplacian * mask))
        })

        draw_contours(self.image, coordinates, str(self.ids + 1), COLOR_WHITE)

        for i in range(0, 4):
            self.coordinates.pop()

        self.ids += 1