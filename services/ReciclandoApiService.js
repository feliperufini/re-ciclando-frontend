import axios from 'axios';

export default class ReciclandoApiService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL
        });

        this.amountRequests = 0;
        this.axios.interceptors.request.use((config) => {
            this.amountRequests++;
            // if (this.amountRequests === 1) {
            //     LoadingHelper.exibir();
            // }

            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token
            }

            return config;
        });

        this.axios.interceptors.response.use((response) => {
            this.amountRequests--;
            // if (this.amountRequests === 0) {
            //     LoadingHelper.ocultar();
            // }

            return response;
        });
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    get(url) {
        return this.axios.get(url);
    }

    put(url, data) {
        return this.axios.put(url, data);
    }
}