// ================= CONFIGURAÇÃO =================

const LOJA = "HELMUT'S GARAGE";
const DESCONTOS = [0, 5, 10, 15, 20, 25];

// Recursos experimentais (temporários) — ver NOTAS-EXPERIMENTAIS.md.
// Troque true/false para ligar ou desligar cada um.
const EXPERIMENTAL = {
  travarKit: true,       // marcar um Kit Completo desmarca e bloqueia as peças avulsas daquela classe
  historico: true,       // ordens salvas vão para uma lista que pode ser reaberta ou excluída
  barraMateriais: false, // barra de materiais do site original (só mostrava 0)
  idParaCopiar: true     // COPIAR também exige Passaporte / ID
};

// ================= TABELA DE PREÇOS =================
// preco: valor fixo
// min / max: faixa de preço — o mecânico escolhe quanto cobrar dentro da faixa
// qtd: true permite escolher quantidade
// kit: ["id1", "id2"] — combo: marcar este item bloqueia os itens listados (vale em qualquer categoria)

function pecasClasse(letra, p) {
  const c = letra.toLowerCase();
  const nome = n => `${n} (Classe ${letra})`;
  const pecas = [
    { id: `${c}-freio`, nome: nome("Freio"), preco: p.freioSuspensao },
    { id: `${c}-suspensao`, nome: nome("Suspensão"), preco: p.freioSuspensao },
    { id: `${c}-ecu`, nome: nome("ECU"), preco: p.ecu },
    { id: `${c}-filtro`, nome: nome("Filtro de ar"), preco: p.filtro },
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
      { id: "lockpick", nome: "Lockpick", preco: 60, qtd: true }
    ]
  }
];

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

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// O pacote cobre o item se o item é uma das suas peças ou um pacote menor (ex.: Stage 3 cobre Stage 1 e 2).
function cobre(pacote, item) {
  if (!pacote.kit || pacote.id === item.id) return false;
  return item.kit ? item.kit.every(p => pacote.kit.includes(p)) : pacote.kit.includes(item.id);
}

// Pacote selecionado que já inclui este item (só com EXPERIMENTAL.travarKit).
function kitQueBloqueia(id) {
  if (!EXPERIMENTAL.travarKit) return null;
  const item = ITENS.get(id).item;
  for (const selId of selecao.keys()) {
    const pacote = ITENS.get(selId)?.item;
    if (pacote && cobre(pacote, item)) return pacote;
  }
  return null;
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

function criarCard(item, categoria, buscando) {
  const sel = selecao.get(item.id);
  const kit = kitQueBloqueia(item.id);

  const card = document.createElement("label");
  card.className = "item" + (sel ? " selected" : "") + (kit ? " locked" : "");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = !!sel;
  check.disabled = !!kit;

  const info = document.createElement("span");
  info.className = "item-info";
  const nome = document.createElement("span");
  nome.className = "item-name";
  nome.textContent = item.nome;
  info.appendChild(nome);

  const notas = [];
  if (buscando) notas.push(categoria);
  if (item.inclui) notas.push(`Inclui: ${item.inclui}`);
  if (ehFaixa(item)) notas.push(`faixa ${money(item.min)} – ${money(item.max)}`);
  if (kit) notas.push(`incluído no ${kit.nome.replace(/^[^\p{L}]+\s/u, "")}`);
  if (notas.length) {
    const sub = document.createElement("span");
    sub.className = "item-sub";
    sub.textContent = notas.join(" · ");
    info.appendChild(sub);
  }

  card.append(check, info);

  let precoInput;
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
    precoInput.value = sel ? sel.preco : item.min;
    precoInput.title = "Valor cobrado";
    precoInput.disabled = !!kit;
    precoInput.addEventListener("change", () => {
      const v = limitar(item, parseInt(precoInput.value, 10) || item.min);
      precoInput.value = v;
      const s = selecao.get(item.id) || { qtd: 1, preco: v };
      s.preco = v;
      selecao.set(item.id, s);
      check.checked = true;
      card.classList.add("selected");
      renderTabs();
      atualizarTotal();
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
    const qtd = document.createElement("input");
    qtd.className = "qty";
    qtd.type = "number";
    qtd.min = "0";
    qtd.step = "1";
    qtd.value = sel ? sel.qtd : 0;
    qtd.title = "Quantidade";
    qtd.disabled = !!kit;
    qtd.addEventListener("input", () => {
      const v = Math.max(0, parseInt(qtd.value || "0", 10) || 0);
      if (v > 0) {
        const s = selecao.get(item.id) || { qtd: v, preco: limitar(item, Number(precoInput?.value) || precoPadrao(item)) };
        s.qtd = v;
        selecao.set(item.id, s);
      } else {
        selecao.delete(item.id);
      }
      check.checked = v > 0;
      card.classList.toggle("selected", v > 0);
      renderTabs();
      atualizarTotal();
    });
    card.appendChild(qtd);
  }

  check.addEventListener("change", () => {
    if (check.checked) {
      const preco = limitar(item, Number(precoInput?.value) || precoPadrao(item));
      selecao.set(item.id, { qtd: 1, preco });
      if (item.kit && EXPERIMENTAL.travarKit) {
        for (const id of [...selecao.keys()]) if (cobre(item, ITENS.get(id).item)) selecao.delete(id);
      }
    } else {
      selecao.delete(item.id);
    }
    render();
  });

  return card;
}

function renderItems() {
  const busca = searchEl.value.trim().toLowerCase();
  itemsEl.innerHTML = "";

  const lista = busca
    ? CATEGORIAS.flatMap(cat => cat.itens.filter(i => i.nome.toLowerCase().includes(busca)).map(i => [i, cat.nome]))
    : CATEGORIAS.find(c => c.nome === abaAtual).itens.map(i => [i, abaAtual]);

  lista.forEach(([item, cat]) => itemsEl.appendChild(criarCard(item, cat, !!busca)));
  $("empty").classList.toggle("hidden", lista.length !== 0);
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
$("materials").classList.toggle("hidden", !EXPERIMENTAL.barraMateriais);
document.body.classList.toggle("com-materiais", EXPERIMENTAL.barraMateriais);

searchEl.addEventListener("input", () => {
  renderTabs();
  renderItems();
});
discountEl.addEventListener("change", atualizarTotal);

render();
