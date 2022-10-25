import ReciclandoApiService from "./ReciclandoApiService";

export default class UserService extends ReciclandoApiService {
    async login(credentials) {
        console.log(credentials);
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
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("avatar");
    }

    async register(dados) {
        return this.post('/register', dados);
    }

    async updateProfile(dados) {
        return this.put(`/user`, dados);
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    async search(textSearch) {
        return this.get('/search?filter=' + textSearch);
    }

    async getProfile(idUser) {
        return this.get(`/search?id=${idUser}`);
    }

    getInfoUserLogged() {
        return {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }
}