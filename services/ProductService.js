import ReciclandoApiService from "./ReciclandoApiService";

export default class ProductService extends ReciclandoApiService {
    async carregarPostagens(idUsuario) {
        let url = '/feed';
        if (idUsuario) {
            url += `?id=${idUsuario}`;
        }

        return this.get(url);
    }

    async adicionarComentario(idPostagem, comentario) {
        return this.put(`/comentario?id=${idPostagem}`, {
            comentario
        });
    }

    async alterarCurtida(idPostagem) {
        return this.put(`/like?id=${idPostagem}`);
    }

    async fazerPublicacao(dadosPublicacao) {
        return this.post('/publicacao', dadosPublicacao);
    }
}