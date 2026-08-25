/**
 * ==========================================================================
 * SISTEMA EMPRESARIAL GOURMET DE CARDÁPIO DIGITAL & PEDIDOS
 * ==========================================================================
 */

// ==========================================================================
// 1. PRODUTOS PADRÃO DO RESTAURANTE (COM IMAGENS GOURMET E BADGES)
// ==========================================================================
const PRODUTOS_PADRAO = [
  {
    id: 1,
    nome: "X-Bacon Artesanal Gourmet",
    categoria: "lanches",
    preco: 32.90,
    icone: "🥓",
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    badge: "Mais Pedido",
    descricao: "Pão brioche selado na manteiga, blend bovino 180g, fatias de bacon crocante, cheddar e maionese artesanal."
  },
  {
    id: 2,
    nome: "Smash Burger Duplo",
    categoria: "lanches",
    preco: 28.50,
    icone: "🍔",
    imagem: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    badge: "Chef Special",
    descricao: "2 carnes smash 90g prensadas na chapa com crostinha crocante, dobro de queijo prato e cebola caramelizada."
  },
  {
    id: 3,
    nome: "Chicken Crispy Supreme",
    categoria: "lanches",
    preco: 29.90,
    icone: "🍗",
    imagem: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
    badge: "Novo",
    descricao: "Filé de frango empanado ultra crocante, alface americana fresca, picles e molho tártaro especial."
  },
  {
    id: 4,
    nome: "Batata Rústica Cheddar & Bacon",
    categoria: "porcoes",
    preco: 26.00,
    icone: "🍟",
    imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    badge: "Mais Pedido",
    descricao: "Batatas rústicas douradas temperadas com páprica e alecrim, cobertas com cheddar cremoso e bacon."
  },
  {
    id: 5,
    nome: "Anéis de Cebola Empanados",
    categoria: "porcoes",
    preco: 22.00,
    icone: "🧅",
    imagem: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80",
    badge: "",
    descricao: "Porção generosa de onion rings crocantes e sequinhas, acompanhadas de molho barbecue da casa."
  },
  {
    id: 6,
    nome: "Coca-Cola Original Lata 350ml",
    categoria: "bebidas",
    preco: 6.50,
    icone: "🥤",
    imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    badge: "",
    descricao: "Refrigerante lata 350ml trincando de gelada."
  },
  {
    id: 7,
    nome: "Suco Natural de Laranja 500ml",
    categoria: "bebidas",
    preco: 10.00,
    icone: "🍊",
    imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    badge: "Vegetariano",
    descricao: "Suco natural feito na hora com 100% de laranjas frescas selecionadas, sem adição de açúcar."
  },
  {
    id: 8,
    nome: "Brownie Belga com Sorvete",
    categoria: "sobremesas",
    preco: 18.00,
    icone: "🍫",
    imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    badge: "Chef Special",
    descricao: "Brownie de chocolate belga morno com nozes, acompanhado de bola generosa de sorvete de baunilha."
  },
  {
    id: 9,
    nome: "Cerveja Heineken Long Neck 330ml",
    categoria: "bebidas",
    preco: 12.00,
    icone: "🍺",
    imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80",
    badge: "Mais Pedido",
    descricao: "Cerveja Premium Lager Heineken Long Neck 330ml trincando de gelada."
  }
];

const CONFIG_PADRAO = {
  nomeLoja: "Sabor & Arte Gourmet",
  whatsapp: "5579999999999",
  taxaEntrega: 5.00,
  chavePix: "pix@saborearte.com.br"
};

// ==========================================================================
// 2. ESTADO DA APLICAÇÃO
// ==========================================================================
let produtos = carregarProdutos();
let carrinho = carregarCarrinho();
let configLoja = carregarConfig();
let categoriaAtiva = "todos";
let termoBusca = "";
let acaoConfirmacaoPendente = null;

