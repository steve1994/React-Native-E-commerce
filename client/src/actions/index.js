// import axios from 'axios';
var path = require('path');

const API_URL = 'http://192.168.1.24:3002/api/'
// const API_URL = 'http://192.168.43.105:3002/api/'

// const request = axios.create({
//     baseURL: API_URL,
//     timeout: 1000
// })

// LOAD PRODUCTS

export const loadProductSuccess = (products) => ({
    type: 'LOAD_PRODUCT_SUCCESS',
    products
})

export const loadProductFailure = () => ({
    type: 'LOAD_PRODUCT_FAILURE'
})

export const loadProduct = (limit,numPage) => {
    return dispatch => {
        return fetch(`${API_URL}products/${limit}/${numPage}`)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch(loadProductSuccess(responseJson))
        })
        .catch((error) => {
            console.error(error);
            dispatch(loadProductFailure());
        })
    }
}

// LOAD NEXT PAGE

export const loadNextPageSuccess = (products) => ({
    type: 'LOAD_NEXT_PAGE_SUCCESS',
    products
})

export const loadNextPageFailure = () => ({
    type: 'LOAD_NEXT_PAGE_FAILURE'
})

export const loadNextPage = (limit,numPage) => {
    return dispatch => {
        return fetch(`${API_URL}products/${limit}/${numPage}`)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch(loadNextPageSuccess(responseJson));
        })
        .catch((error) => {
            console.error(error);
            dispatch(loadNextPageFailure());
        })
    }
}

// SAVE PRODUCTS

export const postProductSuccess = (products) => ({
    type: 'POST_PRODUCT_SUCCESS', products
})

export const postProductFailed = () => ({
    type: 'POST_PRODUCT_FAILURE'
})

export const postProduct = (title,rate,description,price,brand,detailProduct) => {
    return dispatch => {
        return fetch(`${API_URL}products`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,rate,description,price,brand,detailProduct})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return fetch(`${API_URL}products/7/1`)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(postProductSuccess(responseJson));
            })
        })
        .catch((error) => {
            console.error(error);
            dispatch(postProductFailed());
        })
    }
}

// POST IMAGE FOR PRODUCT

export const postImageSuccess = (product) => ({
    type: 'POST_IMAGE_SUCCESS', product
})

export const postImageFailed = () => ({
    type: 'POST_IMAGE_FAILURE'
})

export const postImage = (idProduct,fileImages) => {
    return dispatch => {
        for (let i=0;i<fileImages.length;i++) {
            let formData = new FormData();
            formData.append('files',fileImages[i]);
            return fetch(`${API_URL}products/upload/${idProduct}`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: formData
            })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(postImageSuccess(responseJson.data));
            })
            .catch((error) => {
                dispatch(postImageFailed());
            })
        }
    }
}

// PREVIEW DETAIL PRODUCT

export const viewProductSuccess = (product) => ({
    type: 'VIEW_PRODUCT_SUCCESS',product
})

export const viewProductFailure = () => ({
    type: 'VIEW_PRODUCT_FAILURE'
})

export const viewProduct = (idProduct) => {
    return dispatch => {
        return fetch(`${API_URL}products/${idProduct}`)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch(viewProductSuccess(responseJson.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(viewProductFailure());
        })
    }
}

// VOTE product_title

export const voteProductSuccess = (product) => ({
    type: 'VOTE_PRODUCT_SUCCESS', product
})

export const voteProductFailure = () => ({
    type: 'VOTE_PRODUCT_FAILURE'
})

export const voteProduct = (idProduct, vote) => {
    return dispatch => {
        return fetch(`${API_URL}products/${idProduct}/${vote}`,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch(voteProductSuccess(responseJson.data));
            alert('Thank you for your votes!');
        })
        .catch((error) => {
            console.error(error);
            dispatch(voteProductFailure());
        })
    }
}
