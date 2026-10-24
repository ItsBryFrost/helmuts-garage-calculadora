// ================= CONFIGURAÇÃO =================

const DESCONTOS = [0, 5, 10, 15, 20, 25];

// Visual padrão (Helmut's Garage). Outras oficinas trocam SÓ o visual pelo link
// gerado no botão 🎨 — preços, materiais e itens vêm sempre deste arquivo.
const VISUAL_PADRAO = {
  prefixo: "MECÂNICA",
  nome: "HELMUT'S GARAGE",
  cor: "#996127",  // cor principal (botões, preços, destaques)
  topo: "#4b535b", // cor do topo
  logo: "",        // link de imagem (https://…)
  banner: "",      // imagem de fundo do topo
  fundo: ""        // papel de parede da página
};
// Letra usada no link para cada campo (ex.: #n=BENNYS&c=e63946).
const CHAVES_LINK = { prefixo: "p", nome: "n", cor: "c", topo: "t", logo: "l", banner: "b", fundo: "f" };

// Recursos experimentais (temporários) — ver NOTAS-EXPERIMENTAIS.md.
// Troque true/false para ligar ou desligar cada um.
const EXPERIMENTAL = {
  travarKit: true,   // combos/pacotes não podem ser marcados junto com os itens que incluem (nos dois sentidos)
  historico: true,   // ordens salvas vão para uma lista que pode ser reaberta ou excluída
  idParaCopiar: true // COPIAR também exige Passaporte / ID
};

// ================= TABELA DE PREÇOS =================
// preco: valor fixo
// min / max: faixa de preço — o mecânico escolhe quanto cobrar dentro da faixa
// qtd: true permite escolher quantidade
// kit: ["id1", "id2"] — combo: não dá para marcar o combo junto com os itens listados (nos dois sentidos)
// indisponivel: true — aparece como "EM BREVE" e não pode ser marcado (quando chegar, troque por um preço)

function pecasClasse(letra, p) {
  const c = letra.toLowerCase();
  const nome = n => `${n} (Classe ${letra})`;
  const pecas = [
    { id: `${c}-freio`, nome: nome("Freio"), preco: p.freioSuspensao },
    { id: `${c}-suspensao`, nome: nome("Suspensão"), preco: p.freioSuspensao },
    { id: `${c}-ecu`, nome: nome("ECU"), preco: p.ecu },
    { id: `${c}-filtro`, nome: nome("Filtro de Ar"), preco: p.filtro },
    { id: `${c}-escape`, nome: nome("Escape"), preco: p.escape },
    { id: `${c}-coletor`, nome: nome("Coletor"), preco: p.coletor },
    { id: `${c}-combustivel`, nome: nome("Combustível"), preco: p.combustivel },
    { id: `${c}-turbo`, nome: nome("Turbo"), preco: p.turbo },
    { id: `${c}-intercooler`, nome: nome("Intercooler"), preco: p.intercooler },
    { id: `${c}-embreagem`, nome: nome("Embreagem"), preco: p.embreagem }
  ];

  // Pacotes: custam a soma das peças incluídas (sem desconto embutido).
  // "inclui" é o texto mostrado no card e na ordem copiada.
  const pacote = (id, titulo, partes, inclui) => ({
    id: `${c}-${id}`,
    nome: `${titulo} (Classe ${letra})`,
    preco: partes.reduce((s, x) => s + pecas.find(pc => pc.id === `${c}-${x}`).preco, 0),
    kit: partes.map(x => `${c}-${x}`),
    inclui
  });

  const stage1 = ["ecu"];
  const stage2 = [...stage1, "filtro", "escape"];
  const stage3 = [...stage2, "coletor", "combustivel", "turbo", "intercooler", "embreagem"];
  const todas = pecas.map(x => x.id.slice(c.length + 1));

  return {
    nome: `PEÇAS CLASSE ${letra}`,
    itens: [
      ...pecas,
      pacote("stage1", "⚡ Stage 1", stage1, "ECU"),
      pacote("stage2", "⚡ Stage 2", stage2, "Stage 1 + Filtro de Ar Esportivo, Escape Completo Esportivo"),
      pacote("stage3", "⚡ Stage 3", stage3, "Stage 1 e 2 + Coletor de Admissão, Sistema de Combustível Aprimorado, Upgrade de Turbo, Intercooler, Embreagem de Corrida"),
      pacote("kit", "🔶 Kit Completo", todas, "Stage 3 + Freio e Suspensão")
    ]
  };
}

