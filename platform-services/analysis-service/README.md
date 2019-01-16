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
                buildings,
            )
        )
    )

```

**Reward per unit**: 3

The number of floors is always assumed to be a multiple of FLOOR_HEIGHT


## Building Costs

The building site consist of one side with suitable ground conditions for building, 
and another which requires an additional investment. On the northern part of the site the cost of building is 2 per square meter, and the cost for the southern part of the site is 1 per squar meter. This can be mapped into a building cost raster, looking like this:

<img src="https://i.imgur.com/0oEQ2SR.png" alt="cost raster" width="200"/>


The total cost will be the total liveable area multiplied with the cost defined by the cost raster. Hence: 

```python

    def calculate_building_cost():
        return np.sum(buildings_raster * BUILDING_COST_RASTER)

```

For example, if you have a 6 floor builing placed like this:

<img src="https://i.imgur.com/5NTdM8H.png" alt="budilding raster" width="200"/>

<a href="//imgur.com/w1OoFfB"></a>

The building cost is `(2 + 2 + 1 + 1 + 1 + 1) * 6 = 48`. 



## Restrictions 

| Restriction         | Value [min, max] | Description                         | Penalty per  square meter |
|---------------------|------------------|-------------------------------------|---------------------------|
| Footprint           | [0, 3000]        | Square meters  covered by buildings |                         4 |
| Total liveable area | [0, 15000]       | Total liveable  area on site        |                        10 |
| Floor height        | [3, 3]           | Floor height  each building         |                         3 |

