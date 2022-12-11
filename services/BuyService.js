import ReciclandoApiService from "./ReciclandoApiService";

export default class BuyService extends ReciclandoApiService {
    async getBuyByUser(userId) {
        return this.get('/buy/list?id=' + userId);
    }

    async postProductBuy(data) {
        return this.post('/buy/create', data);
    }
}