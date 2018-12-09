# spacemaker-docker-kubernetes-course

Material for Docker/Kubernetes course

## Contents of Repository

### Services

- Empty starter service with Readme steps to build it from scratch. (Proposed)

### Bootstrapped starters

- [Example service in rust](example-services/rust) (PoC)

### Support services

- [frontend application](web/tile) (PoC)
- Validate (planned)
- Server (planned)

## Assignment

Write a `service` which solves the problem of filling a lot with an optimal
proposal of buildings. The service can be written in any technology as long
as it runs in a docker image and exposes a http endpoint on :8080/ which responds
with a solution in the JSON format defined here:

```
[
  {
    x: <float>, // the x coordinate of the building in the range 0-100,
    y: <float>, // the y coordinate of the building in the range 0-50,
    width: <float>, // the width of the building in the range 10-20
    length: <float>, // the length of the building in the range 20-50
    height: <float>, // the height of the building in the range 3-200,
    rotation: <float>, // the rotation of the building in the range 0-2PI
  },
  ... // more buildings are defined by repeating the above structure
]
```

The `x` and `y` coordinates is the lower left corner of a building as seen from
above when the rotation is set to zero. With this rotation the `width` would expand
the building along the x-axis, the `length` would expand the building along the
y-axis.

<insert example json and picture here>
