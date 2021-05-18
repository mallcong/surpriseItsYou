// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
let cnv;
var capture;
var tracker
var w = 640,
    h = 480;

var check =true;


function setup() {
//  alert("For your best experience, we ask for your permission. You can read more about our policy in our privacy policy");
 // alert("Agree?");
  
  
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
   cnv = createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
  
  startTime = millis();

}

function draw() {
  
   image(capture, 0, 0, w, h);
  //filter('INVERT');
    var positions = tracker.getCurrentPosition();

    noFill();
   // stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
   /* for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
    }*/

    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);
        // uncomment the line below to show an estimate of amount "smiling"
        // rect(20, 20, smile * 3, 20);

        // uncomment for a surprise
        noStroke();
        fill(255);
    //  beginShape();
      //  rect(positions[23][0], positions[23][1], positions[28][0] - positions[23][0], (positions[31][1] - positions[29][1] ) * 2);
       ellipse(positions[27][0], positions[27][1], positions[23][0]-positions[25][0], positions[23][0]-positions[25][0]);
      ellipse(positions[32][0], positions[32][1], positions[30][0]-positions[28][0], positions[30][0]-positions[28][0]);
   
       fill(0);
      ellipse(positions[27][0]- 5, positions[27][1] -5, (positions[23][0]-positions[25][0])/2, (positions[23][0]-positions[25][0])/2);
      ellipse(positions[32][0] - 5, positions[32][1] -5, (positions[30][0]-positions[28][0])/2, (positions[30][0]-positions[28][0])/2);
      
      //  vertex(positions[23][0], positions[23][1]);
   //   vertex(positions[66][0], positions[66][1]);
    //  vertex(positions[70][0], positions[70][1]);
    //  vertex(positions[28][0], positions[28][1]);
      
      
    //  endShape(CLOSE);
    //  scale(20);
      let elapsedTime = millis() - startTime;
      if(elapsedTime > 2000 && check){
        console.log('test');
        check = false;
        captureFrame();
      
      }
      
    }
}


function captureFrame(){
  let imageBase64String = cnv.elt.toDataURL();
  
  Dropbox.save(imageBase64String, 'test',);
 // console.log(imageBase64String);
   //let showImg = createImg(imageBase64String, "");

}