import axios from 'axios';

axios.create({
    baseURL: 'https://burgerbuilder-7d0bf.firebaseio.com/'
});

export default instance;