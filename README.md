# Calculadora — Mecânica Helmut's Garage

Calculadora de preços e ordem de serviço da Helmut's Garage.
Selecione as peças e serviços, escolha o desconto, preencha o Passaporte / ID e copie a ordem.

## Como alterar preços

Abra `script.js` e edite a seção **TABELA DE PREÇOS**:

- `preco: 200`: preço fixo
- `min: 45, max: 60`: faixa de preço (o mecânico escolhe o valor dentro da faixa)
- `qtd: true`: permite escolher quantidade

As peças por classe (D, C, B) ficam nas linhas `pecasClasse(...)`. Os pacotes Stage 1, Stage 2, Stage 3 e Kit Completo são calculados sozinhos (soma das peças incluídas). O que entra em cada Stage está nas listas `stage1`, `stage2` e `stage3` dentro de `pecasClasse`.

## Materiais

A barra acima do rodapé soma quanto de cada material a ordem precisa.
Para cadastrar, edite **RECEITAS** no `script.js`: `null` = ainda não cadastrado, `{}` = não gasta material,
`{ cobre: 2, sucata: 1 }` = gasta isso por unidade. Pacotes e combos somam as peças sozinhos.
Enquanto houver item marcado sem cadastro, a barra mostra um aviso.
A lista de materiais em si fica em **MATERIAIS**, logo acima.

## Visual de outras oficinas (Project Comunity)

Outras oficinas do servidor podem usar a calculadora com o visual delas, sem mexer no código:

1. Abra o site e clique em 🎨 no topo.
2. Troque nome, cores, logo, banner do topo e papel de parede (imagens por link `https://`).
3. Clique em **COPIAR LINK DA OFICINA** e mande o link para os mecânicos.

O visual fica todo dentro do link (depois do `#`). **Preços, itens e materiais não fazem parte do link**
e sempre vêm deste repositório. Cada oficina tem o próprio histórico de ordens no navegador.
O link sem nada depois do `#` é o visual padrão da Helmut's Garage (definido em `VISUAL_PADRAO` no `script.js`).

## Tema

O botão 🌙 / ☀️ no topo alterna o modo escuro. Sem escolha salva, o site segue o tema do sistema.

Depois de salvar e enviar para o GitHub, o site atualiza em cerca de 1 minuto.

## Recursos experimentais

Veja [NOTAS-EXPERIMENTAIS.md](NOTAS-EXPERIMENTAIS.md).
