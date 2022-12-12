import ReciclandoApiService from "./ReciclandoApiService";

export default class TradepointService extends ReciclandoApiService {
    async getTradepointsList() {
        return this.get('/tradepoint/list');
    }

    async postTradepointCreate(data) {
        return this.post('/tradepoint/create', data);
    }

    async getTradepointUpdate(tradepointId) {
        return this.get('/tradepoint/updatesystem?id=' + tradepointId);
    }

    async putTradepointUpdate(data, tradepointId) {
        return this.put(`/tradepoint/update?id=` + tradepointId, data);
    }

    async delTradepointDelete(tradepointId) {
        return this.delete(`/tradepoint/delete?id=` + tradepointId);
    }
}