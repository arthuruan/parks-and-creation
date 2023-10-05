import cv2

class TakePicture:
    def __init__(self, image_path, cam_port = 0, wait_key = 200):
        self.image_path = image_path
        self.cam_port = cam_port
        self.wait_key = wait_key

    def take_picture(self):
        # Initialize the camera
        cap = cv2.VideoCapture(self.cam_port)  # 0 indicates the default camera (you can change this to 1, 2, etc. for additional cameras)
        cv2.waitKey(self.wait_key)  # Wait for 1 second

        # Check if the camera was opened successfully
        if not cap.isOpened():
            print("Error: Could not open the camera")
            return False
        else:
            # Read a frame from the camera
            ret, frame = cap.read()

            # If the frame was read successfully, save it
            if ret:
                cv2.imwrite(self.image_path, frame)
                print("Image captured successfully as ", self.image_path)
            else:
                print("Error: Failed to capture image")
                return False

            # Release the camera
            cap.release()

        # Close all OpenCV windows
        cv2.destroyAllWindows()

        return True
