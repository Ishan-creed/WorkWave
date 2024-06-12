import tkinter as tk
from PIL import Image, ImageTk

class WheelchairGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Wheelchair Automation")

        self.canvas = tk.Canvas(root, width=800, height=600)
        self.canvas.pack()

        try:
            self.bg_image = Image.open("C:\Users\hp\OneDrive\Desktop\minor\360_F_209705459_PCBXC5iVDapcSdanhKBOjz61YA8spgO4.jpg")  # Update this path as needed
  # Update this path as needed
            self.bg_image = self.bg_image.resize((800, 600), Image.ANTIALIAS)
            self.bg_image = ImageTk.PhotoImage(self.bg_image)

            self.wheelchair_image = Image.open("C:\Users\hp\OneDrive\Desktop\minor\of-a-flat-cartoon-wheelchair-on-a-white-background-free-vector.jpg")  # Update this path as needed
            self.wheelchair_image = self.wheelchair_image.resize((100, 100), Image.ANTIALIAS)
            self.wheelchair_image = ImageTk.PhotoImage(self.wheelchair_image)

            self.hurdle_image = Image.open("C:\Users\hp\OneDrive\Desktop\minor\1200px-Soccer_ball_animated.svg.png")  # Update this path as needed
            self.hurdle_image = self.hurdle_image.resize((100, 100), Image.ANTIALIAS)
            self.hurdle_image = ImageTk.PhotoImage(self.hurdle_image)
        except FileNotFoundError as e:
            print(f"Error: {e}")
            return

        self.canvas.create_image(0, 0, image=self.bg_image, anchor=tk.NW)

        self.wheelchair = self.canvas.create_image(350, 450, image=self.wheelchair_image, anchor=tk.NW)

        self.left_button = tk.Button(root, text="Move Left", command=self.move_left)
        self.left_button.pack(side=tk.LEFT, padx=20)

        self.right_button = tk.Button(root, text="Move Right", command=self.move_right)
        self.right_button.pack(side=tk.RIGHT, padx=20)

        self.hurdle_positions = [(200, 450), (500, 450)]
        self.hurdles = [self.canvas.create_image(x, y, image=self.hurdle_image, anchor=tk.NW) for x, y in self.hurdle_positions]

    def move_left(self):
        x, y = self.canvas.coords(self.wheelchair)
        new_x = x - 50
        if new_x >= 0 and not self.is_collision(new_x, y):
            self.canvas.coords(self.wheelchair, new_x, y)

    def move_right(self):
        x, y = self.canvas.coords(self.wheelchair)
        new_x = x + 50
        if new_x <= 700 and not self.is_collision(new_x, y):
            self.canvas.coords(self.wheelchair, new_x, y)

    def is_collision(self, x, y):
        wheelchair_coords = (x, y, x + 100, y + 100)
        for hurdle in self.hurdles:
            hurdle_coords = self.canvas.bbox(hurdle)
            if self.is_overlap(wheelchair_coords, hurdle_coords):
                return True
        return False

    def is_overlap(self, a, b):
        return not (a[2] < b[0] or a[0] > b[2] or a[3] < b[1] or a[1] > b[3])

if __name__ == "__main__":
    root = tk.Tk()
    app = WheelchairGUI(root)
    root.mainloop()
