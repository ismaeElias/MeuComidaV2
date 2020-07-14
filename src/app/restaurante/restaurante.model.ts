export class Restaurante {

    static contador = 1;

    public id: number;
    public razaoSocial: string;
    public telefoneContato: string;
    public detalhes: string;
    public segmento: string;
    public nivelValor: string;
    public classificacao: number;
    public urlImagem: string;

    constructor(razaoSocial = '', telefoneContato: '',detalhes = '', segmento = '', nivelValor = '', classificacao = 0, urlImagem = '') {
        this.id = Restaurante.contador++;
        this.telefoneContato = telefoneContato;
        this.razaoSocial = razaoSocial;
        this.detalhes = detalhes;
        this.segmento = segmento;
        this.nivelValor = nivelValor;
        this.classificacao = classificacao;
        this.urlImagem = urlImagem;
    }

    
}