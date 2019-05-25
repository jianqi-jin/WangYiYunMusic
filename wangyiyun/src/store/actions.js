const actions = {
  asnycSetListInfoId: ({commit}, id) => commit('SETLISTINFOID', id),
  asnycSetSongInfoId: ({commit}, id) => commit('SETSONGINFOID', id),
  asnycSetSongHref: ({commit}, hrefInfo) => commit('SETSONGHREF', hrefInfo),
  asnycSetCurrentTime: ({commit}, currentTime) => commit('SETCURRENTTIME', currentTime),
  asnycSetPlayFlag: ({commit}, flag) => commit('SETPLAYFLAG', flag),
  asyncSetSongsList: ({commit}, songList) => commit('SETSONGSLIST', songList),
  asyncNextSong: ({commit}, index) => commit('NEXTSONG', index),
  asyncAddSong: ({commit}, songInfo) => commit('ADDSONG', songInfo)
}
export default actions
