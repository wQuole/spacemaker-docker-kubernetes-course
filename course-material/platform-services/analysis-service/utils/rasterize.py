from rasterio.features import rasterize
from shapely.geometry import Polygon as S_Polygon
import numpy as np
from utils.helpers import get_polygon_cords


def get_site_rasterized(buildings, dim=[50, 100]):
    return rasterize([(building.polygon, building.height) for building in buildings], out_shape=dim)
