export class TransacaoRequest {
    private tipo: string;
    private descricao: string;
    private data: Date;
    private valor: Number;

    constructor(tipo: string, descricao: string, data: Date, valor: Number) {
        this.tipo = tipo;
        this.descricao = descricao;
        this.data = data;
        this.valor = valor;
    }
}