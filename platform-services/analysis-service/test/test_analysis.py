from worker import calculate_score

input_dict = {
    "buildings": [{
    "x": 0.0,
    "y": 0.0,
    "dx": 100.0,
    "dy": 50.0,
    "dz": 9.0
}]


}


def test_worker():
    print(calculate_score(input_dict["buildings"]))


test_worker()
