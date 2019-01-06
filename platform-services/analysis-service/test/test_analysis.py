from worker import calculate_score

input_dict = {"buildings":
    [
        {"x": 10,
         "y": 10,
         "dx": 10,
         "dy": 10,
         "dz": 20},
        {"x": 40,
         "y": 50,
         "dx": 10,
         "dy": 10,
         "dz": 20}
    ]
}

def test_worker():
    print(calculate_score(input_dict["buildings"]))

test_worker()