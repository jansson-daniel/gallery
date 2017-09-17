import * as request from 'axios';

export const loadImages = (search) => (dispatch) => {
    return request
        .post('/images/load', { 'search': search })
        .then(({ data }) => {
            const images = data[0];
            const meta = data[1];

            images.forEach((item, i) => {
                item.collection.meta = meta[i];
            });

            console.log(images);

            dispatch({
                type: 'LOAD_IMAGES',
                payload: images
            });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const loadVideos = (search) => (dispatch) => {
    return request
        .post('/videos/load', { 'search': search })
        .then(({ data }) => {
            const videos = data[0];
            const meta = data[1];

           videos.forEach((item, i) => {
               item.collection.meta = meta[i];
           });

            dispatch({
                type: 'LOAD_VIDEOS',
                payload: videos
            });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const resetMedia = (search) => (dispatch) => {
    dispatch({
        type: 'RESET_MEDIA',
        payload: null
    });
};

export const activateLoader = () => (dispatch) => {
    dispatch({
        type: 'LOADER',
        payload: null
    });
};

export const resetLoading = () => (dispatch) => {
    dispatch({
        type: 'RESET_LOADING',
        payload: null
    });
};

export const setDetailImage = (image) => (dispatch) => {
    dispatch({
        type: 'DETAIL',
        payload: image
    });
};

export const setDetailVideo = (video) => (dispatch) => {
    dispatch({
        type: 'DETAIL_VIDEO',
        payload: video
    });
};

export const setStatus = (type) => (dispatch) => {
    dispatch({
        type: 'STATUS',
        payload: type
    });
};

export const setSearch = (search) => (dispatch) => {
    dispatch({
        type: 'SEARCH',
        payload: search
    });
};