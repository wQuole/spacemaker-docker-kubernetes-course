import os
from utils.rasterize import get_site_rasterized

EXPECTED_RATIO = os.getenv("EXPECTED_RATIO", 0.7)
AREAL_TO_AREA = os.getenv("AREAL_TO_AREA", 1.5)
FLOOR_HEIGHT = os.getenv("FLOOR_HEIGHT", 3.2)
SITE_DIM = os.getenv("SIT_DIM", [100, 100])

def worker(buildings):
    rasters = [get_site_rasterized(buildings)]
    return rasters