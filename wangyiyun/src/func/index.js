function timeToMM(time){
  var temps = time.splice(':')
  if(temps.length < 1)
    temps = time.splice('：')
  else
    return '0'
  //return 1000
  return temps[0] * 60000 + temps[1] * 1000
}
function MMToTime(MM){
  var min = Math.floor(MM / 60).toString()
  var sec = Math.floor(MM % 60).toString()
  var time = (min.length === 1 ? '0' : '' ) + min + '：' + (sec.length === 1 ? '0' : '' ) + sec
  return time
}

exports.timeToMM = timeToMM
