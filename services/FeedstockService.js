import ReciclandoApiService from "./ReciclandoApiService";

export default class FeedstockService extends ReciclandoApiService {
    async getFeedstocksList() {
        return this.get('/feedstock/list');
    }

    async getFeedstockById(feedstockId) {
        return this.get(`/feedstock/search?id=` + feedstockId);
    }
}