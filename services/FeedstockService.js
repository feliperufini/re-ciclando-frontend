import ReciclandoApiService from "./ReciclandoApiService";

export default class FeedstockService extends ReciclandoApiService {
    async getFeedstocksList() {
        return this.get('/feedstock/list');
    }

    async getFeedstockUpdate(feedstockId) {
        return this.get(`/feedstock/update?id=` + feedstockId);
    }

    async putFeedstockUpdate(data, feedstockId) {
        return this.put(`/feedstock/update?id=` + feedstockId, data);
    }

    async delFeedstockDelete(feedstockId) {
        return this.delete(`/feedstock/delete?id=` + feedstockId);
    }
}