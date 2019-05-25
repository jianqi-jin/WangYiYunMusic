const getters = {
  listInfoId(state){
    return state.pageId.listInfoId
  },
  currentSong(state){
    //console.log('asd');
    //console.log(state.song.currentSong);
    return state.song.currentSong
  },
  currentTime(state){
    return state.song.currentSong.currentTime
  },
  song(state){
    return state.song
  }
}

export default getters
