const mutations = {
  INCREMENT (state) {
    state.count = state.count + 5
  },
  SETLISTINFOID(state, id){
    state.pageId.listInfoId = id
  },
  SETSONGINFOID(state, id){
    state.pageId.songInfoId = id
  },
  SETSONGHREF(state, hrefInfo){
    state.song.currentSong.hrefInfo = hrefInfo
  },
  SETCURRENTTIME(state, currentTime){
    state.song.currentSong.currentTime = currentTime
  },
  SETPLAYFLAG(state, flag){
    state.song.currentSong.playFlag = flag
  },
  SETSONGSLIST(state, songList) {
    state.song.songList = songList;
    state.song.currentSong.id = songList[0].id;
    state.song.currentSong.index = 0;
    state.song.currentSong.hrefInfo = {
      url:'http://music.163.com/song/media/outer/url?id='+songList[0].id+'.mp3'
    };
  },
  NEXTSONG(state, index) {
    state.song.currentSong.playFlag = false
    var temp_index = state.song.currentSong.index + index;
    if(temp_index < 0 || temp_index > state.song.songList.length)
      return
    state.song.currentSong.index += index;
    state.song.currentSong.hrefInfo = {
      url:'http://music.163.com/song/media/outer/url?id='+state.song.songList[state.song.currentSong.index].id+'.mp3'
    };
    state.song.currentSong.id = state.song.songList[state.song.currentSong.index].id;
    setTimeout(function() {
      state.song.currentSong.playFlag = true;
    }, 1000);
  },
  _UPDATESONGINDEX(state, index) {
    state.song.currentSong = state.song.songList[index];
  }
}

export default mutations
