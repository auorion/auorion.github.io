window.onload = () => {
  const videoElement = document.getElementById("videoElement");
  const captureBtn = document.getElementById("captureBtn");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const download = document.getElementById("download");
  let stream;

  captureBtn.onclick = async () => {
    download.style.display = "none";

    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    videoElement.srcObject = stream;
    videoElement.muted = true;

    blobs = [];

    rec = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=h264, opus",
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
