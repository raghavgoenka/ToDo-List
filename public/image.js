video.style.display="none";
document.getElementById("start").addEventListener("click", function() {

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        // video.src = window.URL.createObjectURL(stream);
       video.style.display="block";
        video.srcObject = stream;
        video.play();
    });
}

});



// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
  context.drawImage(video, 0, 0, 200, 200);
 

  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
  
  video.style.display="none";
  document.getElementById("snap").style.display="none";
  
   

});



// //--------------------
// // GET USER MEDIA CODE
// //--------------------
// navigator.getUserMedia = ( navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia ||
//   navigator.msGetUserMedia);
  
//   var video;
//   var webcamStream;
  
//   function startWebcam() {
//     if (navigator.getUserMedia) {
//       navigator.getUserMedia ({
//         video: true,
//         audio: false
//       },
//       // successCallback
//       function(localMediaStream) {
//         video = document.querySelector('video');
//         video.src = window.URL.createObjectURL(localMediaStream);
//         webcamStream = localMediaStream;
//       },
//       // errorCallback
//       function(err) {
//         console.log("The following error occured: " + err);
//       });
//     } else {
//       console.log("getUserMedia not supported");
//     }  
//   }
  
//   function stopWebcam() {
//     webcamStream.stop();
//   }
  
//   //---------------------
//   // TAKE A SNAPSHOT CODE
//   //---------------------
//   var canvas, ctx;
  
//   function init() {
//     // Get the canvas and obtain a context for
//     // drawing in it
//     canvas = document.getElementById("canvas");
//     ctx = canvas.getContext('2d');
//   }
  
//   function snapshot() {
//     // Draws current image from the video element into the canvas
//     ctx.drawImage(video, 0,0, canvas.width, canvas.height);
//   }