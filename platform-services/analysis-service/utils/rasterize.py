from rasterio.features import rasterize
from shapely.geometry import Polygon as S_Polygon
import numpy as np
from utils.helpers import get_polygon_cords


def get_site_rasterized(building_data, dim=[100, 100]):
    return rasterize(
        [
            (
                S_Polygon(get_polygon_cords(building)),
                building["dz"],

            )
            for building in building_data
        ],
        out_shape=dim
    )