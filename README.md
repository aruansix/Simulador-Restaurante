# SimulaRest

Simulador de eventos discretos de um restaurante, feito em TypeScript para a disciplina de Programação Orientada a Objetos (ADS, Prof. Iallen Gábio).

O simulador modela mesas, garçons e uma cozinha com 4 estações de trabalho. Ele roda uma jornada de funcionamento, calcula métricas de atendimento e aponta o gargalo da cozinha.

## Requisitos
- Node.js 20 ou superior
- npm

## Instalação
```bash
npm install
```

## Execução
```bash
npm start
```
Por padrão, a simulação lê o arquivo `configuracao.json` na raiz do projeto.

Para rodar um cenário específico, use os arquivos da pasta `cenarios/` (instruções serão adicionadas aqui quando os cenários A e B existirem).

## Arquitetura
O projeto separa três camadas:

| Camada | Pasta | Papel |
|---|---|---|
| Sistema (domínio) | `src/dominio/` | Guarda dados e protege regras. É **passivo**: não agenda eventos nem conhece o relógio. |
| Eventos e motor | `src/eventos/`, `src/motor/` | Os eventos são os agentes ativos. A `MaquinaEventos` mantém a fila ordenada por horário e avança o relógio. |
| Observação e métricas | `src/observadores/`, `src/metricas/` | Padrão Observer: acompanha a simulação e gera o relatório. |

A interface gráfica (`ui/`) fica separada e só consome dados pelo Observer.

## Estrutura de pastas
```
src/
  config/         leitura e validação do configuracao.json
  dominio/        Restaurante, Salao, Mesa, Cliente, Garcom, Cozinha, Estacao, Pedido, Prato, Cardapio
  eventos/        Evento (base) e os 8 eventos concretos
  motor/          MaquinaEventos, Simulador, GeradorAleatorio
  observadores/   IObservadorSimulacao, ColetorMetricas
  metricas/       Relatorio
cenarios/         configurações dos cenários A e B
docs/             diagrama UML, decisões de projeto e relatório
ui/               interface gráfica
```

## Decisões de projeto
Veja [`docs/decisoes.md`](docs/decisoes.md).

## Equipe
- Nome 1
- Nome 2
- Nome 3
- Nome 4

## Status
Em desenvolvimento.