// ==========================================================================
// 3. PERSISTÊNCIA (LOCALSTORAGE)
// ==========================================================================
function carregarProdutos() {
  try {
    const salvos = localStorage.getItem("cardapio_gourmet_v2_produtos") || localStorage.getItem("cardapio_pro_produtos");
    if (!salvos) {
      localStorage.setItem("cardapio_gourmet_v2_produtos", JSON.stringify(PRODUTOS_PADRAO));
      return [...PRODUTOS_PADRAO];
    }
    let lista = JSON.parse(salvos);

    PRODUTOS_PADRAO.forEach(pPadrao => {
      const idx = lista.findIndex(item => item.id === pPadrao.id);
      if (idx === -1) {
        lista.push({ ...pPadrao });
      } else {
        if (!lista[idx].imagem && pPadrao.imagem) lista[idx].imagem = pPadrao.imagem;
        if (!lista[idx].badge && pPadrao.badge) lista[idx].badge = pPadrao.badge;
      }
    });

    localStorage.setItem("cardapio_gourmet_v2_produtos", JSON.stringify(lista));
    return lista;
  } catch (e) {
    console.error("Erro ao carregar produtos:", e);
    return [...PRODUTOS_PADRAO];
  }
}

function salvarProdutos() {
  try {
    localStorage.setItem("cardapio_gourmet_v2_produtos", JSON.stringify(produtos));
  } catch (e) {
    console.error("Erro ao salvar produtos:", e);
  }
}

function carregarCarrinho() {
  try {
    const salvos = localStorage.getItem("cardapio_pro_carrinho");
    return salvos ? JSON.parse(salvos) : [];
  } catch (e) {
    console.error("Erro ao carregar carrinho:", e);
    return [];
  }
}

function salvarCarrinho() {
  try {
    localStorage.setItem("cardapio_pro_carrinho", JSON.stringify(carrinho));
  } catch (e) {
    console.error("Erro ao salvar carrinho:", e);
  }
}

function carregarConfig() {
  try {
    const salvos = localStorage.getItem("cardapio_pro_config");
    return salvos ? JSON.parse(salvos) : { ...CONFIG_PADRAO };
  } catch (e) {
    return { ...CONFIG_PADRAO };
  }
}

function salvarConfig() {
  try {
    localStorage.setItem("cardapio_pro_config", JSON.stringify(configLoja));
  } catch (e) {
    console.error("Erro ao salvar configurações:", e);
  }
}

// ==========================================================================
// 4. FORMATADORES E TOAST
// ==========================================================================
const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function formatarPreco(valor) {
  return formatadorMoeda.format(valor || 0);
}

function mostrarToast(mensagem, icone = "✅") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerHTML = `<span>${icone}</span> <span>${mensagem}</span>`;
  toast.classList.add("show");

  clearTimeout(toast.tempo);
  toast.tempo = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// MODAL DE CONFIRMAÇÃO CUSTOMIZADO (Substitui confirm NATIVO)
function solicitarConfirmacao(titulo, mensagem, icone, acao) {
  const modalConf = document.getElementById("modal-confirmacao");
  const elTitulo = document.getElementById("confirm-titulo");
  const elMensagem = document.getElementById("confirm-mensagem");
  const elIcone = document.getElementById("confirm-icon");

  if (!modalConf) {
    if (confirm(mensagem)) acao();
    return;
  }

  if (elTitulo) elTitulo.textContent = titulo;
  if (elMensagem) elMensagem.textContent = mensagem;
  if (elIcone) elIcone.textContent = icone || "⚠️";

  acaoConfirmacaoPendente = acao;

  if (typeof modalConf.showModal === "function") {
    modalConf.showModal();
  } else {
    modalConf.setAttribute("open", "true");
  }
}

function fecharModalConfirmacao() {
  const modalConf = document.getElementById("modal-confirmacao");
  if (modalConf) {
    if (typeof modalConf.close === "function") modalConf.close();
    else modalConf.removeAttribute("open");
  }
  acaoConfirmacaoPendente = null;
}

// ==========================================================================
// 5. GERENCIAMENTO DO CARRINHO
// ==========================================================================
function obterQtdItem(produtoId) {
  const item = carrinho.find(it => it.id === produtoId);
  return item ? item.quantidade : 0;
}

function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  const existente = carrinho.find(it => it.id === produtoId);
  if (existente) {
    existente.quantidade += 1;
    existente.preco = produto.preco;
    existente.nome = produto.nome;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      icone: produto.icone,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarInterface();
  mostrarToast(`${produto.nome} adicionado ao pedido!`, "🛒");
}

function alterarQuantidade(produtoId, delta) {
  const index = carrinho.findIndex(it => it.id === produtoId);
  if (index === -1) return;

  carrinho[index].quantidade += delta;

  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
    mostrarToast("Item removido do pedido", "🗑️");
  }

  salvarCarrinho();
  atualizarInterface();
}

function removerItemCarrinho(produtoId) {
  carrinho = carrinho.filter(it => it.id !== produtoId);
  salvarCarrinho();
  atualizarInterface();
  mostrarToast("Item removido", "🗑️");
}

