// ================= CONFIGURAÇÃO =================

const LOJA = "HELMUT'S GARAGE";
const DESCONTOS = [0, 5, 10, 15, 20, 25];

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
      { id: "lataria", nome: "Reparo de Lataria", min: 45, max: 60 },
      { id: "motor", nome: "Reparo de Motor", min: 100, max: 130 },
      { id: "lataria-motor", nome: "Reparo de Lataria + Motor", min: 140, max: 180, kit: ["lataria", "motor"] },
      { id: "oleo", nome: "Troca de Óleo", min: 25, max: 35 }
    ]
  },
  pecasClasse("D", { freioSuspensao: 180, ecu: 360, filtro: 360, escape: 180, coletor: 90, combustivel: 90, turbo: 270, intercooler: 180, embreagem: 180 }),
  pecasClasse("C", { freioSuspensao: 270, ecu: 540, filtro: 540, escape: 270, coletor: 135, combustivel: 135, turbo: 415, intercooler: 270, embreagem: 270 }),
  pecasClasse("B", { freioSuspensao: 360, ecu: 720, filtro: 720, escape: 360, coletor: 180, combustivel: 180, turbo: 540, intercooler: 360, embreagem: 360 }),
  {
    nome: "REPAROS PEÇAS",
    itens: [
      { id: "rep-ecu", nome: "Reparo de ECU", min: 75, max: 90, qtd: true },
      { id: "rep-turbo-escape", nome: "Reparo de Turbo ou Escape", min: 85, max: 100, qtd: true },
      { id: "rep-filtro", nome: "Reparo de Filtro de Ar", min: 95, max: 110, qtd: true },
      { id: "rep-coletor", nome: "Reparo de Coletor, Combustível ou Intercooler", min: 125, max: 140, qtd: true },
      { id: "rep-embreagem", nome: "Reparo de Embreagem", min: 125, max: 140, qtd: true }
    ]
  },
  {
    nome: "ESTÉTICA",
    itens: [
      { id: "pintura", nome: "Pintura", preco: 200 },
      { id: "rodas", nome: "Rodas", preco: 215 },
      { id: "aerofolio", nome: "Aerofólio", preco: 150 },
      { id: "parachoque", nome: "Para-Choque", preco: 150, qtd: true },
      { id: "peca-estetica", nome: "Peça Estética", preco: 150, qtd: true }
    ]
  },
  {
    nome: "NITRO",
    itens: [
      { id: "nitro-garrafa", nome: "Garrafa Nitro Pequena", preco: 400, qtd: true },
      { id: "nitro-garrafa-grande", nome: "Garrafa Nitro Grande", indisponivel: true },
      { id: "nitro-refil", nome: "Refil Nitro (Qualquer Tamanho)", min: 50, max: 70, qtd: true }
    ]
  },
  {
    nome: "REBOQUE",
    itens: [
      { id: "reboque", nome: "Reboque", min: 60, max: 100 }
    ]
  },
  {
    nome: "OUTROS",
    itens: [
      { id: "lockpick", nome: "Lockpick", preco: 60, qtd: true },
      { id: "lockpick-avancada", nome: "Lockpick Avançada", preco: 120, qtd: true },
      { id: "kit-reparo-motor", nome: "Kit de Reparo de Motor", preco: 265, qtd: true }
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
  "lataria": null,          // Reparo de Lataria
  "motor": null,            // Reparo de Motor
  "oleo": null,             // Troca de Óleo

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
  "c-freio": null, "c-suspensao": null, "c-ecu": null, "c-filtro": null, "c-escape": null,
  "c-coletor": null, "c-combustivel": null, "c-turbo": null, "c-intercooler": null, "c-embreagem": null,

  // Peças Classe B
  "b-freio": null, "b-suspensao": null, "b-ecu": null, "b-filtro": null, "b-escape": null,
  "b-coletor": null, "b-combustivel": null, "b-turbo": null, "b-intercooler": null, "b-embreagem": null,

  // Reparos Peças
  "rep-ecu": null,          // Reparo de ECU
  "rep-turbo-escape": null, // Reparo de Turbo ou Escape
  "rep-filtro": null,       // Reparo de Filtro de Ar
  "rep-coletor": null,      // Reparo de Coletor, Combustível ou Intercooler
  "rep-embreagem": null,    // Reparo de Embreagem

  // Estética
  "pintura": null, "rodas": null, "aerofolio": null, "parachoque": null, "peca-estetica": null,

  // Nitro
  "nitro-garrafa": null,        // Garrafa Nitro Pequena
  "nitro-garrafa-grande": null, // Garrafa Nitro Grande (em breve)
  "nitro-refil": null,          // Refil Nitro

  // Reboque
  "reboque": null,

  // Outros
  "lockpick": { aluminio: 3, aco: 2 },
  "lockpick-avancada": null,
  "kit-reparo-motor": { plastico: 10, aluminio: 20 } // Kit de Reparo de Motor (cliente leva para consertar o motor na rua)
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

  let t = `ORDEM DE SERVIÇO — ${LOJA}\n`;
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

const CHAVE_HISTORICO = "helmutsGarage.historico";
const CHAVE_ULTIMA = "helmutsGarage.ultimaOrdem";

function lerHistorico() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_HISTORICO)) || [];
  } catch {
    return [];
  }
}

function gravarHistorico(lista) {
  localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(lista));
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
      localStorage.setItem(CHAVE_ULTIMA, JSON.stringify(ordem));
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
  if (e.key === "Escape") fecharHistorico();
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
