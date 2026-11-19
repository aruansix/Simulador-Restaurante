# Decisões de Projeto (SimulaRest)

Este arquivo registra as decisões combinadas pelo grupo. Antes de escrever código, cada ponto abaixo precisa ser discutido e marcado como **Confirmado**. Se algo mudar depois, atualize aqui e avise o grupo.

**Status:** `[ ] pendente` / `[x] confirmado`

---

## 1. Unidade de tempo
**Proposta:** minutos, com números decimais (o `configuracao.json` já usa `1.5`, `0.5` etc.).
- Todo `timestamp` de evento é em minutos desde o início da simulação.
- Conversões (segundos para minutos) acontecem só na leitura da configuração.

`[ ]` Confirmado

## 2. Como o evento acessa o gerador aleatório e a configuração
Hoje o construtor é `Evento(timestamp, maquina, restaurante)`. Os eventos precisam sortear tempos (decisão, consumo, espera) e ler parâmetros (T_anotar, N_desistência etc.).

- **Opção A (recomendada):** um 4º parâmetro, um objeto `ContextoSimulacao` com `configuracao` e `aleatorio`. O domínio continua sem conhecer nenhum dos dois.
- **Opção B:** passar `configuracao` e `aleatorio` como dois parâmetros separados no construtor.
- **Evitar:** guardar o gerador dentro do `Restaurante`, porque mistura sorteio (tempo) com o domínio passivo.

**Regra:** todo sorteio passa pelo `GeradorAleatorio` (com semente). Nunca usar `Math.random()`.

`[ ]` Confirmado. Escolhida: ____

## 3. Estados de Cliente e Mesa
**Proposta:** `enum` para os estados, mais uma tabela de transições permitidas dentro de cada classe. Uma mudança inválida lança erro.
- Mesa: Livre e Ocupada.
- Cliente: os 8 estados do enunciado.
- O enunciado aceita "padrão State **ou** máquina de estados", então o enum com validação é suficiente e mais simples de explicar na defesa.
- Se o grupo preferir classes de estado, os arquivos já existem em `dominio/estados/`.

`[ ]` Confirmado. Escolhida: ____

## 4. Como as métricas chegam ao `ColetorMetricas`
**Proposta:**
- O **domínio acumula** os números que só ele sabe (tempo em fila e tamanho máximo da fila na `Estacao`, tempo ocupado no `Garcom`, espera na bancada na `Cozinha`) e expõe por getters.
- O **`ColetorMetricas`** conta o que acontece pelo Observer e, no fim, lê os getters para montar o `Relatorio`.
- Os eventos não conhecem o coletor. Quem notifica os observadores é o `Simulador`, pelo callback de `processarEventos`.

`[ ]` Confirmado

## 5. Fim da simulação
**Proposta:** ao chegar em `tempoSimulacaoMinutos`, a `ChegadaCliente` deixa de agendar novas chegadas, mas a simulação continua até todos os clientes saírem (a fila de eventos esvazia).
- Assim "atendidos" e "tempo médio de permanência" não ficam distorcidos por clientes cortados no meio.
- A regra deve aparecer no README e no relatório.

`[ ]` Confirmado. Dúvida para o professor: esta regra é aceita?

## 6. Perdas e desistências
**Proposta:** o `Restaurante` guarda os contadores (cliente perdido por falta de mesa, desistente por falta de garçom) e expõe por getters. O coletor lê no fim.

`[ ]` Confirmado

## 7. Padrão de nomes e organização
- Português, `camelCase` para métodos e atributos, `PascalCase` para classes.
- Um arquivo por classe, com o mesmo nome da classe (`Estacao.ts`).
- **Pastas sempre em minúsculo** (evita erro de maiúsculas e minúsculas entre Windows, Mac e Linux no Git).
- Atributos `private` por padrão, com getters. Coleções nunca são devolvidas diretamente (devolver `readonly` ou cópia).
- Sem `any`.

`[ ]` Confirmado

---

## Regras de arquitetura (já definidas pelo enunciado)
1. **Nada dentro de `src/dominio/` importa de `src/motor/` ou `src/eventos/`.** O domínio é 100% passivo: sem timers, sem agendar eventos, sem relógio.
2. **O Core não usa DOM** (`document`, `window`). Ele roda pelo terminal.
3. **A interface (`ui/`)** só recebe dados pelo Observer e nunca altera o Core.

## Regras de trabalho em grupo
- Cada pessoa trabalha em uma branch própria (`feature/nome-da-parte`).
- Pull request com pelo menos uma pessoa revisando antes de entrar na `main`.
- Commits pequenos, com mensagem curta e clara (ex.: `feat: adiciona fila FIFO na Estacao`).
- Na integração, cada pessoa explica a sua parte para o grupo. Todos precisam saber explicar qualquer trecho (defesa oral individual).

## Dúvidas para o professor
- [ ] O cliente que sai irritado conta como "atendido com sucesso"?
- [ ] Parar as chegadas no fim do tempo e deixar os clientes terminarem (decisão 5) é aceito?

## Responsáveis
| Parte | Pessoa |
|---|---|
| Salão, clientes e garçons | ____ |
| Cozinha e pratos | ____ |
| Motor, configuração e integração | ____ |
| Métricas, interface e documentação | ____ |