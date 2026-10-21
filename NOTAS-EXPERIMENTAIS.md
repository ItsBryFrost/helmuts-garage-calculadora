# Recursos experimentais (para revisar depois)

Estes recursos são **temporários**. Decida depois se cada um fica ou sai.
Para ligar/desligar, mude `true`/`false` no objeto `EXPERIMENTAL` no topo do `script.js`.

| Chave | Padrão | O que faz | Por que existe |
|---|---|---|---|
| `travarKit` | `true` | Combos e pacotes (Stages, Kit Completo, Lataria + Motor) não podem ser marcados junto com os itens que incluem, **nos dois sentidos**: o pacote bloqueia as peças, e uma peça avulsa bloqueia os pacotes que a incluem. | No site original dava para marcar o kit **e** as peças, cobrando duas vezes. |
| `historico` | `true` | SALVAR ORDEM guarda numa lista (até 100) e o botão HISTÓRICO permite reabrir ou excluir. | No original, salvar só guardava a última ordem e não havia como vê-la. |
| `idParaCopiar` | `true` | COPIAR também exige o Passaporte / ID. | No original o campo dizia "Obrigatório" mas COPIAR funcionava sem ele. |

A antiga opção `barraMateriais` saiu daqui: a barra de materiais agora é um recurso fixo, que soma os materiais da ordem (veja `RECEITAS` no `script.js`).

Observação: o histórico fica salvo **no navegador de cada pessoa** (localStorage).
Ele não é compartilhado entre mecânicos nem enviado para lugar nenhum.

Quando decidir que um recurso fica de vez, dá para remover a opção e deixar o comportamento fixo.
Se decidir que sai, é só pôr `false` (ou apagar o código marcado com "EXPERIMENTAL").
