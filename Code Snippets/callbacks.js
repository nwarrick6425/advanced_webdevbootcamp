function forEach(arr, callback) {
  for (var i=0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
};

function findIndex(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if(callback(arr[i], i, arr)) {
      return i;
    }
  }

  return -1;
};

function countDown(time) {
  var timeNum = time;
  var intervalId = setInterval(() => {
    console.log("Timer: " + timeNum);
    timeNum--;
    if (timeNum === 0) {
      console.log("Ring Ring Ring!!!");
      clearInterval(intervalId);
    }
  })
};

function myForEach(arr, callback) {
  for(var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }

  return undefined;
}