const output = document.getElementById("output");
const splitOutput = document.getElementById("split-output")
const filePicker = document.getElementById("file-picker");
const splitFilePicker = document.getElementById("split-file-picker");
//ffmpeg -i original-video-file.mp4 -vf "scale=-2:128, crop=160:128, transpose=2, vflip" -r 16 -acodec pcm_s16le -ac 2 -ar 22050 -pix_fmt yuvj420p -c:v mjpeg -q:v 2 result-video-converted.avi

const ffmpegPrefix = "ffmpeg -i"
const transformCommand = `-vf "scale=-2:128, crop=160:128, transpose=2, vflip" -r 16 -acodec pcm_s16le -ac 2 -ar 22050 -pix_fmt yuvj420p -c:v mjpeg -q:v 2`


filePicker.addEventListener("change", (event) => {
  const files = event.target.files;
  output.textContent = "";

  for (const file of files) {
    const fileName = file.name;
    const inputName = fileName.slice(0, fileName.length - 4);
    const ffmpegCommand = `${ffmpegPrefix} "${inputName}.mp4" ${transformCommand} "${inputName}.avi"`
    const li = document.createElement("li");
    const copyButton = document.createElement("button");
    copyButton.addEventListener("click", (e) => {
        navigator.clipboard.writeText(ffmpegCommand)
    })
    copyButton.textContent = "copy";
    li.appendChild(copyButton);
    li.innerHTML = li.innerHTML + ffmpegCommand;
    
    output.appendChild(li);
  }
});

splitFilePicker.addEventListener("change", (event) => {
  const files = event.target.files;
  splitOutput.textContent = "";
//ffmpeg -i input.mp4 -c copy -f segment -segment_time 300 -reset_timestamps 1 %03d.mp4
  for (const file of files) {
    const fileName = file.name;
    const inputName = fileName.slice(0, fileName.length - 4);
    const ffmpegCommand = `${ffmpegPrefix} "${inputName}.avi" -c copy -f segment -segment_time 300 -reset_timestamps 1 "${inputName}'%02d'.avi"`
    const li = document.createElement("li");
    console.log(ffmpegCommand)
    const copyButton = document.createElement("button");
    copyButton.addEventListener("click", (e) => {
      console.log(1)
      navigator.clipboard.writeText(ffmpegCommand)
    })
    copyButton.textContent = "copy";
    li.appendChild(copyButton);
    li.innerHTML = li.innerHTML + ffmpegCommand;
    
    splitOutput.appendChild(li);
  }
});
