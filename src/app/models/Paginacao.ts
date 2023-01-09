export class Paginacao {
  constructor(
    public totalDePaginas: number,
    public totalDeElementos: number,
    public numeroDaPagina: number,
    public numeroDeElementos: number,
    public primeira: boolean,
    public ultima: boolean,
    public elementosPorPagina: number
  ) {}
}
