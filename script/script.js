let config = {
    height:window.innerHeight - 10,
    width:window.innerWidth - 10,
    backgroundColor:'#ccc',
    physics: { default: 'arcade' },
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}
if(localStorage.getItem('fishhigh')==null){
    localStorage.setItem('fishhigh',0)
}else{
    highscore = localStorage.getItem('fishhigh')
}


var pos;

let game = new Phaser.Game(config)
let score = 0;
let scoreText = '';

function preload(){
    this.load.image('fish','script/Assets/fish.png');
    this.load.image('back','script/Assets/back.jpg');
    this.load.image('food','script/Assets/food.png');

    pos=[[game.config.width/2,game.config.height/2],[game.config.width/2,game.config.height/2]];
    
}
function create(){
    let W = game.config.width;
    let H = game.config.height;
    this.back = this.add.sprite(W/2,H/2,'back').setScale(H/1700);
    head = this.add.text(20,10,'Feed Your Fish',{ font: `30px Arial`, fill: '#fff' })
    

    this.fish = this.physics.add.image(W/2, H/2, 'fish', Phaser.Math.RND.pick(frames)).setInteractive();

    this.fish.setScale(.2);
    this.input.setDraggable(this.fish);
    this.fish.angle = 50;

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        if(gameObject.x<dragX){
            gameObject.setFlip(true,false)
            gameObject.angle = -50;
        }else{
            gameObject.setFlip(false,false)
            gameObject.angle = 50;
        }
        gameObject.x = dragX;
        gameObject.y = dragY;

    });
    this.feed = this.physics.add.sprite(-50,-10,'food',{borderRadius:'20px'}).setScale(.1);
    this.feed1 = this.physics.add.sprite(-50,-20,'food',{borderRadius:'20px'}).setScale(.1);
    this.feed2 = this.physics.add.sprite(-50,-20,'food',{borderRadius:'20px'}).setScale(.1);
    this.feed3 = this.physics.add.sprite(-50,-20,'food',{borderRadius:'20px'}).setScale(.1);
    this.input.on('pointerdown',run,this);

    setInterval(levelup,12000);

}
function update(){
    if (this.physics.overlap(this.fish, this.feed)) {
        score+=siz;
        clearInterval(z);
        food(this.feed)
        scoreText.setText('score: ' + score);
      if(localStorage.getItem('fishhigh')<score){
          localStorage.setItem('fishhigh',score)
          this.highscore.setText('HighScore:'+score)
      }
      }else if(this.physics.overlap(this.fish, this.feed1)) {
        score+=siz1;
        clearInterval(y);
        food1(this.feed1)
        scoreText.setText('score: ' + score);
        if(localStorage.getItem('fishhigh')<score){
            localStorage.setItem('fishhigh',score)
            this.highscore.setText('HighScore:'+score)
        }
      }else if(this.physics.overlap(this.fish, this.feed2)) {
        score+=siz2;
        clearInterval(x);
        food2(this.feed2)
        scoreText.setText('score: ' + score);
      if(localStorage.getItem('fishhigh')<score){
          localStorage.setItem('fishhigh',score)
          this.highscore.setText('HighScore:'+score)
      }
      }else if(this.physics.overlap(this.fish, this.feed3)) {
        score+=siz3;
        clearInterval(w);
        food3(this.feed3);
        scoreText.setText('score: ' + score);
      if(localStorage.getItem('fishhigh')<score){
          localStorage.setItem('fishhigh',score)
          this.highscore.setText('HighScore:'+score)
      }
      }
    if(score<0){
        document.write('<center><h2 style="margin-top:50vh;">Game Over</h2></center>')
        throw new Error('Game Over');
    }
      
}

function run(){
    food(this.feed,this);
    setTimeout(food1,2000,this.feed1,this);
    setTimeout(food2,4000,this.feed2,this);
    setTimeout(food3,6000,this.feed3,this);
    this.input.off('pointerdown');
    head.setText("")
    let style = { font: `20px Arial`, fill: '#fff' };
    scoreText = this.add.text(10, 30, 'score: ' + score, style);
    this.highscore = this.add.text(10, 10, 'HighScore: ' + localStorage.getItem('fishhigh'), style);
}
function onDragStart(sprite, pointer) {

    result = "Dragging " + sprite.key;

}
var p ;
let i =0;
let d = 4;
let w,x,y,z;
function levelup(){
    if(d<8){
        d+=1;
    }
}
let siz,siz1,siz2,siz3;
function food(t){
    let random_Position = Phaser.Math.Between(10,game.config.width-20);
    siz =Phaser.Math.Between(2,7);
    t.setScale(siz/100);
    t.x = random_Position;
    t.y=-20;
    
    z  = setInterval(function (){
        t.y+=d;
        if(t.y>=game.config.height){
            score-=siz*d;
            scoreText.setText('score: ' + score);
            clearInterval(z);
            food(t);
        }
    },5+(7-siz)*4)
}
function food1(t){
    let random_Position = Phaser.Math.Between(10,game.config.width-20);
    siz1 =Phaser.Math.Between(2,7);
    t.setScale(siz1/100);
    t.x = random_Position;
    t.y=-20;
    y  = setInterval(function (){
        t.y+=d;
        if(t.y>=game.config.height){
            score-=siz1*d;
            scoreText.setText('score: ' + score);
            clearInterval(y);
            food1(t);
        }
    },5+(7-siz1)*4)
}
function food2(t){
    let random_Position = Phaser.Math.Between(10,game.config.width-20);
    siz2 =Phaser.Math.Between(2,7);
    t.setScale(siz2/100);
    t.x = random_Position;
    t.y=-20;
    x  = setInterval(function (){
        t.y+=d;
        if(t.y>=game.config.height){
            score-=siz2*d;
            scoreText.setText('score: ' + score);
            clearInterval(x);
            food2(t);
        }
    },5+(7-siz2)*4)
}
function food3(t){
    let random_Position = Phaser.Math.Between(10,game.config.width-20);
    siz3 =Phaser.Math.Between(2,7);
    t.setScale(siz3/100);
    t.x = random_Position;
    t.y=-20;
    w  = setInterval(function (){
        t.y+=d;
        if(t.y>=game.config.height){
            score-=siz3*d;
            scoreText.setText('score: ' + score);
            clearInterval(w);
            food3(t);
        }
    },5+(7-siz3)*4)
}

/*function move(fish){
    pos.push([Math.round(fish.x,3),Math.round(fish.y,3)])
    if(pos.length>15){
        pos.splice(pos.length - 4,pos.length-1 )
    }
    
    let y = pos[0][1]-pos[pos.length-1][1]
    let x = pos[0][0]-pos[pos.length-1][0]
    let a = Math.atan((-y)/x)*(57.2958);
    console.log(fish.angle)
    

    if(x!=0){
        fish.angle = ((y)/x)*57 + 180;    
    }
    
}
*/
