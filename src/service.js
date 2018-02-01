import axios from 'axios';

export function getProducts() {
    return axios.get('http://localhost:4004/products').then(res => res.data)
}

export function getProduct(id) {
    return axios.get('http://localhost:4004/product/' + id).then(res => res.data)
}

export function removeProduct(id) {
    return axios.delete('http://localhost:4004/product/' + id).then(res => res.data)
}

export function addProduct(obj) {
    return axios.post('http://localhost:4004/Products', obj).then(res => res.data)
}

export function updateProduct(obj) {
    return axios.put('http://localhost:4004/updateProduct', obj).then(res => res.data)
}