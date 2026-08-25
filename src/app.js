/**
 * ==========================================================================
 * SISTEMA EMPRESARIAL DE CARDÁPIO DIGITAL & PEDIDOS
 * ==========================================================================
 */

// ==========================================================================
// 1. PRODUTOS PADRÃO DO RESTAURANTE
// ==========================================================================
const PRODUTOS_PADRAO = [
  {
    id: 1,
    nome: "X-Bacon Artesanal Gourmet",
    categoria: "lanches",
    preco: 32.90,
    icone: "🥓",
    descricao: "Pão brioche selado, blend bovino 160g, fatias de bacon crocante, queijo cheddar e maionese especial."
  },
  {
    id: 2,
    nome: "Smash Burger Duplo",
    categoria: "lanches",
    preco: 28.50,
    icone: "🍔",
    descricao: "2 carnes smash prensadas na chapa com crostinha crocante, dobro de queijo prato e cebola caramelizada."
  },
  {
    id: 3,
    nome: "Chicken Crispy Supreme",
    categoria: "lanches",
    preco: 29.90,
    icone: "🍗",
    descricao: "Filé de frango empanado ultra crocante, alface americana fresca, picles e molho tártaro artesanal."
  },
  {
    id: 4,
    nome: "Batata Rústica Cheddar & Bacon",
    categoria: "porcoes",
    preco: 26.00,
    icone: "🍟",
    descricao: "Batatas rústicas douradas temperadas com páprica e alecrim, cobertas com cheddar cremoso e bacon."
  },
  {
    id: 5,
    nome: "Anéis de Cebola Empanados",
    categoria: "porcoes",
    preco: 22.00,
    icone: "🧅",
    descricao: "Porção de onion rings crocantes e sequinhas, acompanhadas de molho barbecue da casa."
  },
  {
    id: 6,
    nome: "Coca-Cola Original Lata 350ml",
    categoria: "bebidas",
    preco: 6.50,
    icone: "🥤",
    descricao: "Refrigerante lata 350ml trincando de gelada."
  },
  {
    id: 7,
    nome: "Suco Natural de Laranja 500ml",
    categoria: "bebidas",
    preco: 10.00,
    icone: "🍊",
    descricao: "Suco natural feito na hora com 100% de laranjas frescas selecionadas."
  },
  {
    id: 8,
    nome: "Brownie de Chocolate com Sorvete",
    categoria: "sobremesas",
    preco: 18.00,
    icone: "🍫",
    descricao: "Brownie de chocolate belga morno com nozes, acompanhado de bola generosa de sorvete de baunilha."
  }
];

// ==========================================================================
// 2. ESTADO DA APLICAÇÃO
// ==========================================================================
let produtos = carregarProdutos();
let carrinho = carregarCarrinho();
let categoriaAtiva = "todos";
let termoBusca = "";

// ==========================================================================
// 3. PERSISTÊNCIA (LOCALSTORAGE)
// ==========================================================================
function carregarProdutos() {
  try {
    const salvos = localStorage.getItem("cardapio_pro_produtos");
    return salvos ? JSON.parse(salvos) : [...PRODUTOS_PADRAO];
  } catch (e) {
    console.error("Erro ao carregar produtos:", e);
    return [...PRODUTOS_PADRAO];
  }
}

