export class SignupRequest {
    constructor(
        public nome: string = '',
        public sobrenome: string = '',
        public email: string = '',
        public senha?: string,
        public senhaConfirmacao?: string
    ){}

    public validarSenha(): boolean{
        if(this.senha !== this.senhaConfirmacao){
            return false;
        }
        return true;
    }
}