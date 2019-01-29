from worker import calculate_score

input_dict = {
    "buildings": [{
    "x": 50.0,
    "y": 25.0,
    "dx": 50.0,
    "dy": 25.0,
    "dz": 9.0
}]


}


def test_worker():
    print(calculate_score(input_dict["buildings"]))


test_worker()
