import { Application, Graphics, Sprite } from 'pixi.js'

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
    // private velocity=0;

    constructor(app: Application) {
        this.ss = Sprite.from("spaceship.png")
        this.ss.anchor.set(0.5);
        this.ss.x = window.innerHeight/2;
        this.ss.y = window.innerHeight - 100;
        this.ss.scale.set(0.11);
        app.stage.addChild(this.ss)
        
    }
    update(){
        }
    }

class Bullet {
    private bul: Graphics;
    
    constructor(x: number, y: number, app: Application) {
        this.bul = new Graphics;
        this.bul.beginFill(0xFF0000);
        this.bul.drawCircle (x,y,10);
        this.bul.endFill();
        app.stage.addChild(this.bul);
    }
    update(){
        this.bul.y -=1;
    }

}

class Alien{
    private as: Sprite;
    constructor(x: number, y: number,app: Application) {
        this.as = Sprite.from("alien.png");
        this.as.scale.set(0.2);
        this.as.x = x;
        this.as.y = y;
        app.stage.addChild(this.as);
    }
    update(){
        
    }
}
class KeyboardManager{
    // public isLeftPressed: Boolean;
    // public isRightPressed: Boolean;
    constructor(){
        window.onkeydown = ((keyEvent) => this.HandleKeyPress(keyEvent));
    }
    HandleKeyPress(keyEvent: KeyboardEvent){
        console.log(keyEvent);
    }
}

let spaceship:  Spaceship;
let bullets:    Bullet[] = [];
let aliens: Alien[] = [];
let keyMgr:    KeyboardManager;

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
    //alien
    
    for (let rows=0; rows<2; ++rows){
        for(let columns = 0; columns <10; ++columns ){   
            let y = rows*120;
            let x = columns*100;
            aliens.push(new Alien(x,y,app));
        }
    }
    //spaceship
    spaceship = new Spaceship(app);
    bullets.push(new Bullet(window.innerHeight/2, window.innerHeight - 203, app));
    //keyevent
    keyMgr = new KeyboardManager();
    keyMgr;
}

function update(){
    console.log('Updating');
    spaceship.update();
    for (const alien of aliens) {
        alien.update();
    }
    for (const bullet of bullets) {
        bullet.update();
    }
}

function main(){
    init();
    setInterval(update,1000/60);
}

window.onload = main;