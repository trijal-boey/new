img=""
status=""
object=[]


function preload(){
    img=loadImage("nedroom.jpg");
}

function setup(){
    canvas= createCanvas(500,600);
    canvas.center();
    objDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status is detecting";

}

function modelLoaded(){
    console.log("cocossd model is loaded");
    status=true
    objDetector.detect(img,gotResult);
}

function gotResult(error,result){
    if(error){
        console.log(error)
    }
    console.log(result)
    objects=result
}

function draw(){
    image(img,0,0,400,500);
    fill("#ae4a60")
    text("bed",45,320);
    noFill();
    stroke("#ae4a60");
    rect(30,300,350,150);
    if(status!=""){
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="objects detected are"
            fill("#ae4a60")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y)
            noFill();
            stroke("#ae4a60");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
