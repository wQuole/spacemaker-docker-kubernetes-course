# Spacemaker analysis service

Service for analysing building geometry proposals
Your score is a weighted sum between 

1. A reward for each square meter of livable area
2. A building cost, dependent on the location of each building
3. A penalty for each constraint breached


## Reward

Livable area is calculated as follows. 

```python

def _calculate_total_area(buildings):
    return sum(
        list(
            map(
                lambda building: building.area * building.height // FLOOR_HEIGHT,
                buildingäs,
            )
        )
    )

```



The number of floors is always assumed to be a multiple of FLOOR_HEIGHT


## Building Costs

The building site consist of one side with suitable ground conditions for building, 
and another which requires an additional investment. This can be mapped into a building cost raster

```python

    def calculate_building_cost():
        return np.sum(buildings_raster * BUILDING_COST_RASTER)

```

## Restrictions 

| Restriction         | Value [min, max] | Description                         | Penalty per  square meter |
|---------------------|------------------|-------------------------------------|---------------------------|
| Footprint           | [0, 3000]        | Square meters  covered by buildings |                         4 |
| Total liveable area | [0, 15000]       | Total liveable  area on site        |                        10 |
| Floor height        | [3, 3]           | Floor height  each building         |                         3 |

