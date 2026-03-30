let game = {
    over: false,
    started: true,
    score: 0,
    speed: 5,
    spawnTimer: 0,
    spawnEvery: 50
}

let road = {
    laneX: [430,600,770],
    laneY: 0,
    spacing: 150
}

let player = {
    lane: 1,
    x: 600,
    y: 720,
    w: 60,
    h: 100
}

let obstacles = []
let carColors = ['#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c']

function setup(){
    let cnv = createCanvas(1200, 900)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    cnv.position(x, y)
}

function draw(){
    if (!game.started){
        startScreen()
        return
    }else if (game.over){
        endScreen()
        return
    }

    background("green")
    fill(90,90,90); noStroke()
    rect(350,0,500,900)
    fill('yellow')
    rect(350, 0, 8, 900)
    rect(842, 0, 8, 900)

    fill('white')
    drawLanes()

    player.x = lerp(player.x, road.laneX[player.lane], 0.12) //smoother movement 

    game.spawnTimer++
    if(game.spawnTimer >= game.spawnEvery){

    }
}

function drawLanes(){
    let flow = 4 
    for(let i = 0; i < 10; i++){
        let yPos = road.laneY + i*road.spacing
        rect(495, yPos, 8, 80)
        rect(695, yPos, 8, 80)
    }
    
    road.laneY += flow
    if(road.laneY >= road.spacing){
        data.lane.y = 0
    }
}

function drawCar(){

}

function spawnObstacle(){
    let lane = floor(random(3))
    let type = random() < 0.65 ? "car" : 'pothole'
    obstacles.push({
        lane: lane,
        x: road.laneX[lane],
        y: -80,
        type: type,
        col: random(carColors),
        size: type == 'pothole' ? random(35,60): 0
    })   
}
function moveDrawObs(){
    for (let i = obstacles.length - 1; i >= 0; i--){
        obstacles[i].y =+ game.speed + 2

        if(obstacles[i].y > 980){
            obstacles.splice(i, 1)
        }else if (obstacles[i].type == 'car'){
            drawCar(obstacles[i].x, obstacles[i].y, obstacles[i].col, false)
        }else {
            drawPothole(obsatcles[i])
        }
    }
    
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