function salvarProdutos() {
  try {
    localStorage.setItem("cardapio_pro_produtos", JSON.stringify(produtos));
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
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      icone: produto.icone,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarInterface();
  mostrarToast(`${produto.nome} adicionado!`, "🛒");
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
  carrinho = [];
  salvarCarrinho();
  atualizarInterface();
  mostrarToast("Carrinho esvaziado!", "🧹");
}

function calcularTotais() {
  const totalQtd = carrinho.reduce((soma, it) => soma + it.quantidade, 0);
  const totalValor = carrinho.reduce((soma, it) => soma + (it.preco * it.quantidade), 0);
  return { totalQtd, totalValor };
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

  // Filtragem combinada por categoria e termo de pesquisa
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
    sobremesas: "🍰 Sobremesas"
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

    return `
      <article class="card-item ${estaNoCarrinho ? 'no-carrinho' : ''}" data-id="${p.id}">
        <div class="card-topo">
          <div class="card-icone">${p.icone || '🍽️'}</div>
          <div class="card-info">
            <h3 class="card-nome">${p.nome}</h3>
            <p class="card-descricao">${p.descricao || 'Sem descrição informada.'}</p>
          </div>
        </div>

        <div class="card-rodape">
          <div class="card-preco">${formatarPreco(p.preco)}</div>
          
          <div class="card-acoes">
            ${estaNoCarrinho ? `
              <div class="stepper-box">
                <button class="btn-step" onclick="alterarQuantidade(${p.id}, -1)" title="Diminuir">-</button>
                <span class="step-valor">${qtdNoCarrinho}</span>
                <button class="btn-step" onclick="alterarQuantidade(${p.id}, 1)" title="Aumentar">+</button>
              </div>
            ` : `
              <button class="btn-pedir-card" onclick="adicionarAoCarrinho(${p.id})">
                + Adicionar
              </button>
            `}
            <button class="btn-excluir-item" onclick="excluirProdutoDoCardapio(${p.id})" title="Remover do cardápio">✕</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Excluir produto do cardápio geral
function excluirProdutoDoCardapio(produtoId) {
  if (!confirm("Deseja realmente remover este produto do cardápio?")) return;

  produtos = produtos.filter(p => p.id !== produtoId);
  carrinho = carrinho.filter(it => it.id !== produtoId);

  salvarProdutos();
  salvarCarrinho();
  atualizarInterface();
  mostrarToast("Produto excluído do cardápio!", "🗑️");
}

// ==========================================================================
// 7. ATUALIZAÇÃO DA INTERFACE GERAL (BARRA & MODAL)
// ==========================================================================
function atualizarInterface() {
  renderizarProdutos();

  const { totalQtd, totalValor } = calcularTotais();

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
  if (carrinhoTotal) carrinhoTotal.textContent = formatarPreco(totalValor);

  // 2. Atualizar Lista no Modal de Checkout
  const listaModal = document.getElementById("pedido-itens-lista");
  const modalQtdTotal = document.getElementById("modal-qtd-total");
  const modalValorTotal = document.getElementById("modal-valor-total");

  if (listaModal) {
    if (carrinho.length === 0) {
      listaModal.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #64748b;">
          <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 4px;">Seu carrinho está vazio</p>
          <p style="font-size: 0.85rem;">Selecione opções do cardápio para fazer seu pedido.</p>
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
            <button class="btn-step" onclick="alterarQuantidade(${item.id}, -1)">-</button>
            <span class="step-valor">${item.quantidade}</span>
            <button class="btn-step" onclick="alterarQuantidade(${item.id}, 1)">+</button>
          </div>
          <div class="modal-item-subtotal">${formatarPreco(item.preco * item.quantidade)}</div>
        </div>
      `).join("");
    }
  }

  if (modalQtdTotal) modalQtdTotal.textContent = totalQtd;
  if (modalValorTotal) modalValorTotal.textContent = formatarPreco(totalValor);
}

// ==========================================================================
// 8. MODAL DE FINALIZAÇÃO & WHATSAPP
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
const pedidoObsInput = document.getElementById("pedido-obs");

