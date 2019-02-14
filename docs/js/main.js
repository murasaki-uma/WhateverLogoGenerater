let font;
let buffer1;
let buffer2;
let temp;
function preload()
{
    font = loadFont('./OpenSans-ExtraBold.otf');

}
function setup() {
    createCanvas(800, 400);
    background(51);

    console.log(width);

    buffer1 = createImage(width,height);
    buffer2 = createImage(width,height);
    temp = createImage(width,height);

    // var points = font.textToPoints("whatever",40, 235,145);
    //
    // for(let i = 0; i < points.length; i++)
    // {
    //     var pt = points[i];
    //     stroke(255);
    //     strokeWeight(4);
    //     point(pt.x,pt.y);
    // }
}
function fire()
{
    buffer1.loadPixels();

    for(let x = 0; x < width; x++)
    {
        let y = height-1;
        let index = x + y * width;
        buffer1.pixels[index] = color(255,0,0);
    }
    buffer1.updatePixels();
}

function draw() {

    fire();
    background(10);
    image(buffer1,0,0);
    buffer1.loadPixels();
    buffer2.loadPixels();

    for(let x = 1; x < width-1; x++)
    {
        for(let y = 1; y < height-1; y++)
        {
            let index = x + y * width;
            let index1 = (x+1) + y * width;
            let index2 = (x-1) + y * width;
            let index3 = (x) + (y+1) * width;
            let index4 = (x) + (y-1) * width;

            const c1 = buffer1.pixels[index1];
            const c2 = buffer1.pixels[index2];
            const c3 = buffer1.pixels[index3];
            const c4 = buffer1.pixels[index4];

            const newC = brightness(c1) + brightness(c2) + brightness(c3) + brightness(c4);
            buffer2.pixels[index] = color(newC.r * 0.25,newC.g * 0.25,newC.b * 0.25);
        }
    }
    buffer2.updatePixels();


    temp.loadPixels();

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            // loop over
            let index = i*j;
            temp.pixels[index] = buffer1.pixels[index];
            temp.pixels[index + 1] = buffer1.pixels[index + 1];
            temp.pixels[index + 2] = buffer1.pixels[index + 2];
            temp.pixels[index + 3] = buffer1.pixels[index + 3];
        }
    }
    temp.updatePixels();

    buffer1 = buffer2;
    buffer2 = temp;

    image(buffer2,0,0);
}