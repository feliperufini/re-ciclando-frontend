import ReciclandoApiService from "./ReciclandoApiService";

export default class UserService extends ReciclandoApiService {
    async login(credentials) {
        const { data } = await this.post('/login', credentials);

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);

        const user = await this.get('/user/update');
        localStorage.setItem('id', user.data._id);

        if (user.data.avatar) {
            localStorage.setItem("avatar", user.data.avatar);
        }
    }

    async logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("avatar");
        localStorage.removeItem("token");
    }

    async signup(data) {
        return this.post('/signup', data);
    }

    async postUserCreate(data) {
        return this.post('/user/create', data);
    }

    async getUpdateProfile(userId) {
        return this.get('/user/updatesystem?id=' + userId);
    }

    async putUpdateProfile(data, userId) {
        return this.put('/user/update?id=' + userId, data);
    }
    
    async delUserDelete(userId) {
        return this.put('/user/delete?id=' + userId);
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    async getProfile() {
        return this.get('/user/update');
    }

    async getUserByEmail(email) {
        return this.get('/user/search?email=' + email);
    }

    async getSystemUsers() {
        return this.get('/user/system');
    }

    async getUsersList() {
        return this.get('/user/list');
    }

    setUserLocalStorage(data) {
        if (data.name) {
            localStorage.setItem("name", data.name);
        }
        if (data.email) {
            localStorage.setItem("email", data.email);
        }
        if (data.avatar) {
            localStorage.setItem("avatar", data.avatar);
        }
    }
}