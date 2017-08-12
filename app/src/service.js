import axios from 'axios';

export function getProducts() {
    return axios.get('http://localhost:4004/Products').then(res => res.data)
}


export function getProduct(id) {
    return axios.get('http://localhost:4004/product/' + id).then(res => res.data)
}

export function removeProduct(id) {
    return axios.delete('http://localhost:4004/product/' + id).then(res => res.data)
}