const CATEGORIAS = [
  {
    nome: "SERVIÇOS GERAIS",
    itens: [
      { id: "lataria", nome: "Reparo de Lataria", preco: 60 },
      { id: "motor", nome: "Reparo de Motor", preco: 130 },
      { id: "lataria-motor", nome: "Reparo de Lataria + Motor", preco: 190, kit: ["lataria", "motor"] },
      { id: "oleo", nome: "Troca de Óleo", preco: 35 }
    ]
  },
  pecasClasse("D", { freioSuspensao: 180, ecu: 360, filtro: 360, escape: 180, coletor: 90, combustivel: 90, turbo: 270, intercooler: 180, embreagem: 180 }),
  pecasClasse("C", { freioSuspensao: 270, ecu: 540, filtro: 540, escape: 270, coletor: 135, combustivel: 135, turbo: 415, intercooler: 270, embreagem: 270 }),
  pecasClasse("B", { freioSuspensao: 360, ecu: 720, filtro: 720, escape: 360, coletor: 180, combustivel: 180, turbo: 540, intercooler: 360, embreagem: 360 }),
  {
    nome: "REPAROS PEÇAS",
    itens: [
      { id: "rep-freio", nome: "Reparo de Freio", preco: 110, qtd: true },
      { id: "rep-suspensao", nome: "Reparo de Suspensão", preco: 110, qtd: true },
      { id: "rep-ecu", nome: "Reparo de ECU", preco: 90, qtd: true },
      { id: "rep-filtro", nome: "Reparo de Filtro de Ar", preco: 110, qtd: true },
      { id: "rep-escape", nome: "Reparo de Escape", preco: 100, qtd: true },
      { id: "rep-coletor", nome: "Reparo de Coletor", preco: 140, qtd: true },
      { id: "rep-combustivel", nome: "Reparo de Combustível", preco: 140, qtd: true },
      { id: "rep-turbo", nome: "Reparo de Turbo", preco: 100, qtd: true },
      { id: "rep-intercooler", nome: "Reparo de Intercooler", preco: 140, qtd: true },
      { id: "rep-embreagem", nome: "Reparo de Embreagem", preco: 140, qtd: true }
    ]
  },
  {
    nome: "ESTÉTICA",
    itens: [
      { id: "pintura", nome: "Pintura", preco: 200 },
      { id: "rodas", nome: "Rodas", preco: 215 },
      { id: "aerofolio", nome: "Aerofólio", preco: 150 },
      { id: "parachoque-dianteiro", nome: "Para-Choque Dianteiro", preco: 150 },
      { id: "parachoque-traseiro", nome: "Para-Choque Traseiro", preco: 150 },
      { id: "peca-estetica", nome: "Peça Estética", preco: 150, qtd: true }
    ]
  },
  {
    nome: "NITRO",
    itens: [
      { id: "nitro-garrafa", nome: "Garrafa Nitro Pequena", preco: 400, qtd: true },
      { id: "nitro-garrafa-grande", nome: "Garrafa Nitro Grande", indisponivel: true },
      { id: "nitro-refil", nome: "Refil Nitro (Qualquer Tamanho)", preco: 70, qtd: true }
    ]
  },
  {
    nome: "REBOQUE",
    itens: [
      { id: "reboque", nome: "Reboque", preco: 100 }
    ]
  },
  {
    nome: "OUTROS",
    itens: [
      { id: "lockpick", nome: "Lockpick", preco: 60, qtd: true },
      { id: "lockpick-avancada", nome: "Lockpick Avançada", preco: 120, qtd: true },
      { id: "kit-reparo-motor", nome: "Kit de Reparo de Motor", preco: 265, qtd: true },
      { id: "pneu", nome: "Pneu de Veículo", indisponivel: true } // sem preço ainda — quando tiver: preco: X, qtd: true
    ]
  }
];

// ================= MATERIAIS =================
// Lista de materiais mostrada na barra de baixo.
const MATERIAIS = [
  { id: "aluminio", nome: "Alumínio", icone: "🔩" },
  { id: "aco", nome: "Aço", icone: "⛓️" },
  { id: "borracha", nome: "Borracha", icone: "🛞" },
  { id: "cobre", nome: "Cobre", icone: "⚡" },
  { id: "componente", nome: "Componente", icone: "🔌" },
  { id: "oleo-motor", nome: "Óleo de Motor", icone: "🛢️" },
  { id: "plastico", nome: "Plástico", icone: "🧪" },
  { id: "sucata", nome: "Sucata", icone: "📦" }
];

