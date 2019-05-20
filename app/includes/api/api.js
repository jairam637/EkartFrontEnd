// import axios from 'axios';

// export default axios.create({
//   baseURL: process.env.API_URL,
//   headers: { common: { 'Access-Control-Allow-Origin': '*' }, },
// });



import axios from 'axios';
// import apiURL from './../constants';
let token = localStorage.getItem('TOKEN');
const axiosAPI =  
token ? 
axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: { common: { key:  token,
  'Access-Control-Allow-Origin': '*' }, },
})
:
axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { common: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }, },
  
});
export default axiosAPI;