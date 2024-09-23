import axios from "axios";

const URL = 'https://fakestoreapi.com';

export const fetchProducts = () => axios.get(`${URL}/products`);