// Quanto de cada material um item gasta (por unidade).
//   null           → ainda não cadastrado (aparece o aviso na barra)
//   {}             → não gasta material
//   { cobre: 2 }   → gasta 2 de Cobre (só escreva os materiais que usa)
// Pacotes (Stages, Kit Completo) e combos (Lataria + Motor) somam as peças sozinhos — não precisam estar aqui.
const RECEITAS = {
  // Serviços Gerais
  "lataria": { sucata: 2, aluminio: 2 },          // Reparo de Lataria
  "motor": { sucata: 5, cobre: 3, aluminio: 2 },  // Reparo de Motor
  "oleo": { "oleo-motor": 1 },                     // Troca de Óleo

  // Peças Classe D
  "d-freio": { aluminio: 10, aco: 10 },
  "d-suspensao": { aluminio: 10, aco: 10 },
  "d-ecu": { componente: 20, plastico: 10, aluminio: 10 },
  "d-filtro": { aluminio: 10, aco: 10, borracha: 10, sucata: 10 },
  "d-escape": { aco: 20 },
  "d-coletor": { aco: 10 },
  "d-combustivel": { aluminio: 10 },
  "d-turbo": { aluminio: 15, aco: 15 },
  "d-intercooler": { aluminio: 20 },
  "d-embreagem": { aco: 20 },

  // Peças Classe C
  "c-freio": { aluminio: 15, aco: 15 },
  "c-suspensao": { aluminio: 15, aco: 15 },
  "c-ecu": { componente: 30, plastico: 15, aluminio: 15 },
  "c-filtro": { aluminio: 15, aco: 15, borracha: 15, sucata: 15 },
  "c-escape": { aco: 30 },
  "c-coletor": { aco: 15 },
  "c-combustivel": { aluminio: 15 },
  "c-turbo": { aluminio: 23, aco: 23 },
  "c-intercooler": { aluminio: 30 },
  "c-embreagem": { aco: 30 },

  // Peças Classe B
  "b-freio": { aluminio: 20, aco: 20 },
  "b-suspensao": { aluminio: 20, aco: 20 },
  "b-ecu": { componente: 40, plastico: 20, aluminio: 20 },
  "b-filtro": { aluminio: 20, aco: 20, borracha: 20, sucata: 20 },
  "b-escape": { aco: 40 },
  "b-coletor": { aco: 20 },
  "b-combustivel": { aluminio: 20 },
  "b-turbo": { aluminio: 30, aco: 30 },
  "b-intercooler": { aluminio: 40 },
  "b-embreagem": { aco: 40 },

  // Reparos Peças
  "rep-freio": { sucata: 3, borracha: 2 },
  "rep-suspensao": { sucata: 3, borracha: 2 },
  "rep-ecu": { cobre: 3, plastico: 2, sucata: 2 },
  "rep-filtro": { borracha: 3, plastico: 3, aluminio: 3 },
  "rep-escape": { sucata: 4, aluminio: 4 },
  "rep-coletor": { aluminio: 4, cobre: 4, sucata: 4 },
  "rep-combustivel": { aluminio: 4, cobre: 4, sucata: 4 },
  "rep-turbo": { sucata: 4, aluminio: 4 },
  "rep-intercooler": { aluminio: 4, cobre: 4, sucata: 4 },
  "rep-embreagem": { sucata: 4, aluminio: 4, borracha: 4 },

  // Estética
  "pintura": { aluminio: 5, plastico: 5 },
  "rodas": { aluminio: 20 },
  "aerofolio": { aluminio: 5 },
  "parachoque-dianteiro": { aluminio: 5 },
  "parachoque-traseiro": { aluminio: 5 },
  "peca-estetica": { aluminio: 3, plastico: 2 },

  // Nitro
  "nitro-garrafa": null,        // Garrafa Nitro Pequena
  "nitro-garrafa-grande": null, // Garrafa Nitro Grande (em breve)
  "nitro-refil": null,          // Refil Nitro

  // Reboque
  "reboque": {}, // serviço, não gasta material

  // Outros
  "lockpick": { aluminio: 3, aco: 2 },
  "lockpick-avancada": { aluminio: 9, aco: 6 },
  "kit-reparo-motor": { plastico: 10, aluminio: 20 }, // Kit de Reparo de Motor (cliente leva para consertar o motor na rua)
  "pneu": { borracha: 5 }                              // Pneu de Veículo (em breve)
};

// ================= LÓGICA =================

const $ = id => document.getElementById(id);
const tabsEl = $("tabs");
const itemsEl = $("items");
const searchEl = $("search");
const discountEl = $("discount");
const clientNameEl = $("clientName");
const passportEl = $("passport");

const ITENS = new Map(); // id -> { item, categoria }
CATEGORIAS.forEach(cat => cat.itens.forEach(item => ITENS.set(item.id, { item, categoria: cat.nome })));

let abaAtual = CATEGORIAS[0].nome;
const selecao = new Map(); // id -> { qtd, preco }
let toastTimer;

const money = v => "$" + Math.round(v).toLocaleString("pt-BR");
const ehFaixa = item => item.preco == null;
const precoPadrao = item => (ehFaixa(item) ? item.min : item.preco);
const limitar = (item, v) => (ehFaixa(item) ? Math.min(item.max, Math.max(item.min, v)) : item.preco);

