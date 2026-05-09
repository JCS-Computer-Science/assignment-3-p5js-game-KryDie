let game 
let assets = {}


function preload(){
    assets.player = loadImage('imgs/Black_viper.png')
    assets.cars =[ 
        loadImage('imgs/taxi.png'),
        loadImage('imgs/Police.png'),
        loadImage('imgs/Car.png')
    ] 
}

function setup(){
    let cnv = createCanvas(1200, 900)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    cnv.position(x, y)
    game = new Game(assets)
}

function draw(){
    if(game.started == false){
        game.startScreen()
        return
    }

    if(game.over){
        game.draw()
        game.gameOver()
        return
    }

    game.update()
    game.draw()
}

function keyPressed(){
    if(game.started == false && key == ' '){
        game.started = true
        return
    }

    if(game.over && key == ' '){
        game.restart()
        return
    }

    /* if(keyCode == LEFT_ARROW && game.player.lane > 0){
        game.player.lane--
    } else if(keyCode == RIGHT_ARROW && game.player.lane < 2){
        game.player.lane++
    } */
}