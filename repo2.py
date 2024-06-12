from keras.preprocessing.image import ImageDataGenerator

def preprocess_data():
    datagen = ImageDataGenerator(rescale=1.0/255.0, validation_split=0.2)

    train_data = datagen.flow_from_directory(
        'data',
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical',
        subset='training'
    )

    val_data = datagen.flow_from_directory(
        'data',
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical',
        subset='validation'
    )

    return train_data, val_data

train_data, val_data = preprocess_data()