// Materiais de 1 unidade do item: { mat: { cobre: 2, ... }, faltando: true se algo ainda não foi cadastrado }.
// Pacotes/combos sem receita própria somam as receitas das peças.
function materiaisDe(item) {
  const receita = RECEITAS[item.id];
  if (receita) return { mat: { ...receita }, faltando: false };
  if (!item.kit) return { mat: {}, faltando: true };
  const mat = {};
  let faltando = false;
  item.kit.forEach(id => {
    const parte = materiaisDe(ITENS.get(id).item);
    faltando = faltando || parte.faltando;
    for (const [m, n] of Object.entries(parte.mat)) mat[m] = (mat[m] || 0) + n;
  });
  return { mat, faltando };
}

const textoMateriais = mat =>
  MATERIAIS.filter(m => mat[m.id]).map(m => `${m.icone} ${mat[m.id]}`).join("  ");

function renderMateriais() {
  const total = {};
  let semCadastro = 0;
  for (const [id, s] of selecao) {
    const item = ITENS.get(id)?.item;
    if (!item) continue;
    const { mat, faltando } = materiaisDe(item);
    if (faltando) semCadastro++;
    for (const [m, n] of Object.entries(mat)) total[m] = (total[m] || 0) + n * s.qtd;
  }

  const el = $("materials");
  el.innerHTML = "";
  const titulo = document.createElement("span");
  titulo.className = "materials-title";
  titulo.textContent = "MATERIAIS";
  el.appendChild(titulo);

  MATERIAIS.forEach(m => {
    const chip = document.createElement("div");
    chip.className = "mat-chip" + (total[m.id] ? " has" : "");
    chip.append(`${m.icone} ${m.nome}: `);
    const b = document.createElement("b");
    b.textContent = total[m.id] || 0;
    chip.appendChild(b);
    el.appendChild(chip);
  });

  if (semCadastro) {
    const aviso = document.createElement("div");
    aviso.className = "mat-chip warn";
    aviso.textContent = `⚠ ${semCadastro} ${semCadastro === 1 ? "item" : "itens"} sem materiais cadastrados`;
    aviso.title = "Preencha esses itens em RECEITAS no script.js";
    el.appendChild(aviso);
  }
}

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// Peças que um item representa: um combo/pacote é a lista do kit, um item comum é ele mesmo.
const partes = item => item.kit || [item.id];

// O pacote cobre o item se todas as peças do item estão dentro dele (ex.: Stage 3 cobre ECU e Stage 1).
const cobre = (pacote, item) => pacote.id !== item.id && !!pacote.kit && partes(item).every(p => pacote.kit.includes(p));

// Itens selecionados que impedem marcar este (só com EXPERIMENTAL.travarKit).
// Vale nos dois sentidos: um pacote bloqueia suas peças, e uma peça avulsa bloqueia os pacotes que a incluem.
function conflitos(item) {
  if (!EXPERIMENTAL.travarKit || selecao.has(item.id)) return [];
  const minhas = partes(item);
  return [...selecao.keys()]
    .map(id => ITENS.get(id)?.item)
    .filter(outro => outro && partes(outro).some(p => minhas.includes(p)));
}

const semEmoji = nome => nome.replace(/^[^\p{L}]+\s/u, "");

function textoBloqueio(item, lista) {
  const pacote = lista.find(o => cobre(o, item));
  if (pacote) return `incluído no ${semEmoji(pacote.nome)}`;
  const nomes = lista.map(o => semEmoji(o.nome));
  return `desmarque ${nomes.slice(0, 2).join(", ")}${nomes.length > 2 ? ` +${nomes.length - 2}` : ""} para usar`;
}

function renderTabs() {
  tabsEl.innerHTML = "";
  CATEGORIAS.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "tab" + (cat.nome === abaAtual && !searchEl.value.trim() ? " active" : "");
    btn.textContent = cat.nome;
    const n = cat.itens.filter(i => selecao.has(i.id)).length;
    if (n) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = n;
      btn.appendChild(badge);
    }
    btn.onclick = () => {
      abaAtual = cat.nome;
      searchEl.value = "";
      render();
    };
    tabsEl.appendChild(btn);
  });
}

// Funções que reaplicam o estado (marcado / bloqueado) em cada card visível.
let syncCards = [];

