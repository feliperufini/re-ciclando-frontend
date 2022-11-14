import ReciclandoApiService from "./ReciclandoApiService";

export default class ProductService extends ReciclandoApiService {
    async search(textSearch) {
        return this.get('/product/search?filter=' + textSearch);
    }
}