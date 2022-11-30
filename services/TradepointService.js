import ReciclandoApiService from "./ReciclandoApiService";

export default class TradepointService extends ReciclandoApiService {
    async getTradepointsList() {
        return this.get('/tradepoint/list');
    }
}