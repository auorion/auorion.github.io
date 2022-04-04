const leftVideo = document.getElementById('leftVideo');
const rightVideo = document.getElementById('rightVideo');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    let stream;
    if (leftVideo.captureStream) {
      stream = leftVideo.captureStream();
    } else {
      console.error('Stream capture is not supported');
      stream = null;
    }
    rightVideo.srcObject = stream;
});
