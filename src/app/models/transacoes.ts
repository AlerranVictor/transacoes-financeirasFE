import { Transacao } from "./transacao";

export interface Transacoes {
    receitas: Transacao[];
    despesas: Transacao[]
}