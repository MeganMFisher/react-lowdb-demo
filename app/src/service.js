import axios from 'axios';

export function getProducts() {
    return axios.get('http://localhost:4004/Products').then(res => res.data)
}
