class Game {
    constructor(){
        this.over = false
        this.started = false
        this.score = 0
        this.speed = 10
        this.spawnTimer = 0
        this.spawnEvery = 50
    }

    update(){
        this.spawnTimer++

        if(this.spawnTimer >= this.spawnEvery){
            this.spawnObstacle()
            this.spawnTimer = 0
            this.spawnEvery = round(random(35, 65)- this.speed)
        }
    }
}

class Player {
    constructor(road){
        this.lane = 1
        this.x = this.road.laneX[this.lane]
        this.y = 500 
        this.w = 200
        this.h = 100
    }

    update(){
        this.x = lerp(this.x, this.road.laneX[this.lane], 0.12) //smoother movement
    }

    draw(){
        Image(playerimg, this.x - 30, this.y - 50, 90, 100)
    }

    changeLanes(direction = 0, reset = false){
        if(reset){
            this.lane = Math.floor(this.road.laneX.length / 2)
        } else {
            this.lane = constain(this.lane + direction, 0, this.road.laneX.length - 1) //lanes stay between 1-3
        }
    }
}

class Road {
    constructor(){
        this.laneX = [422, 595, 750]
        this.laneY = 0
        this.spacing = 150
    }
    
    draw(){
        fill(90,90,90); noStroke()  //road
        rect(350,0,500,900)
        fill('yellow')  //highlight
        rect(350, 0, 8, 900)
        rect(842, 0, 8, 900)


        fill('white')
        drawLanes()
    }

    drawLanes(){
        let flow = 4

        for(let i = 0; i < 10; i++){
            let yPos = this.laneY + i *this.spacing
            rect(510, yPos, 8, 80)
            rect(690, yPos, 8, 80)
        }

        this.laneY += flow

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
        this.y = 100
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
    
}