function limparCarrinho() {
  if (carrinho.length === 0) return;
  solicitarConfirmacao(
    "Esvaziar Carrinho?",
    "Deseja remover todos os itens selecionados do seu pedido?",
    "🧹",
    () => {
      carrinho = [];
      salvarCarrinho();
      atualizarInterface();
      fecharModal();
      mostrarToast("Carrinho esvaziado!", "🧹");
    }
  );
}

function calcularTotais() {
  const totalQtd = carrinho.reduce((soma, it) => soma + it.quantidade, 0);
  const subtotalValor = carrinho.reduce((soma, it) => soma + (it.preco * it.quantidade), 0);
  
  const selectAtendimento = document.getElementById("tipo-atendimento");
  const ehDelivery = selectAtendimento ? selectAtendimento.value === "Delivery" : true;
  const taxaEntrega = (ehDelivery && totalQtd > 0) ? (configLoja.taxaEntrega || 0) : 0;
  const totalGeral = subtotalValor + taxaEntrega;

  return { totalQtd, subtotalValor, taxaEntrega, totalGeral };
}

// ==========================================================================
// 6. RENDERIZAÇÃO DOS PRODUTOS
// ==========================================================================
function renderizarProdutos() {
  const grid = document.getElementById("grid-produtos");
  const alertaVazio = document.getElementById("vazio-alerta");
  const tituloCat = document.getElementById("titulo-categoria");
  const badgeTotal = document.getElementById("badge-total-itens");

  if (!grid) return;

  // Filtragem combinada
  const filtrados = produtos.filter(p => {
    const matchCat = categoriaAtiva === "todos" || p.categoria === categoriaAtiva;
    const matchBusca = termoBusca === "" || 
      p.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      (p.descricao && p.descricao.toLowerCase().includes(termoBusca.toLowerCase()));
    return matchCat && matchBusca;
  });

  // Atualiza título da seção
  const nomesCategorias = {
    todos: "Todos os Produtos",
    lanches: "🍔 Lanches Artesanais",
    porcoes: "🍟 Porções & Petiscos",
    bebidas: "🥤 Bebidas Geladas",
    sobremesas: "🍰 Sobremesas Gourmet"
  };

  if (tituloCat) {
    tituloCat.textContent = termoBusca ? `Resultados para "${termoBusca}"` : (nomesCategorias[categoriaAtiva] || "Cardápio");
  }
  if (badgeTotal) {
    badgeTotal.textContent = `${filtrados.length} ${filtrados.length === 1 ? "produto" : "produtos"}`;
  }

  // Estado vazio
  if (filtrados.length === 0) {
    grid.innerHTML = "";
    if (alertaVazio) alertaVazio.style.display = "block";
    return;
  }
  if (alertaVazio) alertaVazio.style.display = "none";

  // Gera os cards dos produtos
  grid.innerHTML = filtrados.map(p => {
    const qtdNoCarrinho = obterQtdItem(p.id);
    const estaNoCarrinho = qtdNoCarrinho > 0;

    let badgeClass = "";
    if (p.badge === "Mais Pedido") badgeClass = "mais-pedido";
    else if (p.badge === "Chef Special") badgeClass = "chef";
    else if (p.badge === "Novo") badgeClass = "novo";
    else if (p.badge === "Vegetariano") badgeClass = "vegetariano";

    return `
      <article class="card-item ${estaNoCarrinho ? 'no-carrinho' : ''}" data-id="${p.id}">
        ${p.badge ? `<span class="card-badge-tag ${badgeClass}">${p.badge}</span>` : ''}

        <div class="card-foto-wrapper">
          ${p.imagem ? `
            <img src="${p.imagem}" alt="${p.nome}" class="card-foto" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'card-foto-fallback\\'>${p.icone || '🍽️'}</div>';">
          ` : `
            <div class="card-foto-fallback">${p.icone || '🍽️'}</div>
          `}
        </div>

        <div class="card-topo">
          <h3 class="card-nome">${p.nome}</h3>
          <p class="card-descricao">${p.descricao || 'Sem descrição informada.'}</p>
        </div>

        <div class="card-rodape">
          <div class="card-preco">${formatarPreco(p.preco)}</div>
          
          <div class="card-acoes">
            ${estaNoCarrinho ? `
              <div class="stepper-box">
                <button class="btn-step" onclick="alterarQuantidade(${p.id}, -1)" title="Diminuir" aria-label="Diminuir quantidade">-</button>
                <span class="step-valor">${qtdNoCarrinho}</span>
                <button class="btn-step" onclick="alterarQuantidade(${p.id}, 1)" title="Aumentar" aria-label="Aumentar quantidade">+</button>
              </div>
            ` : `
              <button class="btn-pedir-card" onclick="adicionarAoCarrinho(${p.id})">
                + Adicionar
              </button>
            `}
            <button class="btn-card-action" onclick="abrirModalEdicao(${p.id})" title="Editar produto" aria-label="Editar produto">✏️</button>
            <button class="btn-card-action" onclick="excluirProdutoDoCardapio(${p.id})" title="Remover produto" aria-label="Remover produto">🗑️</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Excluir produto do cardápio geral
function excluirProdutoDoCardapio(produtoId) {
  const prod = produtos.find(p => p.id === produtoId);
  if (!prod) return;

  solicitarConfirmacao(
    "Excluir Produto?",
    `Deseja remover "${prod.nome}" permanentemente do cardápio?`,
    "🗑️",
    () => {
      produtos = produtos.filter(p => p.id !== produtoId);
      carrinho = carrinho.filter(it => it.id !== produtoId);

      salvarProdutos();
      salvarCarrinho();
      atualizarInterface();
      fecharModalConfirmacao();
      mostrarToast("Produto excluído do cardápio!", "🗑️");
    }
  );
}

// ==========================================================================
// 7. EDIÇÃO E CONFIGURAÇÕES
// ==========================================================================
const modalEditar = document.getElementById("modal-editar-produto");
const modalConfig = document.getElementById("modal-configuracoes");

function abrirModalEdicao(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;

  document.getElementById("edit-id").value = prod.id;
  document.getElementById("edit-nome").value = prod.nome;
  document.getElementById("edit-categoria").value = prod.categoria;
  document.getElementById("edit-preco").value = prod.preco;
  document.getElementById("edit-badge").value = prod.badge || "";
  document.getElementById("edit-imagem").value = prod.imagem || "";
  document.getElementById("edit-descricao").value = prod.descricao || "";

  if (modalEditar && typeof modalEditar.showModal === "function") {
    modalEditar.showModal();
  } else if (modalEditar) {
    modalEditar.setAttribute("open", "true");
  }
}

function fecharModalEdicao() {
  if (modalEditar && typeof modalEditar.close === "function") {
    modalEditar.close();
  } else if (modalEditar) {
    modalEditar.removeAttribute("open");
  }
}

function salvarEdicaoProduto() {
  const id = parseInt(document.getElementById("edit-id").value);
  const nome = document.getElementById("edit-nome").value.trim();
  const categoria = document.getElementById("edit-categoria").value;
  const preco = parseFloat(document.getElementById("edit-preco").value);
  const badge = document.getElementById("edit-badge").value;
  const imagem = document.getElementById("edit-imagem").value.trim();
  const descricao = document.getElementById("edit-descricao").value.trim();

  if (!nome || isNaN(preco) || preco <= 0) {
    mostrarToast("Preencha nome e preço válido!", "⚠️");
    return;
  }

  const idx = produtos.findIndex(p => p.id === id);
  if (idx !== -1) {
    produtos[idx].nome = nome;
    produtos[idx].categoria = categoria;
    produtos[idx].preco = preco;
    produtos[idx].badge = badge;
    produtos[idx].imagem = imagem;
    produtos[idx].descricao = descricao;

    // Atualiza carrinho se já tiver esse item
    const itemCar = carrinho.find(c => c.id === id);
    if (itemCar) {
      itemCar.nome = nome;
      itemCar.preco = preco;
      itemCar.imagem = imagem;
    }

    salvarProdutos();
    salvarCarrinho();
    atualizarInterface();
    fecharModalEdicao();
    mostrarToast("Produto atualizado com sucesso!", "✨");
  }
}

function abrirModalConfig() {
  document.getElementById("config-nome-loja").value = configLoja.nomeLoja || "";
  document.getElementById("config-whatsapp").value = configLoja.whatsapp || "";
  document.getElementById("config-taxa-entrega").value = configLoja.taxaEntrega || 0;
  document.getElementById("config-chave-pix").value = configLoja.chavePix || "";

  if (modalConfig && typeof modalConfig.showModal === "function") {
    modalConfig.showModal();
  } else if (modalConfig) {
    modalConfig.setAttribute("open", "true");
  }
}

function fecharModalConfig() {
  if (modalConfig && typeof modalConfig.close === "function") {
    modalConfig.close();
  } else if (modalConfig) {
    modalConfig.removeAttribute("open");
  }
}

function salvarConfiguracoesLoja() {
  const nome = document.getElementById("config-nome-loja").value.trim() || CONFIG_PADRAO.nomeLoja;
  const wa = document.getElementById("config-whatsapp").value.replace(/\D/g, "") || CONFIG_PADRAO.whatsapp;
  const taxa = parseFloat(document.getElementById("config-taxa-entrega").value) || 0;
  const pix = document.getElementById("config-chave-pix").value.trim() || CONFIG_PADRAO.chavePix;

  configLoja = {
    nomeLoja: nome,
    whatsapp: wa,
    taxaEntrega: taxa,
    chavePix: pix
  };

  salvarConfig();
  atualizarInterface();
  fecharModalConfig();
  mostrarToast("Configurações da loja salvas!", "⚙️");
}

// ==========================================================================
// 8. ATUALIZAÇÃO DA INTERFACE GERAL (BARRA & MODAL)
// ==========================================================================
function atualizarInterface() {
  // Atualiza dados visíveis da loja no cabeçalho
  const elNomeLoja = document.getElementById("display-nome-loja");
  const elTaxaBadge = document.getElementById("display-taxa-badge");
  const elPixChave = document.getElementById("pix-chave-texto");

  if (elNomeLoja) elNomeLoja.textContent = configLoja.nomeLoja;
  if (elTaxaBadge) elTaxaBadge.textContent = `🛵 Entrega ${formatarPreco(configLoja.taxaEntrega)}`;
  if (elPixChave) elPixChave.textContent = configLoja.chavePix;

  renderizarProdutos();

  const { totalQtd, subtotalValor, taxaEntrega, totalGeral } = calcularTotais();

  // 1. Atualizar Barra Flutuante
  const carrinhoQtd = document.getElementById("carrinho-qtd");
  const carrinhoResumo = document.getElementById("carrinho-resumo-texto");
  const carrinhoTotal = document.getElementById("carrinho-total-valor");

  if (carrinhoQtd) carrinhoQtd.textContent = totalQtd;
  if (carrinhoResumo) {
    carrinhoResumo.textContent = totalQtd === 0 
      ? "Nenhum item selecionado" 
      : `${totalQtd} ${totalQtd === 1 ? "item selecionado" : "itens selecionados"}`;
  }
  if (carrinhoTotal) carrinhoTotal.textContent = formatarPreco(subtotalValor);

  // 2. Atualizar Lista no Modal de Checkout
  const listaModal = document.getElementById("pedido-itens-lista");
  const modalSubtotalValor = document.getElementById("modal-subtotal-valor");
  const modalTaxaValor = document.getElementById("modal-taxa-valor");
  const modalValorTotal = document.getElementById("modal-valor-total");

  if (listaModal) {
    if (carrinho.length === 0) {
      listaModal.innerHTML = `
        <div style="text-align: center; padding: 24px; color: #64748b;">
          <span style="font-size: 2rem; display: block; margin-bottom: 6px;">🛒</span>
          <p style="font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 4px;">Seu carrinho está vazio</p>
          <p style="font-size: 0.85rem;">Selecione delícias do nosso cardápio para montar seu pedido.</p>
        </div>
      `;
    } else {
      listaModal.innerHTML = carrinho.map(item => `
        <div class="modal-item-linha">
          <div class="modal-item-detalhes">
            <div class="modal-item-nome">${item.icone || '🍽️'} ${item.nome}</div>
            <div class="modal-item-unit">${item.quantidade}x de ${formatarPreco(item.preco)}</div>
          </div>
          <div class="stepper-box">
            <button class="btn-step" onclick="alterarQuantidade(${item.id}, -1)" title="Diminuir" aria-label="Diminuir">-</button>
            <span class="step-valor">${item.quantidade}</span>
            <button class="btn-step" onclick="alterarQuantidade(${item.id}, 1)" title="Aumentar" aria-label="Aumentar">+</button>
          </div>
          <div class="modal-item-subtotal">${formatarPreco(item.preco * item.quantidade)}</div>
        </div>
      `).join("");
    }
  }

  if (modalSubtotalValor) modalSubtotalValor.textContent = formatarPreco(subtotalValor);
  if (modalTaxaValor) modalTaxaValor.textContent = formatarPreco(taxaEntrega);
  if (modalValorTotal) modalValorTotal.textContent = formatarPreco(totalGeral);
}

// ==========================================================================
// 9. MODAL DE FINALIZAÇÃO & WHATSAPP
// ==========================================================================
const modalPedido = document.getElementById("modal-pedido");
const btnAbrirPedido = document.getElementById("btn-abrir-pedido");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnLimparTudo = document.getElementById("btn-limpar-tudo");
const btnEnviarWhatsApp = document.getElementById("btn-enviar-whatsapp");

const clienteNomeInput = document.getElementById("cliente-nome");
const tipoAtendimentoSelect = document.getElementById("tipo-atendimento");
const clienteLocalInput = document.getElementById("cliente-local");
const rotuloLocal = document.getElementById("rotulo-local");
const formaPagamentoSelect = document.getElementById("forma-pagamento");
const grupoPix = document.getElementById("grupo-pix");
const grupoTroco = document.getElementById("grupo-troco");
const pedidoTrocoInput = document.getElementById("pedido-troco");
const pedidoObsInput = document.getElementById("pedido-obs");
const linhaTaxaEntrega = document.getElementById("linha-taxa-entrega");

function abrirModal() {
  atualizarInterface();
  if (modalPedido && typeof modalPedido.showModal === "function") {
    modalPedido.showModal();
  } else if (modalPedido) {
    modalPedido.setAttribute("open", "true");
  }
}

function fecharModal() {
  if (modalPedido && typeof modalPedido.close === "function") {
    modalPedido.close();
  } else if (modalPedido) {
    modalPedido.removeAttribute("open");
  }
}

// Adaptação dos campos conforme tipo de atendimento e forma de pagamento
if (tipoAtendimentoSelect) {
  tipoAtendimentoSelect.addEventListener("change", () => {
    const tipo = tipoAtendimentoSelect.value;
    if (tipo === "Delivery") {
      rotuloLocal.textContent = "Endereço Completo de Entrega *";
      clienteLocalInput.placeholder = "Rua, Número, Bairro, Ponto de Referência";
      clienteLocalInput.required = true;
      if (linhaTaxaEntrega) linhaTaxaEntrega.style.display = "flex";
    } else if (tipo === "Mesa") {
      rotuloLocal.textContent = "Número da Mesa *";
      clienteLocalInput.placeholder = "Ex: Mesa 05";
      clienteLocalInput.required = true;
      if (linhaTaxaEntrega) linhaTaxaEntrega.style.display = "none";
    } else {
      rotuloLocal.textContent = "Ponto de Retirada";
      clienteLocalInput.placeholder = "Retirada no Balcão do Restaurante";
      clienteLocalInput.required = false;
      if (linhaTaxaEntrega) linhaTaxaEntrega.style.display = "none";
    }
    atualizarInterface();
  });
}

if (formaPagamentoSelect) {
  formaPagamentoSelect.addEventListener("change", () => {
    const forma = formaPagamentoSelect.value;
    if (grupoPix) grupoPix.style.display = (forma === "PIX") ? "block" : "none";
    if (grupoTroco) grupoTroco.style.display = (forma === "Dinheiro") ? "block" : "none";
  });
}

// Copiar Chave PIX
const btnCopiarPix = document.getElementById("btn-copiar-pix");
if (btnCopiarPix) {
  btnCopiarPix.addEventListener("click", () => {
    const chave = configLoja.chavePix || CONFIG_PADRAO.chavePix;
    navigator.clipboard.writeText(chave).then(() => {
      mostrarToast("Chave PIX copiada!", "⚡");
    }).catch(() => {
      mostrarToast("Chave: " + chave, "📋");
    });
  });
}

// Enviar pedido formatado para WhatsApp
function finalizarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    mostrarToast("Seu carrinho está vazio!", "⚠️");
    return;
  }

  const nome = clienteNomeInput.value.trim();
  const tipo = tipoAtendimentoSelect.value;
  const local = clienteLocalInput.value.trim();
  const pagamento = formaPagamentoSelect.value;
  const troco = pedidoTrocoInput ? pedidoTrocoInput.value.trim() : "";
  const obs = pedidoObsInput.value.trim();

  if (!nome) {
    mostrarToast("Informe seu nome completo!", "⚠️");
    clienteNomeInput.focus();
    return;
  }

  if (tipo !== "Balcão" && !local) {
    mostrarToast("Informe o local ou endereço!", "⚠️");
    clienteLocalInput.focus();
    return;
  }

  const { subtotalValor, taxaEntrega, totalGeral } = calcularTotais();
  const agora = new Date().toLocaleString("pt-BR");

  // Montagem da mensagem estruturada
  let texto = `*🍽️ NOVO PEDIDO - ${configLoja.nomeLoja.toUpperCase()}*\n`;
  texto += `_Data/Hora: ${agora}_\n`;
  texto += `----------------------------------------\n`;
  texto += `👤 *Cliente:* ${nome}\n`;
  texto += `📍 *Atendimento:* ${tipo} ${local ? `(${local})` : ''}\n`;
  texto += `💳 *Forma de Pagamento:* ${pagamento}\n`;
  if (pagamento === "Dinheiro" && troco) {
    texto += `💵 *Troco para:* ${troco}\n`;
  }
  texto += `----------------------------------------\n`;
  texto += `📋 *ITENS DO PEDIDO:*\n`;

  carrinho.forEach(it => {
    texto += `• ${it.quantidade}x ${it.nome} - ${formatarPreco(it.preco * it.quantidade)}\n`;
  });

  texto += `----------------------------------------\n`;
  texto += `💰 *Subtotal:* ${formatarPreco(subtotalValor)}\n`;
  if (tipo === "Delivery") {
    texto += `🛵 *Taxa de Entrega:* ${formatarPreco(taxaEntrega)}\n`;
  }
  texto += `✨ *TOTAL A PAGAR:* ${formatarPreco(totalGeral)}\n`;
  texto += `----------------------------------------\n`;

  if (obs) {
    texto += `📝 *Observações:* ${obs}\n`;
  }

  const numeroWhats = configLoja.whatsapp || CONFIG_PADRAO.whatsapp;
  const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");

  fecharModal();
  solicitarConfirmacao(
    "Pedido Enviado!",
    "Seu pedido foi direcionado para o WhatsApp. Deseja limpar o carrinho agora?",
    "📲",
    () => {
      carrinho = [];
      salvarCarrinho();
      atualizarInterface();
      fecharModalConfirmacao();
    }
  );
}

// ==========================================================================
// 10. CADASTRO DE NOVO PRODUTO NO CARDÁPIO
// ==========================================================================
const btnSalvarNovo = document.getElementById("btn-salvar-novo");
const novoNomeInput = document.getElementById("novo-nome");
const novaCategoriaSelect = document.getElementById("nova-categoria");
const novoPrecoInput = document.getElementById("novo-preco");
const novoBadgeSelect = document.getElementById("novo-badge");
const novaImagemInput = document.getElementById("nova-imagem");
const novaDescricaoInput = document.getElementById("nova-descricao");

function cadastrarNovoProduto() {
  const nome = novoNomeInput.value.trim();
  const categoria = novaCategoriaSelect.value;
  const preco = parseFloat(novoPrecoInput.value);
  const badge = novoBadgeSelect ? novoBadgeSelect.value : "";
  const imagem = novaImagemInput ? novaImagemInput.value.trim() : "";
  const descricao = novaDescricaoInput.value.trim();

  if (!nome) {
    mostrarToast("Digite o nome do produto!", "⚠️");
    novoNomeInput.focus();
    return;
  }

  if (isNaN(preco) || preco <= 0) {
    mostrarToast("Informe um preço válido!", "⚠️");
    novoPrecoInput.focus();
    return;
  }

  const iconesPorCat = {
    lanches: "🍔",
    porcoes: "🍟",
    bebidas: "🥤",
    sobremesas: "🍰"
  };

  const novoProduto = {
    id: Date.now(),
    nome,
    categoria,
    preco,
    icone: iconesPorCat[categoria] || "🍽️",
    badge,
    imagem,
    descricao: descricao || "Produto artesanal preparado na hora."
  };

  produtos.unshift(novoProduto);
  salvarProdutos();

  // Limpa os campos
  novoNomeInput.value = "";
  novoPrecoInput.value = "";
  if (novaImagemInput) novaImagemInput.value = "";
  novaDescricaoInput.value = "";

  // Fecha accordion
  const details = document.getElementById("accordion-cadastro");
  if (details) details.removeAttribute("open");

  atualizarInterface();
  mostrarToast(`"${nome}" cadastrado com sucesso!`, "✨");
}

// ==========================================================================
// 11. EVENTOS E INICIALIZAÇÃO
// ==========================================================================
function configurarEventos() {
  // Busca em tempo real
  const campoBusca = document.getElementById("campo-busca");
  const btnLimparBusca = document.getElementById("btn-limpar-busca");
  const btnResetBusca = document.getElementById("btn-reset-busca");

  if (campoBusca) {
    campoBusca.addEventListener("input", (e) => {
      termoBusca = e.target.value.trim();
      if (btnLimparBusca) btnLimparBusca.style.display = termoBusca ? "flex" : "none";
      renderizarProdutos();
    });
  }

  if (btnLimparBusca) {
    btnLimparBusca.addEventListener("click", () => {
      if (campoBusca) campoBusca.value = "";
      termoBusca = "";
      btnLimparBusca.style.display = "none";
      renderizarProdutos();
      if (campoBusca) campoBusca.focus();
    });
  }

  if (btnResetBusca) {
    btnResetBusca.addEventListener("click", () => {
      if (campoBusca) campoBusca.value = "";
      termoBusca = "";
      categoriaAtiva = "todos";
      const tabBtns = document.querySelectorAll(".tab-btn");
      tabBtns.forEach(b => b.classList.toggle("active", b.dataset.cat === "todos"));
      if (btnLimparBusca) btnLimparBusca.style.display = "none";
      renderizarProdutos();
    });
  }

  // Abas de categorias
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      categoriaAtiva = btn.dataset.cat;
      renderizarProdutos();
    });
  });

  // Modal de pedido
  if (btnAbrirPedido) btnAbrirPedido.addEventListener("click", abrirModal);
  if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModal);
  if (btnLimparTudo) btnLimparTudo.addEventListener("click", limparCarrinho);
  if (btnEnviarWhatsApp) btnEnviarWhatsApp.addEventListener("click", finalizarPedidoWhatsApp);

  // Modal de Edição
  const btnFecharEditar = document.getElementById("btn-fechar-editar");
  const btnSalvarEdicao = document.getElementById("btn-salvar-edicao");
  if (btnFecharEditar) btnFecharEditar.addEventListener("click", fecharModalEdicao);
  if (btnSalvarEdicao) btnSalvarEdicao.addEventListener("click", salvarEdicaoProduto);

  // Modal de Configurações
  const btnAbrirConfig = document.getElementById("btn-abrir-config");
  const btnFecharConfig = document.getElementById("btn-fechar-config");
  const btnSalvarConfig = document.getElementById("btn-salvar-config");
  if (btnAbrirConfig) btnAbrirConfig.addEventListener("click", abrirModalConfig);
  if (btnFecharConfig) btnFecharConfig.addEventListener("click", fecharModalConfig);
  if (btnSalvarConfig) btnSalvarConfig.addEventListener("click", salvarConfiguracoesLoja);

  // Modal de Confirmação
  const btnCancelConfirm = document.getElementById("btn-confirm-cancelar");
  const btnOkConfirm = document.getElementById("btn-confirm-ok");
  if (btnCancelConfirm) btnCancelConfirm.addEventListener("click", fecharModalConfirmacao);
  if (btnOkConfirm) {
    btnOkConfirm.addEventListener("click", () => {
      if (typeof acaoConfirmacaoPendente === "function") {
        acaoConfirmacaoPendente();
      } else {
        fecharModalConfirmacao();
      }
    });
  }

  // Cadastro de produto
  if (btnSalvarNovo) btnSalvarNovo.addEventListener("click", cadastrarNovoProduto);

  // Fechar modais ao clicar no backdrop (Target check seguro)
  const modais = [modalPedido, modalEditar, modalConfig, document.getElementById("modal-confirmacao")];
  modais.forEach(mod => {
    if (mod) {
      mod.addEventListener("click", (e) => {
        if (e.target === mod) {
          if (mod === modalPedido) fecharModal();
          else if (mod === modalEditar) fecharModalEdicao();
          else if (mod === modalConfig) fecharModalConfig();
          else if (mod.id === "modal-confirmacao") fecharModalConfirmacao();
        }
      });
    }
  });
}

// Expor funções globais para os botões inline
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.alterarQuantidade = alterarQuantidade;
window.removerItemCarrinho = removerItemCarrinho;
window.excluirProdutoDoCardapio = excluirProdutoDoCardapio;
window.abrirModalEdicao = abrirModalEdicao;

// Inicia aplicação
document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
  atualizarInterface();
});
