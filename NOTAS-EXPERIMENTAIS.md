# Recursos experimentais (para revisar depois)

Estes recursos são **temporários**. Decida depois se cada um fica ou sai.
Para ligar/desligar, mude `true`/`false` no objeto `EXPERIMENTAL` no topo do `script.js`.

| Chave | Padrão | O que faz | Por que existe |
|---|---|---|---|
| `travarKit` | `true` | Marcar um "Kit Completo Classe X" desmarca e bloqueia as peças avulsas daquela classe. | No site original dava para marcar o kit **e** as peças, cobrando duas vezes. |
| `historico` | `true` | SALVAR ORDEM guarda numa lista (até 100) e o botão HISTÓRICO permite reabrir ou excluir. | No original, salvar só guardava a última ordem e não havia como vê-la. |
| `barraMateriais` | `false` | Mostra a barra de materiais (Alumínio, Borracha, Cobre, Plástico, Sucata). | No original os números eram fixos em 0 — não funcionava. Desligada até ter uso real. |
| `idParaCopiar` | `true` | COPIAR também exige o Passaporte / ID. | No original o campo dizia "Obrigatório" mas COPIAR funcionava sem ele. |

Observação: o histórico fica salvo **no navegador de cada pessoa** (localStorage).
Ele não é compartilhado entre mecânicos nem enviado para lugar nenhum.

Quando decidir que um recurso fica de vez, dá para remover a opção e deixar o comportamento fixo.
Se decidir que sai, é só pôr `false` (ou apagar o código marcado com "EXPERIMENTAL").
