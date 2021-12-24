var p1,p1Img, p1salto, p1Simg;
var fondo,fImg;
var Musica,Smuerte,Sfin;
var gameState = "play";
var obstaculoI,obstaculoG;
var suelo, sueloImg;



function preload(){

    p1Img = loadAnimation("movimiento/mov1.png","movimiento/mov2.png","movimiento/mov3.png","movimiento/mov4.png");
    p1Simg = loadAnimation("movimiento/salto.png");
    fImg = loadImage("fondo/cielo.jpg");
    Musica = loadSound("sonidos/heartache.mp3");
    obstaculoI = loadImage("fondo/arbusto.png");
    sueloImg = loadImage("fondo/pasto.png");

}

function setup() {
    createCanvas(800,350);

    fondo = createSprite(650,200);
    fondo.addImage("fondo",fImg);
    fondo.velocityX=-5;

    suelo = createSprite(300,480,800,100);
    suelo.addImage("suelo",sueloImg);
    suelo.scale = 5.5;
    suelo.velocityX=-5;

    sueloinv = createSprite(400,355,800,20);
    sueloinv.tint ="#2d572c";
    //sueloinv.visible=false;

    p1 = createSprite(50,250);
    p1.addAnimation("p1",p1Img);
    p1.addAnimation("salto",p1Simg);
    p1.scale=0.8;

    obstaculoG = new Group();

    Musica.loop();
}

function draw() {
    background(0);
    
    if(gameState=="play"){

        if(keyDown("w") && p1.y >= 180){
            p1.velocityY=-10;
            p1.changeAnimation("salto",p1Simg);
        }
        if(p1.isTouching(sueloinv)){
            p1.changeAnimation("p1",p1Img);
        }
        p1.velocityY=p1.velocityY+0.5;

        if(fondo.x<-100){
            fondo.x=650;
        }
        if(suelo.x<10){
            suelo.x=650;
        }
        
        if(obstaculoG.isTouching(p1)){
            p1.destroy();
            gameState="end";
        }
         
        p1.debug =true;
        obstaculos();
        p1.collide(sueloinv);
        drawSprites();
    }    

    if(gameState=="end"){
        textSize(30);
        fill("red");
        textFont("Goudy Stout");
        text("TE MORISTE :c",250,175);

        Musica.stop();
        
    }


    
}


function obstaculos(){
    if(frameCount%250==0){
        var obstaculo = createSprite(800,325,50,10);
        obstaculo.addImage("obstaculo",obstaculoI);
        obstaculo.scale=0.3
        obstaculo.velocityX=-3;

        obstaculoG.add(obstaculo);

        obstaculo.lifetime=800;

        obstaculo.setCollider("rectangle",0,0,200,140);
        obstaculo.debug = true;
    }


}