function criarCard(item, categoria, buscando) {
  const card = document.createElement("label");
  card.className = "item";

  const check = document.createElement("input");
  check.type = "checkbox";

  const info = document.createElement("span");
  info.className = "item-info";
  const nome = document.createElement("span");
  nome.className = "item-name";
  nome.textContent = item.nome;
  const sub = document.createElement("span");
  sub.className = "item-sub";
  info.append(nome, sub);
  card.append(check, info);

  const notasFixas = [];
  if (buscando) notasFixas.push(categoria);
  if (item.inclui) notasFixas.push(`Inclui: ${item.inclui}`);

  // Item que ainda vai chegar: aparece na lista, mas não pode ser marcado.
  if (item.indisponivel) {
    card.classList.add("unavailable");
    check.disabled = true;
    sub.textContent = [...notasFixas, "indisponível no momento"].join(" · ");
    const tag = document.createElement("span");
    tag.className = "soon";
    tag.textContent = "EM BREVE";
    card.appendChild(tag);
    return { card, sync: () => {} };
  }

  if (ehFaixa(item)) notasFixas.push(`faixa ${money(item.min)} – ${money(item.max)}`);
  const mat = textoMateriais(materiaisDe(item).mat);
  if (mat) notasFixas.push(mat);

  let precoInput, qtdInput;
  const precoAtual = () => limitar(item, Number(precoInput?.value) || precoPadrao(item));

  if (ehFaixa(item)) {
    const wrap = document.createElement("span");
    wrap.className = "price-wrap";
    wrap.textContent = "$";
    precoInput = document.createElement("input");
    precoInput.type = "number";
    precoInput.className = "price-input";
    precoInput.min = item.min;
    precoInput.max = item.max;
    precoInput.step = "1";
    precoInput.title = "Valor cobrado";
    precoInput.addEventListener("change", () => {
      const v = precoAtual();
      precoInput.value = v;
      const s = selecao.get(item.id) || { qtd: 1 };
      s.preco = v;
      selecao.set(item.id, s);
      atualizar();
    });
    wrap.appendChild(precoInput);
    card.appendChild(wrap);
  } else {
    const preco = document.createElement("span");
    preco.className = "item-price";
    preco.textContent = money(item.preco);
    card.appendChild(preco);
  }

  if (item.qtd) {
    qtdInput = document.createElement("input");
    qtdInput.className = "qty";
    qtdInput.type = "number";
    qtdInput.min = "0";
    qtdInput.step = "1";
    qtdInput.title = "Quantidade";
    qtdInput.addEventListener("input", () => {
      const v = Math.max(0, parseInt(qtdInput.value || "0", 10) || 0);
      if (v > 0) {
        const s = selecao.get(item.id) || { preco: precoAtual() };
        s.qtd = v;
        selecao.set(item.id, s);
      } else {
        selecao.delete(item.id);
      }
      atualizar();
    });
    card.appendChild(qtdInput);
  }

  check.addEventListener("change", () => {
    if (check.checked) selecao.set(item.id, { qtd: 1, preco: precoAtual() });
    else selecao.delete(item.id);
    atualizar();
  });

  function sync() {
    const sel = selecao.get(item.id);
    const bloq = conflitos(item);
    const travado = bloq.length > 0;
    card.classList.toggle("selected", !!sel);
    card.classList.toggle("locked", travado);
    check.checked = !!sel;
    check.disabled = travado;
    if (precoInput) {
      precoInput.disabled = travado;
      if (document.activeElement !== precoInput) precoInput.value = sel ? sel.preco : item.min;
    }
    if (qtdInput) {
      qtdInput.disabled = travado;
      if (document.activeElement !== qtdInput) qtdInput.value = sel ? sel.qtd : 0;
    }
    const notas = travado ? [...notasFixas, textoBloqueio(item, bloq)] : notasFixas;
    sub.textContent = notas.join(" · ");
    sub.classList.toggle("hidden", !notas.length);
  }

  sync();
  return { card, sync };
}

function renderItems() {
  const busca = searchEl.value.trim().toLowerCase();
  itemsEl.innerHTML = "";
  syncCards = [];

  const lista = busca
    ? CATEGORIAS.flatMap(cat => cat.itens.filter(i => i.nome.toLowerCase().includes(busca)).map(i => [i, cat.nome]))
    : CATEGORIAS.find(c => c.nome === abaAtual).itens.map(i => [i, abaAtual]);

  lista.forEach(([item, cat]) => {
    const { card, sync } = criarCard(item, cat, !!busca);
    syncCards.push(sync);
    itemsEl.appendChild(card);
  });
  $("empty").classList.toggle("hidden", lista.length !== 0);
}

// Depois de mudar a seleção: atualiza os cards no lugar (sem perder o foco do campo), as abas e o total.
function atualizar() {
  syncCards.forEach(sync => sync());
  renderTabs();
  atualizarTotal();
}

