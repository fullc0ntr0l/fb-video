function getVideoImage(path, secs, callback) {
  var me = this, video = document.createElement('video');
  video.onloadedmetadata = function() {
    if ('function' === typeof secs) {
      secs = secs(this.duration);
    }
    this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
  };
  video.onseeked = function(e) {
    var canvas = document.createElement('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = canvas.toDataURL();
    callback.call(me, img, this.currentTime, e);
  };
  video.onerror = function(e) {
    callback.call(me, undefined, undefined, e);
  };
  video.src = path;
}


function generateImgArray(path, timeArray) {
  return new Promise((response, reject) => {
    let result = [];

    function gotImage(img, secs, event) {
      if (event.type === 'seeked') {
        result.push(img.src);

        if (result.length === timeArray.length) response(result);
      }
    }

    for (let secs in timeArray) {
      getVideoImage(path, secs, gotImage);
    }
  });
}


function generateTimeArray(secs, count=10) {
  const arr = [];
  for (let i=0; i<count; i++) {
    arr.push(Math.random() * secs);
  }
  return arr;
}

export {
  getVideoImage,
  generateImgArray,
  generateTimeArray
};
