class Game {
    constructor(assets){
        this.over = false
        this.started = false
        this.score = 0
        this.speed = 5
        this.spawnTimer = 0
        this.spawnEvery = 50
        this.assets = assets

        this.road = new Road()
        this.player = new Player(this.road, this.assets.player)
        this.obstacles = []

    }
  
    update(){
        this.score++

        if(this.score % 300 == 0 && this.speed < 20){
            this.speed++
        }

        this.spawnTimer++

        if(this.spawnTimer >= this.spawnEvery){
            this.spawnObstacle()
            this.spawnTimer = 0
            this.spawnEvery = round(random(35, 65)- this.speed)
        }

        this.moveObstacle()
        this.checkCollision()
    }

    handleKey(clicked){
        if(clicked == 37 && this.player.lane > 0){
            this.player.lane--
        } else if(clicked == 39 && this.player.lane < 2){
            this.player.lane++
        }
    }

    startScreen(){
        background('#0f122e')
        fill('#edf10f')
        textAlign(CENTER)
        textSize(62)
    
        text('HIGHWAY DASH', width / 2, 320)
    
        fill('white')
        textSize(24)
        text('Dodge traffic and avoid potholes!', width / 2, 390)
        text('Use ← → to switch lanes', width / 2, 430)
    
        fill('#2ecc71')
        rect(width/2 - 110, 490, 220, 55, 10)
    
        fill('#1a1a2e')
        textSize(26)
        text('PRESS SPACE', width / 2, 525)
    }

    draw(){
        background('green')
        this.road.draw(this.speed)
        this.player.draw()

        for(let obs of this.obstacles) {
            obs.draw()
        }

        this.drawHud()
    }

    gameOver(){
        fill(0, 0, 0, 160)
        noStroke()
        rect(0, 0, width, height)

        fill('#e74c3c')
        textAlign(CENTER)
        textSize(72)
        text('GAME OVER', width / 2, 340)

        fill('white')
        textSize(28)
        text('Score: ' + floor(this.score / 10), width / 2, 410)

        fill('#2ecc71')
        rect(width / 2 - 110, 460, 220, 55, 10)

        fill('#1a1a2e')
        textSize(26)
        text('PRESS SPACE', width / 2, 495)
    }

    spawnObstacle(){
        if (random() < 0.6){
            this.obstacles.push(new CarObstac(this.road, this.assets.cars))
        } else{
            this.obstacles.push(new Pothole(this.road))
        }
    }

    moveObstacle(){
        for (let i = this.obstacles.length - 1; i >= 0; i--){
            this.obstacles[i].update(this.speed)

            if(this.obstacles[i].offScreen()){
                this.obstacles.splice(i,1)
            }
        }
    }

    checkCollision(){
        for (let obs of this.obstacles){
            if(obs.collides(this.player)){
                this.over = true
            }
        }
    }

    drawHud(){
        fill('white'); noStroke(); textSize(22); textAlign(LEFT)
   
        text('SCORE: ' + floor(this.score / 10), 20, 40)
        text('SPEED: ' + this.speed, 20, 65)
        textAlign(RIGHT)
        text('← → to switch lanes', width - 20, 40)
    }

    restart(){
        this.obstacles = []
        this.score = 0
        this.speed = 5
        this.over = false
        this.spawnTimer = 0
        this.spawnEvery = 55
        this.player.changeLanes(0, true)
    }
}

class Player {
    constructor(road, img){
        this.road = road
        this.img = img
        this.lane = 1
        this.x = this.road.laneX[this.lane]
        this.y = 500 
        this.w = 200
        this.h = 100
    }

    update() {
        this.x = lerp(this.x, this.road.laneX[this.lane], 0.12)
    }

    draw(){
        image(this.img, this.x - 30, this.y - 50, 90, 100)
    }

   changeLanes(direction){
    this.lane = constrain(this.lane + direction, 0, this.road,laneX.length -1)
   }

   resetLane(){
    this.lane = 1
    this.x = this.road.laneX[this.lane]
   }
}

class Road {
    constructor(){
        this.laneX = [422, 595, 750]
        this.laneY = 0
        this.spacing = 150
    }
    
    draw(speed = 5){
        fill(90,90,90); noStroke()  //road
        rect(350,0,500,900)
        fill('yellow')  //highlight
        rect(350, 0, 8, 900)
        rect(842, 0, 8, 900)


        fill('white')
        this.drawLanes(speed)
    }

    drawLanes(speed){
        //let flow = 4

        for(let i = 0; i < 10; i++){
            let yPos = this.laneY + i *this.spacing
            rect(510, yPos, 8, 80)
            rect(690, yPos, 8, 80)
        }

        this.laneY += speed

        if(this.laneY >= this.spacing){
            this.laneY = 0
        }
    }
}

class Obstacle {
    constructor(road){
        this.road = road
        this.lane = floor(random(3))
        this.x = this.road.laneX[this.lane]
        this.y = -50
    }

    update(speed){
        this.y += speed
    }

    offScreen(){
        return this.y > height + 50
    }

    collides(player){
        return false
    }
}

class CarObstac extends Obstacle {
    constructor(road, img){
        super(road)
        this.img = img[floor(random(img.length))]
    }

    draw(){
        image(this.img, this.x - 30, this.y - 50, 90, 100)
    }

    collides(player){
        return abs(player.x - this.x) < 52 && abs(player.y - this.y) < 95
    }
}

class Pothole extends Obstacle {
    constructor(road){
        super(road)
        this.size = random(30,60)
    }

    draw(){
        fill(58)
        ellipse(this.x, this.y, this.size, this.size * 0.6)

        fill('#362624')
        ellipse(this.x + 3, this.y + 2, this.size * 0.5, this.size * 0.28)
    }

    collides(player){
        return dist(player.x, player.y, this.x, this.y) < this.size * 0.45 + 22
    }
}
