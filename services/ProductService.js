import ReciclandoApiService from "./ReciclandoApiService";

export default class ProductService extends ReciclandoApiService {
    async search(textSearch) {
        return this.get('/product/search?filter=' + textSearch);
    }

    async getProductsList() {
        return this.get('/product/list');
    }

    async getProductsListAvailable() {
        return this.get('/product/available');
    }

    async getProductData(productId) {
        return this.get('/product/update?productId=' + productId);
    }

    async postProductBuy(data) {
        return this.post('/buy/create', data);
    }
}