import axios from "axios"

const $http = axios.create({
    // baseURL: 'http://localhost:8080/',
    baseURL: './mock/',
    timeout: 1000,
    // headers: {'x-custom-header': 'foobar'}
})

export default $http
