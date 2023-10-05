import cv2

def take_picture(cam_port = 0, wait_key = 200):
    # Initialize the camera
    cap = cv2.VideoCapture(cam_port)  # 0 indicates the default camera (you can change this to 1, 2, etc. for additional cameras)
    cv2.waitKey(wait_key)  # Wait for 1 second

    # Check if the camera was opened successfully
    if not cap.isOpened():
        print("Error: Could not open the camera")
        return False
    else:
        # Read a frame from the camera
        ret, frame = cap.read()

        # If the frame was read successfully, save it
        if ret:
            # cv2.imwrite(image_path, frame)
            return frame
            # print("Image captured successfully as ", image_path)
        else:
            print("Error: Failed to capture image")
            return False

        # Release the camera
        cap.release()

    # Close all OpenCV windows
    cv2.destroyAllWindows()

    return True