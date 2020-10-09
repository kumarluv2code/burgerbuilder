import axios from 'axios'
const instance = axios.create({
  baseURL : 'https://makemyburger-8a096.firebaseio.com/'
})
export default instance