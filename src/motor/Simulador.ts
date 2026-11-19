import { MaquinaEventos } from './MaquinaEventos';
import { Restaurante } from '../dominio/Restaurante';

export class Simulador {
    private maquina: MaquinaEventos;
    private restaurante: Restaurante;

    constructor(caminhoConfig: string) {
        this.maquina = new MaquinaEventos();
        this.restaurante = new Restaurante();
        // TODO: Carregar JSON e inicializar o sistema
    }

    public executar(): void {
        this.maquina.processarEventos();
        this.gerarRelatorio();
    }

    private gerarRelatorio(): void {
        // TODO: Imprimir métricas exigidas
    }
}
