window.onload = () => {
  const videoElement = document.getElementById("videoElement");
  const captureBtn = document.getElementById("captureBtn");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const download = document.getElementById("download");
  const errorElement = document.getElementById('errorMsg');
  let stream;

  function errorMsg(msg, error) {
    errorElement.innerHTML += `<p>${msg}: ${error}</p>`;
  }

  captureBtn.onclick = async () => {
    download.style.display = "none";

    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
    } catch (exception) {
      errorMsg("getDisplayMedia failed", exception.message);
      console.log(exception);
      return;
    }

    videoElement.srcObject = stream;
    videoElement.muted = true;

    blobs = [];

    rec = new MediaRecorder(stream, {
      mimeType: "video/webm;",
    });
    rec.ondataavailable = (e) => blobs.push(e.data);
    rec.onstop = async () => {
      blob = new Blob(blobs, { type: "video/webm" });
      let url = window.URL.createObjectURL(blob);
      download.href = url;
      download.download = "test.webm";
      download.style.display = "block";
    };

    startBtn.disabled = false;
    captureBtn.disabled = true;
  };

  startBtn.onclick = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    rec.start();
  };

  stopBtn.onclick = () => {
    captureBtn.disabled = false;
    startBtn.disabled = true;
    stopBtn.disabled = true;

    rec.stop();

    stream.getTracks().forEach((s) => s.stop());
    videoElement.srcObject = null;
    stream = null;
  };
};
