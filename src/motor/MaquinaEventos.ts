import { Evento } from '../eventos/Evento';

export class MaquinaEventos {
    private filaEventos: Evento[] = [];
    private instanteAtual: number = 0;

    public adicionarEvento(evento: Evento): void {
        // TODO: Inserir evento mantendo a fila ordenada por timestamp
    }

    public processarEventos(): void {
        // TODO: Desempilhar e executar eventos avançando o relógio
    }
    
    public getInstanteAtual(): number {
        return this.instanteAtual;
    }
}
