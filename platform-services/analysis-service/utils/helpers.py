import numpy as np


def get_polygon_cords(building_data):
    return np.array(
        [
            [building_data["x"], building_data["y"]],
            [building_data["x"] + building_data["dx"], building_data["y"]],
            [
                building_data["x"] + building_data["dx"],
                building_data["y"] + building_data["dy"],
            ],
            [building_data["x"], building_data["y"] + building_data["dy"]],
        ]
    )
