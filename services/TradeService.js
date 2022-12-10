import ReciclandoApiService from "./ReciclandoApiService";

export default class TradeService extends ReciclandoApiService {
    async getTradesByUser(userId, groupBy) {
        if (groupBy) {
            return this.get('/trade/user?id=' + userId + '&by=' + groupBy);
        }
        return this.get('/trade/user?id=' + userId);
    }

    async postTradeCreate(data) {
        return this.post('/trade/create', data);
    }
}