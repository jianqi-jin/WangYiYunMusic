import axios from 'axios'

export function search (data) {
  const url = './api/test'
  console.log(data)
  return axios.get(url, {
    params: {
      data:data
    }
  }).then((res) => {
    console.log(res.data)
    return res.data
  })
}

export function getPlayList () {
  const url = './api/getPlayList'
  return axios.get(url).then((res) => {
    return res.data
  })
}


export function getListInfo(id){
  const url='./api/getListInfo'
  return axios.get(url, {
    params:{
      id
    }
  }).then((res) => {
    return res
  })
}

export function getSongInfo(id){
  const url = './api/getSongInfo'
  return axios.get(url, {
    params:{
      id
    }
  }).then((res) => {
    return res
  })
}

export function getSongLyric(id){
  const url = './api/getSongLyric'
  return axios.get(url, {
    params:{
      id
    }
  }).then((res) => {
    //console.log(res)
    return res
  })
}
export function getSongHref(id){
  const url = './api/getSongHref'
  return axios.get(url, {
    params:{
      id
    }
  }).then((res) => {
    //console.log(res)
    return res
  })
}
