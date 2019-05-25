const state = {
  song: {
    currentSong: {
      playFlag:false,
      currentTime:0,
      index:-1,
      hrefInfo:{},
      title:'',
      singer:''
    },
    songList: [
      {
        index:0,
        hrefInfo:{},
        title:'',
        singer:''
      }
    ]
  },
  pageId: {
    songInfoId: 0,
    listInfoId: 0
  }
}
export default state
