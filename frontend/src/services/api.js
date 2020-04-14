import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http://localhost:1234',
})

export default api