function linhasOrdem() {
  const linhas = [];
  for (const [id, s] of selecao) {
    const item = ITENS.get(id)?.item;
    if (!item) continue;
    linhas.push({ nome: item.nome, inclui: item.inclui, qtd: s.qtd, preco: s.preco, total: s.preco * s.qtd });
  }
  return linhas;
}

function atualizarTotal() {
  const subtotal = linhasOrdem().reduce((s, l) => s + l.total, 0);
  const desconto = Number(discountEl.value) || 0;
  const total = subtotal * (1 - desconto / 100);
  $("total").textContent = money(total);
  $("subtotal").textContent = desconto && subtotal ? `Subtotal ${money(subtotal)} · -${desconto}%` : "";
  renderMateriais();
  return { subtotal, desconto, total };
}

function render() {
  renderTabs();
  renderItems();
  atualizarTotal();
}

function textoOrdem() {
  const { subtotal, desconto, total } = atualizarTotal();
  const cliente = clientNameEl.value.trim();
  const passaporte = passportEl.value.trim();

  let t = `ORDEM DE SERVIÇO — ${visual.nome}\n`;
  t += "============================\n";
  if (cliente) t += `Cliente: ${cliente}\n`;
  if (passaporte) t += `Passaporte / ID: ${passaporte}\n`;
  t += "\n";
  linhasOrdem().forEach(l => {
    t += `${l.nome}${l.qtd > 1 ? ` x${l.qtd}` : ""} - ${money(l.total)}\n`;
    if (l.inclui) t += `   ↳ ${l.inclui}\n`;
  });
  t += "\n";
  t += `Subtotal: ${money(subtotal)}\n`;
  t += `Desconto: ${desconto}%\n`;
  t += `TOTAL: ${money(total)}\n`;
  return t;
}

function exigirPassaporte() {
  if (passportEl.value.trim()) return true;
  toast("Informe o Passaporte / ID.");
  passportEl.focus();
  return false;
}

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = texto;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

$("copyBtn").onclick = async () => {
  if (!selecao.size) return toast("Nenhum item selecionado.");
  if (EXPERIMENTAL.idParaCopiar && !exigirPassaporte()) return;
  toast((await copiarTexto(textoOrdem())) ? "Ordem copiada!" : "Não foi possível copiar automaticamente.");
};

function limpar() {
  selecao.clear();
  discountEl.value = "0";
  clientNameEl.value = "";
  passportEl.value = "";
  searchEl.value = "";
  render();
}

$("clearBtn").onclick = () => {
  limpar();
  toast("Ordem limpa.");
};

// ----- Salvar / histórico -----

// Cada oficina guarda o próprio histórico (a Helmut's mantém a chave antiga, sem perder ordens salvas).
function prefixoDados() {
  if (visual.nome === VISUAL_PADRAO.nome) return "helmutsGarage";
  const slug = visual.nome.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `oficina.${slug || "sem-nome"}`;
}
const chaveHistorico = () => `${prefixoDados()}.historico`;
const chaveUltima = () => `${prefixoDados()}.ultimaOrdem`;

function lerHistorico() {
  try {
    return JSON.parse(localStorage.getItem(chaveHistorico())) || [];
  } catch {
    return [];
  }
}

function gravarHistorico(lista) {
  localStorage.setItem(chaveHistorico(), JSON.stringify(lista));
}

$("saveBtn").onclick = () => {
  if (!selecao.size) return toast("Nenhum item selecionado.");
  if (!exigirPassaporte()) return;
  const ordem = {
    id: Date.now(),
    data: new Date().toISOString(),
    cliente: clientNameEl.value.trim(),
    passaporte: passportEl.value.trim(),
    desconto: Number(discountEl.value),
    selecao: [...selecao],
    itens: linhasOrdem(),
    totais: atualizarTotal()
  };
  try {
    if (EXPERIMENTAL.historico) {
      gravarHistorico([ordem, ...lerHistorico()].slice(0, 100));
    } else {
      localStorage.setItem(chaveUltima(), JSON.stringify(ordem));
    }
    toast("Ordem salva neste navegador!");
  } catch {
    toast("Não foi possível salvar neste navegador.");
  }
};

