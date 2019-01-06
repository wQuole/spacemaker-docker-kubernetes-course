from utils import rasterize, helpers
from shapely.geometry import Polygon as S_Polygon
import os
import numpy as np

SITE_DIM = os.getenv("SITE_DIM", [100, 100])
EXPECTED_RATIO = os.getenv("EXPECTED_RATIO", 0.6)
AREAL_TO_AREA = os.getenv("AREAL_TO_AREA", 1.5)
FLOOR_HEIGHT = os.getenv("FLOOR_HEIGHT", 3.2)


# Calculate maximal sum (e..g you can only fill so much of a site)
OPTIMAL_RASTER = np.array(
    [[1 if i < 50 else 2 for i in range(SITE_DIM[0])] for j in range(SITE_DIM[1])]
)

# Scores
AREA_SCORE = 3

# Penalties
BYA_PENALTY = 4
AREA_TO_AREA_PENALTY = 10
OVERLAP_BUILDINGS_PENALTY = 10
OVERLAP_BUILDING_SITE_PENALTY = 4


class Building(object):
    def __init__(self, building_data):
        self.height = building_data["dz"]
        self.polygon = S_Polygon(helpers.get_polygon_cords(building_data))
        self.area = self.polygon.area


def _create_buildings(solution):
    return [Building(building) for building in solution]


# TODO Check if overlap is part of validation
def _calculate_total_overlap(buildings):
    pass


def _calculate_total_barrier_breach(buildings):
    pass


def _calculate_total_footprint(buildings):
    return sum(list(map(lambda building: building.area, buildings)))


def _calculate_total_area(buildings):
    return sum(
        list(
            map(
                lambda building: building.area * building.height // FLOOR_HEIGHT,
                buildings,
            )
        )
    )


def _calculate_score(buildings, buildings_raster):
    bya = _calculate_total_area(buildings)
    total_area = _calculate_total_area(buildings)

    def calculate_area_score():
        return total_area * AREA_SCORE

    def calculate_building_cost():
        return np.sum(buildings_raster * OPTIMAL_RASTER)

    def bya_penalty():
        return BYA_PENALTY * (
            max(bya - ((SITE_DIM[0] * SITE_DIM[1]) * EXPECTED_RATIO), 0)
        )

    def total_area_penalty():
        return AREA_TO_AREA_PENALTY * (
            max(total_area - ((SITE_DIM[0] * SITE_DIM[1]) * AREAL_TO_AREA), 0)
        )

    area_score = calculate_area_score()
    total_cost = calculate_building_cost()
    bya_penalty = bya_penalty()
    total_area_penalty = total_area_penalty()

    return area_score - total_cost - bya_penalty - total_area_penalty


def calculate_score(solution):
    buildings = _create_buildings(solution)
    building_raster = rasterize.get_site_rasterized(buildings, SITE_DIM)

    # TODO: Remove score for overlap / outside boundary.

    return _calculate_score(buildings, building_raster)
