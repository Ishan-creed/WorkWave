import cv2
import numpy as np
from keras.models import load_model

model = load_model('gesture_model.h5')  # Load the trained model

def preprocess_frame(frame):
    frame = cv2.resize(frame, (64, 64))
    frame = frame / 255.0
    frame = np.expand_dims(frame, axis=0)
    return frame

def control_wheelchair(prediction):
    if prediction == 0:
        print("Move Left")
    elif prediction == 1:
        print("Move Right")
    elif prediction == 2:
        print("Move Forward")
    elif prediction == 3:
        print("Stop")

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    processed_frame = preprocess_frame(frame)
    prediction = np.argmax(model.predict(processed_frame))

    control_wheelchair(prediction)

    cv2.imshow('Wheelchair Control', frame)
    k = cv2.waitKey(1)
    if k == ord('q'):  # Press 'q' to quit
        break

cap.release()
cv2.destroyAllWindows()
