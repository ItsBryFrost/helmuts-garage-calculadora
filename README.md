# Calculadora — Mecânica Helmut's Garage

Calculadora de preços e ordem de serviço da Helmut's Garage.
Selecione as peças e serviços, escolha o desconto, preencha o Passaporte / ID e copie a ordem.

## Como alterar preços

Abra `script.js` e edite a seção **TABELA DE PREÇOS**:

- `preco: 200`: preço fixo
- `min: 45, max: 60`: faixa de preço (o mecânico escolhe o valor dentro da faixa)
- `qtd: true`: permite escolher quantidade

As peças por classe (D, C, B) ficam nas linhas `pecasClasse(...)`. O Kit Completo é calculado sozinho (soma das peças).

Depois de salvar e enviar para o GitHub, o site atualiza em cerca de 1 minuto.

## Recursos experimentais

Veja [NOTAS-EXPERIMENTAIS.md](NOTAS-EXPERIMENTAIS.md).