function renderHistorico() {
  const el = $("historyList");
  const lista = lerHistorico();
  el.innerHTML = "";
  if (!lista.length) {
    el.innerHTML = '<div class="empty">Nenhuma ordem salva ainda.</div>';
    return;
  }
  lista.forEach(o => {
    const row = document.createElement("div");
    row.className = "history-row";

    const info = document.createElement("div");
    info.className = "history-info";
    const titulo = document.createElement("strong");
    titulo.textContent = `${o.cliente || "Sem nome"} · ID ${o.passaporte}`;
    const det = document.createElement("small");
    det.textContent = `${new Date(o.data).toLocaleString("pt-BR")} · ${o.itens.length} item(ns) · ${money(o.totais.total)}`;
    info.append(titulo, det);

    const abrir = document.createElement("button");
    abrir.className = "btn copy";
    abrir.textContent = "ABRIR";
    abrir.onclick = () => {
      limpar();
      o.selecao.forEach(([id, s]) => ITENS.has(id) && selecao.set(id, s));
      discountEl.value = String(o.desconto);
      clientNameEl.value = o.cliente;
      passportEl.value = o.passaporte;
      render();
      fecharHistorico();
      toast("Ordem reaberta.");
    };

    const excluir = document.createElement("button");
    excluir.className = "btn clear";
    excluir.textContent = "EXCLUIR";
    excluir.onclick = () => {
      if (!confirm("Excluir esta ordem do histórico?")) return;
      gravarHistorico(lerHistorico().filter(x => x.id !== o.id));
      renderHistorico();
    };

    row.append(info, abrir, excluir);
    el.appendChild(row);
  });
}

function fecharHistorico() {
  $("historyPanel").classList.add("hidden");
}

$("historyBtn").onclick = () => {
  renderHistorico();
  $("historyPanel").classList.remove("hidden");
};
$("historyClose").onclick = fecharHistorico;
$("historyPanel").addEventListener("click", e => {
  if (e.target.id === "historyPanel") fecharHistorico();
});
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  fecharHistorico();
  if (!$("customPanel").classList.contains("hidden")) fecharPersonalizar();
});

// ----- Modo escuro -----
// Sem escolha salva, segue o tema do sistema. O botão salva a escolha neste navegador.

const temaSistema = window.matchMedia("(prefers-color-scheme: dark)");
const temaAtual = () => document.documentElement.dataset.theme || (temaSistema.matches ? "dark" : "light");

function atualizarBotaoTema() {
  const escuro = temaAtual() === "dark";
  $("themeBtn").textContent = escuro ? "☀️" : "🌙";
  $("themeBtn").title = escuro ? "Modo claro" : "Modo escuro";
}

$("themeBtn").onclick = () => {
  const novo = temaAtual() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = novo;
  try { localStorage.setItem("helmutsGarage.tema", novo); } catch {}
  atualizarBotaoTema();
};
temaSistema.addEventListener("change", atualizarBotaoTema);
atualizarBotaoTema();

// ----- Visual da oficina (Project Comunity) -----
// O visual vem do link (#p=…&n=…&c=…). Só os campos de VISUAL_PADRAO são lidos, e cada valor é
// validado — não existe campo de preço ou material, então o link não tem como alterá-los.

const limparTexto = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

