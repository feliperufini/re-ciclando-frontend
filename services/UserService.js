import ReciclandoApiService from "./ReciclandoApiService";

export default class UserService extends ReciclandoApiService {
    async login(credentials) {
        const { data } = await this.post('/login', credentials);
        
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        
        const user = await this.get('/user/update');
        localStorage.setItem('id', user.data._id);
        localStorage.setItem('coin', user.data.coin);
        
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

    async updateProfile(data, userId) {
        if (userId) {
            return this.put(`/user/update?id=`+userId, data);
        }
        return this.put(`/user/update`, data);
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    async getProfile() {
        return this.get(`/user/update`);
    }

    async getUserByEmail(email) {
        return this.get(`/user/search?email=` + email);
    }

    getInfoUserLogged() {
        return {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }

    setUserLocalStorage(data) {
        if (data.name) {
            localStorage.setItem("name", data.name);
        }
        if (data.email) {
            localStorage.setItem("email", data.email);
        }
        if (data.coin) {
            localStorage.setItem('coin', data.coin);
        }
        if (data.avatar) {
            localStorage.setItem("avatar", data.avatar);
        }
    }
}