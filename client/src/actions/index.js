import axios from 'axios';
var path = require('path');

const API_URL = 'http://localhost:3002/api/'

const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
})

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
        return request.get(`products/${limit}/${numPage}`)
        .then(function(response) {
            dispatch(loadProductSuccess(response.data));
        })
        .catch(function(error) {
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
        return request.get(`products/${limit}/${numPage}`)
        .then(function(response) {
            dispatch(loadNextPageSuccess(response.data));
        })
        .catch(function(error) {
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
        return request.post('products',{title,rate,description,price,brand,detailProduct})
        .then(function(response) {
            // let idProduct = response.data.data._id;
            // let formData = new FormData();
            // formData.append('files',imageProduct);
            // return request.put(`products/upload/${idProduct}`,formData)
            // .then(function(response) {
                return request.get('products/7/1')
                .then(function(response) {
                    dispatch(postProductSuccess(response.data));
                })
            // })
        })
        .catch(function(error) {
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
            return request.put(`products/upload/${idProduct}`,formData)
            .then(function(response) {
                dispatch(postImageSuccess(response.data.data));
            })
            .catch(function(error) {
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
        return request.get(`products/${idProduct}`)
        .then(function(response) {
            dispatch(viewProductSuccess(response.data.data));
        })
        .catch(function(error) {
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
        return request.put(`products/${idProduct}/${vote}`)
        .then(function(response) {
            dispatch(voteProductSuccess(response.data.data));
            alert('Thank you for your votes!');
        })
        .catch(function (error) {
            console.error(error);
            dispatch(voteProductFailure());
        })
    }
}
