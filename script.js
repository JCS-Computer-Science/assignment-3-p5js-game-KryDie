let data = {
    cars: [
        {x: 300, y: 0, len: 400, wid: 900, velX: 2, velY: 2 } //rectangle
    ],

    lane: {
        x: [500,690], y: 0, len: 10, wid: 80
    },

    pot: [
        {x: 500, y: 450, size: 100} //circle
    ]

}

function setup(){
    let cnv = createCanvas(1200, 900)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    cnv.position(x, y)
}

function draw(){
    background('green')
    fill('gray')
    rect(350,0,500,900)
    fill('white')
    drawLanes()
    move()
}

function drawLanes(){
    let flow = 3
    let spacing = 150

    for(let i = 0; i < 10; i++){
        let yPos = data.lane.y + i*spacing

        rect(data.lane.x[0], yPos, data.lane.len, data.lane.wid)
        rect(data.lane.x[1], yPos, data.lane.len, data.lane.wid)
    }

    data.lane.y += flow
    if(data.lane.y >=spacing){
        data.lane.y = 0
    }
}

function move(){
    let xPos = 550
    let yPos = 600
    fill("red")
    rect(xPos, yPos, 100,100)
    yPos += data.cars.velY
}
function keyPressed(){
    let velX = data.cars.velX
    let velY = data.cars.velY

    if(keyCode == LEFT_ARROW){
        velX *= -1
    }else if(keyCode == RIGHT_ARROW){
        velX *=1
    }
}
