extern crate iron;
extern crate serde;
extern crate serde_json;

use iron::modifiers::Header;
use iron::prelude::*;
use iron::{headers, status};
use std::f64::consts::PI;

#[macro_use]
extern crate serde_derive;

#[derive(Serialize)]
struct Polygon {
    x: u8,
    y: u8,
    width: u8,
    depth: u8,
    height: u8,
    rotation: f64
}

fn main() {


    let polygons = vec![
        Polygon { x: 0, y: 0, width: 20, depth: 20, height: 20, rotation: 0f64 },
        Polygon { x: 40, y: 40, width: 20, depth: 20, height: 40, rotation: PI / 4.0 },
    ];

    let hello = move |_: &mut Request| {
        Ok(Response::with((status::Ok,
            Header(headers::ContentType::json()),
            &serde_json::to_string(&polygons).unwrap() as &str
            )))
    };

    let _server = Iron::new(hello).http("127.0.0.1:3003").unwrap();
    println!("Running on 8080")
}
