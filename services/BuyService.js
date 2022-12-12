import ReciclandoApiService from "./ReciclandoApiService";

export default class BuyService extends ReciclandoApiService {
    async getBuysList() {
        return this.get('/buy/list');
    }
    
    async getBuyByUser(userId) {
        return this.get('/buy/list?id=' + userId);
    }

    async postProductBuy(data) {
        return this.post('/buy/create', data);
    }

    async putBuyDeliver(buyId) {
        return this.put('/buy/deliver?id=' + buyId);
    }
}