function limparCor(v) {
  const m = String(v ?? "").trim().match(/^#?([0-9a-f]{6})$/i);
  return m ? `#${m[1].toLowerCase()}` : "";
}

// Só aceita imagens https:// (o navegador já escapa aspas e espaços no href).
function limparLink(v) {
  const s = String(v ?? "").trim();
  if (!s || s.length > 800) return "";
  try {
    const url = new URL(s);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function normalizarVisual(bruto) {
  const texto = (campo, max) => (bruto[campo] === undefined ? VISUAL_PADRAO[campo] : limparTexto(bruto[campo], max));
  return {
    prefixo: texto("prefixo", 30),
    nome: texto("nome", 40) || VISUAL_PADRAO.nome,
    cor: limparCor(bruto.cor) || VISUAL_PADRAO.cor,
    topo: limparCor(bruto.topo) || VISUAL_PADRAO.topo,
    logo: limparLink(bruto.logo),
    banner: limparLink(bruto.banner),
    fundo: limparLink(bruto.fundo)
  };
}

function lerVisualDoLink() {
  const params = new URLSearchParams(location.hash.slice(1));
  const bruto = {};
  for (const [campo, chave] of Object.entries(CHAVES_LINK)) {
    if (params.has(chave)) bruto[campo] = params.get(chave);
  }
  return normalizarVisual(bruto);
}

// Link com só o que é diferente do padrão (sem nada = visual da Helmut's).
function linkDoVisual(v) {
  const params = new URLSearchParams();
  for (const [campo, chave] of Object.entries(CHAVES_LINK)) {
    if (v[campo] !== VISUAL_PADRAO[campo]) params.set(chave, campo === "cor" || campo === "topo" ? v[campo].slice(1) : v[campo]);
  }
  const base = location.origin + location.pathname;
  const extra = params.toString();
  return extra ? `${base}#${extra}` : base;
}

// Texto preto ou branco, o que tiver mais contraste com a cor principal.
function corDoTexto(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#1b1b1b" : "#ffffff";
}

function aplicarVisual(v) {
  const raiz = document.documentElement.style;
  const topo = $("topHeader");

  $("brandPrefixo").textContent = v.prefixo;
  $("brandPrefixo").classList.toggle("hidden", !v.prefixo);
  $("brandNome").textContent = v.nome;
  document.title = v.nome === VISUAL_PADRAO.nome ? "Calculadora Helmut's Garage" : `Calculadora ${v.nome}`;

  if (v.cor !== VISUAL_PADRAO.cor) {
    const clara = `color-mix(in srgb, ${v.cor} 72%, white)`;
    raiz.setProperty("--accent", v.cor);
    raiz.setProperty("--accent-light", clara);
    raiz.setProperty("--accent-dark", clara);
    raiz.setProperty("--on-accent", corDoTexto(v.cor));
  } else {
    ["--accent", "--accent-light", "--accent-dark", "--on-accent"].forEach(p => raiz.removeProperty(p));
  }
  if (v.topo !== VISUAL_PADRAO.topo) raiz.setProperty("--header", v.topo);
  else raiz.removeProperty("--header");

  const logo = $("brandLogo");
  logo.onerror = () => {
    logo.classList.add("hidden");
    $("brandWrench").classList.remove("hidden");
  };
  if (v.logo) logo.src = v.logo;
  else logo.removeAttribute("src");
  logo.classList.toggle("hidden", !v.logo);
  $("brandWrench").classList.toggle("hidden", !!v.logo);

  topo.style.setProperty("--banner", v.banner ? `url(${JSON.stringify(v.banner)})` : "none");
  topo.classList.toggle("has-banner", !!v.banner);
  // Topo de cor clara (e sem banner, que já escurece): texto escuro para dar leitura.
  topo.classList.toggle("header-light", !v.banner && corDoTexto(v.topo) !== "#ffffff");
  document.body.style.setProperty("--wallpaper", v.fundo ? `url(${JSON.stringify(v.fundo)})` : "none");
  document.body.classList.toggle("has-wallpaper", !!v.fundo);
}

let visual = lerVisualDoLink();

const CAMPOS_VISUAL = {
  prefixo: "cfgPrefixo", nome: "cfgNome", cor: "cfgCor", topo: "cfgTopo",
  logo: "cfgLogo", banner: "cfgBanner", fundo: "cfgFundo"
};

function preencherCampos(v) {
  for (const [campo, id] of Object.entries(CAMPOS_VISUAL)) $(id).value = v[campo];
  marcarCampos();
}

function lerCampos() {
  const bruto = {};
  for (const [campo, id] of Object.entries(CAMPOS_VISUAL)) bruto[campo] = $(id).value;
  return normalizarVisual(bruto);
}

// Mostra o código da cor e marca links de imagem inválidos.
function marcarCampos() {
  $("cfgCorHex").textContent = $("cfgCor").value;
  $("cfgTopoHex").textContent = $("cfgTopo").value;
  ["cfgLogo", "cfgBanner", "cfgFundo"].forEach(id => {
    const el = $(id);
    el.classList.toggle("invalid", !!el.value.trim() && !limparLink(el.value));
  });
}

function fecharPersonalizar() {
  aplicarVisual(visual); // desfaz a prévia se o link não foi copiado
  $("customPanel").classList.add("hidden");
}

$("customBtn").onclick = () => {
  preencherCampos(visual);
  $("customPanel").classList.remove("hidden");
};
$("customClose").onclick = fecharPersonalizar;
$("customPanel").addEventListener("click", e => {
  if (e.target.id === "customPanel") fecharPersonalizar();
});
$("customPanel").addEventListener("input", () => {
  marcarCampos();
  aplicarVisual(lerCampos());
});
$("cfgReset").onclick = () => {
  preencherCampos(VISUAL_PADRAO);
  aplicarVisual(VISUAL_PADRAO);
};
$("cfgCopy").onclick = async () => {
  visual = lerCampos();
  const link = linkDoVisual(visual);
  history.replaceState(null, "", link);
  aplicarVisual(visual);
  $("customPanel").classList.add("hidden");
  toast((await copiarTexto(link)) ? "Link copiado! Envie para seus mecânicos." : "Copie o link da barra de endereço.");
};

// Colar outro link de oficina na mesma aba troca o visual.
window.addEventListener("hashchange", () => {
  visual = lerVisualDoLink();
  aplicarVisual(visual);
});

aplicarVisual(visual);

// ----- Início -----

DESCONTOS.forEach(d => {
  const opt = document.createElement("option");
  opt.value = d;
  opt.textContent = d ? `${d}%` : "Sem Desconto";
  discountEl.appendChild(opt);
});

$("historyBtn").classList.toggle("hidden", !EXPERIMENTAL.historico);

searchEl.addEventListener("input", () => {
  renderTabs();
  renderItems();
});
discountEl.addEventListener("change", atualizarTotal);

render();
