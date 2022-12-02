import ReciclandoApiService from "./ReciclandoApiService";

export default class TradeService extends ReciclandoApiService {
    async putTradeCreate(data) {
        return this.put('/trade/create', data);
    }
}