let serialPDM;
let portName = 'COM3';
let sensors;
let colorChange;
let ledOn = true;

function setup() {
    serialPDM = new PDMSerial(portName);
    sensors = serialPDM.sensorData;

    

    createCanvas(800,600);
}

function draw(){
    colorChange = map(sensors.a0, 0, 1023, 0, 255);
    background(0, colorChange, colorChange * 0.5);
    textSize(32);
    fill(32, 140, 110);
    text("a0: " + sensors.a0, 10, 30);
    
}
function keyTyped() {
    if(key === 'a' && !ledOn){
        serialPDM.transmit('led', 1);
        console.log(key + ", led on!");
        ledOn = true;
    }

    else if(key === 'a' && ledOn){
        serialPDM.transmit('led', 0);
        console.log(key + ", led off!");
        ledOn = false;
    }
    
}



function mouseDragged(){
    ellipse(mouseX,mouseY,15,15);
    let fade = Math.floor(map(mouseY, 0, height, 0, 255, true));

    serialPDM.transmit('fade',fade);

    // prevent default
    return false;
}