function abrirModal() {
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

// Adaptação dos campos conforme tipo de atendimento
if (tipoAtendimentoSelect) {
  tipoAtendimentoSelect.addEventListener("change", () => {
    const tipo = tipoAtendimentoSelect.value;
    if (tipo === "Mesa") {
      rotuloLocal.textContent = "Número da Mesa *";
      clienteLocalInput.placeholder = "Ex: Mesa 05";
      clienteLocalInput.required = true;
    } else if (tipo === "Delivery") {
      rotuloLocal.textContent = "Endereço Completo de Entrega *";
      clienteLocalInput.placeholder = "Ex: Rua das Flores, 123, Apto 201 - Bairro";
      clienteLocalInput.required = true;
    } else {
      rotuloLocal.textContent = "Ponto de Retirada";
      clienteLocalInput.placeholder = "Balcão do Restaurante";
      clienteLocalInput.required = false;
    }
  });
}

// Enviar pedido formatado para WhatsApp
function finalizarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu pedido está vazio! Adicione pelo menos um item.");
    return;
  }

  const nome = clienteNomeInput.value.trim();
  const tipo = tipoAtendimentoSelect.value;
  const local = clienteLocalInput.value.trim();
  const pagamento = formaPagamentoSelect.value;
  const obs = pedidoObsInput.value.trim();

  if (!nome) {
    alert("Por favor, preencha o seu nome completo.");
    clienteNomeInput.focus();
    return;
  }

  if (tipo !== "Balcão" && !local) {
    alert("Por favor, informe a mesa ou o endereço de entrega.");
    clienteLocalInput.focus();
    return;
  }

  const { totalValor } = calcularTotais();
  const agora = new Date().toLocaleString("pt-BR");

  // Montagem da mensagem estruturada
  let texto = `*🍽️ NOVO PEDIDO - SABOR & ARTE GOURMET*\n`;
  texto += `_Data/Hora: ${agora}_\n`;
  texto += `----------------------------------------\n`;
  texto += `👤 *Cliente:* ${nome}\n`;
  texto += `📍 *Atendimento:* ${tipo} ${local ? `(${local})` : ''}\n`;
  texto += `💳 *Forma de Pagamento:* ${pagamento}\n`;
  texto += `----------------------------------------\n`;
  texto += `📋 *ITENS DO PEDIDO:*\n`;

  carrinho.forEach(it => {
    texto += `• ${it.quantidade}x ${it.nome} - ${formatarPreco(it.preco * it.quantidade)}\n`;
  });

  texto += `----------------------------------------\n`;
  texto += `💰 *TOTAL A PAGAR:* ${formatarPreco(totalValor)}\n`;
  texto += `----------------------------------------\n`;

  if (obs) {
    texto += `📝 *Observações:* ${obs}\n`;
  }

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");

  fecharModal();
  limparCarrinho();
}

// ==========================================================================
// 9. CADASTRO DE NOVO PRODUTO NO CARDÁPIO
// ==========================================================================
const btnSalvarNovo = document.getElementById("btn-salvar-novo");
const novoNomeInput = document.getElementById("novo-nome");
const novaCategoriaSelect = document.getElementById("nova-categoria");
const novoPrecoInput = document.getElementById("novo-preco");
const novaDescricaoInput = document.getElementById("nova-descricao");

function cadastrarNovoProduto() {
  const nome = novoNomeInput.value.trim();
  const categoria = novaCategoriaSelect.value;
  const preco = parseFloat(novoPrecoInput.value);
  const descricao = novaDescricaoInput.value.trim();

  if (!nome) {
    alert("Por favor, digite o nome do produto.");
    novoNomeInput.focus();
    return;
  }

  if (isNaN(preco) || preco <= 0) {
    alert("Por favor, informe um preço válido (maior que zero).");
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
    descricao: descricao || "Produto artesanal preparado na hora."
  };

  produtos.unshift(novoProduto);
  salvarProdutos();

  // Limpa os campos
  novoNomeInput.value = "";
  novoPrecoInput.value = "";
  novaDescricaoInput.value = "";

  // Fecha o accordion
  const details = document.querySelector(".accordion-cadastro");
  if (details) details.removeAttribute("open");

  atualizarInterface();
  mostrarToast(`"${nome}" cadastrado com sucesso!`, "✨");
}

// ==========================================================================
// 10. EVENTOS E INICIALIZAÇÃO
// ==========================================================================
function configurarEventos() {
  // Busca em tempo real
  const campoBusca = document.getElementById("campo-busca");
  const btnLimparBusca = document.getElementById("btn-limpar-busca");

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

  // Cadastro de produto
  if (btnSalvarNovo) btnSalvarNovo.addEventListener("click", cadastrarNovoProduto);

  // Fechar modal ao clicar fora (backdrop)
  if (modalPedido) {
    modalPedido.addEventListener("click", (e) => {
      const rect = modalPedido.getBoundingClientRect();
      const dentro = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!dentro) fecharModal();
    });
  }
}

// Expor funções globais para os botões inline
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.alterarQuantidade = alterarQuantidade;
window.removerItemCarrinho = removerItemCarrinho;
window.excluirProdutoDoCardapio = excluirProdutoDoCardapio;

// Inicia aplicação
document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
  atualizarInterface();
});


