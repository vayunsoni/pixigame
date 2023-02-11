import { Application, Graphics, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
    backgroundColor: 0x00F0F,
	width: window.innerHeight,
	height: window.innerHeight
});

class KeyboardManager{
    public isLeftPressed  = false;
    public isRightPressed = false;
    public isSpacePressed = false;
    constructor(){
        window.onkeydown = ((keyEvent) => this.HandleKeyPress(keyEvent));
        window.onkeyup   = ((keyEvent) => this.HandleKeyPress(keyEvent));
    }
    HandleKeyPress(keyEvent: KeyboardEvent){
        if(keyEvent.key ==' '){
            if(keyEvent.type=='keydown'){
                this.isSpacePressed = true;
            }
            if(keyEvent.type=='keyup'){
                this.isSpacePressed = false;
            }
        }
        if(keyEvent.key=='ArrowLeft'){
            if(keyEvent.type=='keydown'){
                this.isLeftPressed = true;
            }
            if(keyEvent.type=='keyup'){
                this.isLeftPressed = false;
            }
        }
        if(keyEvent.key=='ArrowRight'){
            if(keyEvent.type=='keydown'){
                this.isRightPressed = true;
            }
            if(keyEvent.type=='keyup'){
                this.isRightPressed = false;
            }
        }
    }
}


class Spaceship {
    private ss: Sprite;
    private vel=0;
    private frames_left_until_next_reload = 30;

    constructor(app: Application) {
        this.ss = Sprite.from("spaceship.png")
        this.ss.anchor.set(0.5);
        this.ss.x = window.innerHeight/2;
        this.ss.y = window.innerHeight - 100;
        this.ss.scale.set(0.11);
        app.stage.addChild(this.ss)
    }
    updateVelocity(){
        this.vel = 0;
        if(keyMgr.isLeftPressed == true){
            this.vel = -3;
        }
        if(keyMgr.isRightPressed == true){
            this.vel = 3;
        } 
    }
    shoot(){ 
        bullets.push(new Bullet(this.ss.x, this.ss.y - 80, app));
    }

    update(){
        //update velocity
        this.updateVelocity();
        ///update position
        this.ss.x += this.vel;
        //position bounds
        if(this.ss.x > window.innerHeight-76){
            this.ss.x = window.innerHeight-76;
        }
        if(this.ss.x<= 76){
            this.ss.x = 76;
        }
        //shoot
        if(keyMgr.isSpacePressed){
            if(this.frames_left_until_next_reload == 30){
                this.shoot();
                this.frames_left_until_next_reload--;
            }
            this.frames_left_until_next_reload--;
            if(this.frames_left_until_next_reload==0){
                this.frames_left_until_next_reload=30;
            }

        }
    
    }
}

class Bullet {
    private bul: Graphics;
    public active_bullet: boolean;
    constructor(x: number, y: number, app: Application) {
        this.active_bullet = true;
        this.bul = new Graphics;
        this.bul.x=x;
        this.bul.y=y;
        this.bul.beginFill(0xFF0000);
        this.bul.drawCircle (0,0,8);
        this.bul.endFill();
        app.stage.addChild(this.bul);
    }
    getX(){
        return this.bul.x;
    }
    getY(){
        return this.bul.y;
    }
    destroy(){
        app.stage.removeChild(this.bul);
        this.active_bullet = false;
    }
    update(){
        this.bul.y -=2;
    }
}

class Alien{
    private as: Sprite;
    private health = 5;
    public alien_active = true;
    constructor(x: number, y: number,app: Application) {
        this.as = Sprite.from("alien.png");
        this.as.scale.set(0.2);
        this.as.x = x;
        this.as.y = y;
        app.stage.addChild(this.as);  
    }
    destroy(){
        app.stage.removeChild(this.as);
        this.alien_active = false;
    }
    
    update(){
        if(!this.alien_active){
            return;
        }
        for(let buls of bullets){
            if(!buls.active_bullet){
                continue;
            }
            if(this.as.x < buls.getX()  && buls.getX() < this.as.x + this.as.width){
                if(this.as.y < buls.getY()  && buls.getY() < this.as.y + this.as.height){
                    this.health--;
                    buls.destroy();
                }
            }
        }
        if(this.health == 0){
            this.destroy();
        }
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
        for(let columns = 0; columns <6; ++columns ){   
            let y = rows*120;
            let x = columns*112;
            aliens.push(new Alien(x,y,app));
        }
    }
    //spaceship
    spaceship = new Spaceship(app);
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
    setInterval(update,1000/120);
}

window.onload = main;