import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL, // Adjust the port as needed
});

export const getMusicByCategory = (category) => {
    return instance.get(`/music/Category/${category}`);
  };

export const getMusic = (id) => {
    return instance.get(`/music/id/${id}`);
  };