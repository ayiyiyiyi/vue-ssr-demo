import axios from 'axios'

export function fetchItem(time) {
    return axios.get(`https://www.mydiae.xyz/catalog?filename=${time}`)
}