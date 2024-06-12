import cv2
import numpy as np
from keras.models import load_model

model = load_model('gesture_model.h5')  # Load the trained model

def preprocess_frame(frame):
    frame = cv2.resize(frame, (64, 64))
    frame = frame / 255.0
    frame = np.expand_dims(frame, axis=0)
    return frame

def get_gesture_label(prediction):
    if prediction == 0:
        return "Left"
    elif prediction == 1:
        return "Right"
    elif prediction == 2:
        return "Forward"
    elif prediction == 3:
        return "Stop"

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    processed_frame = preprocess_frame(frame)
    prediction = np.argmax(model.predict(processed_frame))
    gesture = get_gesture_label(prediction)

    cv2.putText(frame, gesture, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

    cv2.imshow('Wheelchair Control', frame)
    k = cv2.waitKey(1)
    if k == ord('q'):  # Press 'q' to quit
        break

cap.release()
cv2.destroyAllWindows()
