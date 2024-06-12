import cv2
import numpy as np
import time

def capture_images():
    cap = cv2.VideoCapture(0)
    count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        cv2.imshow('Capture Images', frame)
        k = cv2.waitKey(1)
        if k == ord('s'):  # Press 's' to save the frame
            cv2.imwrite(f'data/frame_{count}.jpg', frame)
            count += 1
        elif k == ord('q'):  # Press 'q' to quit
            break

    cap.release()
    cv2.destroyAllWindows()

capture_images()
