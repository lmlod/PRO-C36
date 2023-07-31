var hypnoticBall, database;
var position;


function setup(){

  database = firebase.database();
  //console.log(database);

  createCanvas(500,500);

  //criação da bola
  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

  //Referência da posição da bola
  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);

}

//.ref():referencia
//.on(): sempre ligado
//.set()

function draw(){

  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

//Tecla pressionada (mudar a posição)
function writePosition(x,y){

  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
  
}

//Ler a posição do valor no banco de dados
function readPosition(data){

  position = data.val();
  //console.log(position.x);

  hypnoticBall.x = position.x;  
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}


//date