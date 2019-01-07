from shapely.geometry import MultiPolygon
from shapely.geometry import Polygon
import numpy as np
from spacemakerlog3 import log

SHAPELY_AREA_LOWER_LIMIT = 1e-7
NUMERICAL_PRECISION_DISTANCES = 1e-8


def calculate_polygon_from_solution_structure(solution):
    pass


def calculate_site_area():
    pass


def calculate_site_areal():
    pass


def calculate_building_areal(building, FLOOR_HEIGHT):
    pass


# Calculate all areas
def simple_polygon_area(corners):
    # http://stackoverflow.com/a/24468019
    n = len(corners)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += corners[i][0] * corners[j][1]
        area -= corners[j][0] * corners[i][1]
    area = np.abs(area) / 2.0
    return area


# Check if any polygon overlaps
def intersecting_polygon(p1, p2):
    poly_1 = Polygon(p1)
    poly_2 = Polygon(p2)
    # if poly_1.intersects(poly_2.buffer(SHAPELY_EPSILON_BUFFER)):
    try:
        # if poly_1.relate_pattern(poly_2, "2********"):
        if poly_1.relate_pattern(poly_2, "2********"):
            # Buffer trick: http://stackoverflow.com/questions/20833344/fix-invalid-polygon-python-shapely
            intersection = poly_1.intersection(poly_2)
            if intersection.area < SHAPELY_AREA_LOWER_LIMIT:
                print("Intersection area too small")
                return None
            if isinstance(intersection, MultiPolygon):
                # print ("Multipolygon intersection")
                interiors = [
                    inter.coords for poly in intersection for inter in poly.interiors
                ]
                if interiors:
                    log.info("Interiors: " + str(interiors))
                return [poly.exterior.coords for poly in intersection]
            if isinstance(intersection, Polygon):
                return [intersection.exterior.coords]
            else:
                log.debug("No intersection!")
                return None
        else:
            return None

    except Exception as e:
        log.error("Error in intersection with polygons".format(e.message), exception=e)
        log.info(poly_1)
        log.info(poly_2)
        return None


def calculate_building_footprint(building):
    pass


def check_for_overlap():
    pass
