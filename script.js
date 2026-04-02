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

let playerImg = loadImage('')
let obstacleImg = loadImage('')

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
        gameOver()
        return
    }

    background("green") //grass
    fill(90,90,90); noStroke()  //road
    rect(350,0,500,900)
    fill('yellow')  //highlight
    rect(350, 0, 8, 900)
    rect(842, 0, 8, 900)

    fill('white')
    drawLanes()

    player.x = lerp(player.x, road.laneX[player.lane], 0.12) //smoother movement 

    game.spawnTimer++
    if(game.spawnTimer >= game.spawnEvery){
        spawnObstacle()
        game.spawnTimer = 0
        game.spawnEvery = round(random(35, 65))
    }

    moveDrawObs()
    drawCar(player.x, player.y, true)
    checkCollision()

    game.score++
    game.speed = 5 + floor(game.score / 300)

    drawHud()
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

function drawCar(x, y, isPlayer){
    if(isPlayer){
        image(playerImg, x-30, y - 50, 60, 100)
    }else {
        image(obstacleImg, x-30, y-50, 60, 100)
    }
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
            drawPothole(obstacles[i])
        }
    }
    
}

function checkCollision(){
    for (let obs of obstacles){
        if (obs.type == 'car'){
            if (abs(player.x - obs.x) < 52 && abs(player.y - obs.y) < 95) game.over = true
        } else {
            if (dist(player.x, player.y, obs.x, obs.y) < obs.size * 0.45 + 22) game.over = true
        }
    }
}

function drawHud(){
    fill('white'); noStroke(); textSize(22); textAlign(LEFT)
    text('SCORE: ' + floor(game.score / 10), 20, 40)
    text('SPEED: ' + game.speed, 20, 65)
    textAlign(RIGHT)
    text('← → to switch lanes', width - 20, 40)
}

function startScreen(){
    background('#0f122e')
    fill('#edf10f'); textAlign(CENTER); textSize(62)
    text('HIGHWAY DASH', width / 2, 320)
    fill('white'); textSize(24)
    text('Dodge traffic and avoid potholes!', width / 2, 390)
    text('Use  ←  →  arrow keys to switch lanes', width / 2, 430)
    fill('#2ecc71'); rect(width/2 - 110, 490, 220, 55, 10)
    fill('#1a1a2e'); textSize(26)
    text('PRESS SPACE', width / 2, 525)
}

function gameOver(){
    fill(0, 0, 0, 160); rect(0, 0, width, height)
    fill('#e74c3c'); textAlign(CENTER); textSize(70)
    text('GAME OVER', width / 2, height / 2 - 60)
    fill('white'); textSize(30)
    text('Score: ' + floor(game.score / 10), width / 2, height / 2 + 10)
    fill('#edf10f'); textSize(22)
    text('Press SPACE to play again', width / 2, height / 2 + 70)
}

function restart(){
    obstacles = []
    game.score = 0
    game.speed = 5
    game.over = false 
    game.spawnTimer = 0
    game.spawnEvery = 55
    player.lane = 1
    player.x = road.laneX[player.lane]
}
function keyPressed(){
    if (!game.started && key == ' '){
        game.started = true
        return
    }
    if (game.over && key == ' '){
        restart()
        return
    }
    if (!game.over){
        if (keyCode == LEFT_ARROW && player.lane > 0){
            player.lane--
        }else if (keyCode == RIGHT_ARROW && player.lane < 2){
            player.lane++
        }
    }
}
