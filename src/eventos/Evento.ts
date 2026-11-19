import { MaquinaEventos } from '../motor/MaquinaEventos';
import { Restaurante } from '../dominio/Restaurante';

export abstract class Evento {
    protected timestamp: number;
    protected maquina: MaquinaEventos;
    protected restaurante: Restaurante;

    constructor(timestamp: number, maquina: MaquinaEventos, restaurante: Restaurante) {
        this.timestamp = timestamp;
        this.maquina = maquina;
        this.restaurante = restaurante;
    }

    public getTimestamp(): number {
        return this.timestamp;
    }

    // Método polimórfico que altera o estado do Sistema e agenda novos eventos
    public abstract processarEvento(): void;
}
