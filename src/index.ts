import { Application, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
    backgroundColor: 0x00F0F,
	width: window.innerHeight,
	height: window.innerHeight
});

class Spaceship {
    private ss: Sprite;

    constructor(app: Application) {
        this.ss = Sprite.from("spaceship.png")
        this.ss.anchor.set(0.5);
        this.ss.x = window.innerHeight/2;
        this.ss.y = window.innerHeight - 100;
        this.ss.scale.set(0.11);
        app.stage.addChild(this.ss)
    }
    update(){
        this.ss.x +=1;
        if(this.ss.x > window.innerHeight){
            this.ss.x =0;
        }
    }

}

let spaceship: Spaceship;

function init(){
    console.log('Initialising');
    //background
    const background: Sprite = Sprite.from("background.jpeg");
    background.anchor.set(0);
    background.x = 0;
    background.y = 0;
    background.height = window.innerHeight;
    background.width = window.innerHeight;
    app.stage.addChild(background);

    //spaceship
    spaceship = new Spaceship(app);
}

function update(){
    console.log('Updating');
    spaceship.update();

}

function main(){
    init();
    setInterval(update,1000/60);
}

window.onload = main;