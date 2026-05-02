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
}

class Road {

}

class Obstacle {

}

