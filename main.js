noseX=0;
noseY=0;
righteyeX=0;//a partir de aquí es actividad adicional, en caso de que se quiera agregar lentes
righteyeY=0;

function preload(){
    nariz_payaso = loadImage('https://i.postimg.cc/SRRrpRL0/narizpayaso.png');
    lentes = loadImage('https://i.postimg.cc/vBvHWCKv/glasses.png');
}

function setup(){
    canvas = createCanvas(400, 400)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);  //colocar de acuerdo con el tamaño del canvas
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet está inicializado');
}
function draw() {
    image(video, 0, 0, 400, 400)
    //Se coloca primero este código y luego se elimina para dejar el dibuo de payaso.
    //fill(255,0,0);
    //stroke(255,0,0);
    //circle(noseX, noseY, 20);
    image(nariz_payaso, noseX, noseY, 30, 30);
    image(lentes, righteyeX, righteyeY, 160, 60);
}

function tomar_foto(){
    save('imagenfiltro.png')
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x -11;  //esta coordenada irá de acuerdo a lo que se requiera para centrar la imagen de nariz de payaso.
        noseY = results[0].pose.nose.y -11;  //esta coordenada irá de acuerdo a lo que se requiera para centrar la imagen de nariz de payaso.
        console.log("nose x = " + noseX);
        console.log("nose y = " + noseY);
        righteyeX = results[0].pose.rightEye.x - 50;//código adicional para agregar lentes
        righteyeY = results[0].pose.rightEye.y - 20; //código adicional para agregar lentes
    }
}
