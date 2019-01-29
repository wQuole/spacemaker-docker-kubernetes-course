extern crate iron;
extern crate serde;
extern crate serde_json;

use iron::modifiers::Header;
use iron::prelude::*;
use iron::{headers, status};

#[macro_use]
extern crate serde_derive;

#[derive(Serialize)]
struct Polygon {
    x: u8,
    y: u8,
    dx: u8,
    dy: u8,
    dz: u8
}

fn main() {
    let polygons = vec![
        Polygon { x: 0, y: 0, dx: 10, dy: 20, dz: 15 },
        Polygon { x: 25, y: 0, dx: 10, dy: 10, dz: 20 },
        Polygon { x: 40, y: 30, dx: 20, dy: 10, dz: 20 },
    ];

    let hello = move |_: &mut Request| {
        Ok(Response::with((status::Ok,
            Header(headers::ContentType::json()),
            &serde_json::to_string(&polygons).unwrap() as &str
            )))
    };

    let _server = Iron::new(hello).http("0.0.0.0:3003").unwrap();
    println!("Running on 3003")
}
