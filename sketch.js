let threshold = 10
let iteration_limit = 16

let zoom = 0.1
let scale = 1 / zoom
let offset_scale = 0.2
let x_offset = 0
let y_offset = 0

let block

function setup() {

    createCanvas(400, 400)
    pixelDensity(1)

    // draw()
}

function draw() {
    loadPixels()
    block = true
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const p = (y * width + x) * 4;

            let a = map(x, 0, width, -scale + x_offset, scale + x_offset)
            let b = map(y, 0, height, -scale + y_offset, scale + y_offset)

            let ca = a;
            let cb = b;

            let n = 0;

            while (abs(a + b) < threshold && n < iteration_limit) {

                let aa = a * a - b * b;
                let ii = 2 * a * b;

                a = aa + ca;
                b = ii + cb;

                ++n;
            }

            n = map(n, 0, iteration_limit, 0, 1)

            if (n == 1) {
                n = 0
            } else {
                n = map(sqrt(n), 0, 1, 0, 255)
            }

            pixels[p + 0] = n
            pixels[p + 1] = n
            pixels[p + 2] = n
            pixels[p + 3] = 255
        }
    }
    updatePixels()
    block = false
    // noLoop();
}