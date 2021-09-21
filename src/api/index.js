import axios from "axios";

const URL = 'https://w5tcr.sse.codesandbox.io';

export const fetchProducts = () => axios.get(`${URL}/products`);