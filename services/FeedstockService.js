import ReciclandoApiService from "./ReciclandoApiService";

export default class FeedstockService extends ReciclandoApiService {
    async getFeedstocksList() {
        return this.get('/feedstock/list');
    }
}