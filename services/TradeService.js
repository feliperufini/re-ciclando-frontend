import ReciclandoApiService from "./ReciclandoApiService";

export default class TradeService extends ReciclandoApiService {
    async putTradesCreate() {
        return this.put('/trade/create');
    }
}