# Calculadora — Mecânica Helmut's Garage

Calculadora de preços e ordem de serviço da Helmut's Garage.
Selecione as peças e serviços, escolha o desconto, preencha o Passaporte / ID e copie a ordem.

## Como alterar preços

Abra `script.js` e edite a seção **TABELA DE PREÇOS**:

- `preco: 200`: preço fixo
- `min: 45, max: 60`: faixa de preço (o mecânico escolhe o valor dentro da faixa)
- `qtd: true`: permite escolher quantidade

As peças por classe (D, C, B) ficam nas linhas `pecasClasse(...)`. Os pacotes Stage 1, Stage 2, Stage 3 e Kit Completo são calculados sozinhos (soma das peças incluídas). O que entra em cada Stage está nas listas `stage1`, `stage2` e `stage3` dentro de `pecasClasse`.

O botão 🌙 / ☀️ no topo alterna o modo escuro. Sem escolha salva, o site segue o tema do sistema.

Depois de salvar e enviar para o GitHub, o site atualiza em cerca de 1 minuto.

## Recursos experimentais

Veja [NOTAS-EXPERIMENTAIS.md](NOTAS-EXPERIMENTAIS.md).
