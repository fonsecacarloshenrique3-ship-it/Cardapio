/**
 * ==========================================================================
 * PROJETO: CARDÁPIO ONLINE INTERATIVO (TRABALHO ACADÊMICO)
 * ALUNO: Pedro Joaquim
 * DISCIPLINA: Programação Web / Front-End
 * TECNOLOGIAS: HTML5, CSS3 e JavaScript Puro (Vanilla JS)
 * ==========================================================================
 */

// ==========================================================================
// 1. BANCO DE DADOS DOS PRODUTOS (Array de Objetos)
// ==========================================================================
const PRODUTOS = [
  // Lanches
  {
    id: 1,
    nome: "X-Bacon Artesanal",
    categoria: "lanches",
    preco: 28.50,
    icone: "🍔",
    descricao: "Pão brioche, hambúrguer de carne bovina 150g, queijo cheddar, fatias de bacon crocante e maionese da casa."
  },
  {
    id: 2,
    nome: "X-Salada Clássico",
    categoria: "lanches",
    preco: 24.00,
    icone: "🍔",
    descricao: "Pão com gergelim, hambúrguer bovino, queijo muçarela, alface fresca, rodelas de tomate e molho especial."
  },
  {
    id: 3,
    nome: "X-Frango Crocante",
    categoria: "lanches",
    preco: 26.00,
    icone: "🍗",
    descricao: "Pão brioche, filé de frango empanado crocante, queijo, alface e molho tártaro."
  },
  {
    id: 4,
    nome: "X-Tudo Especial",
    categoria: "lanches",
    preco: 32.00,
    icone: "🥪",
    descricao: "Hambúrguer bovino, bacon, ovo frito, presunto, queijo, calabresa, alface, tomate e milho."
  },

  // Porções
  {
    id: 5,
    nome: "Batata Frita com Cheddar e Bacon",
    categoria: "porcoes",
    preco: 26.00,
    icone: "🍟",
    descricao: "Porção generosa de batatas fritas crocantes com queijo cheddar derretido e cubinhos de bacon."
  },
  {
    id: 6,
    nome: "Batata Frita Simples",
    categoria: "porcoes",
    preco: 18.00,
    icone: "🍟",
    descricao: "Porção individual de batata frita bem sequinha e temperada com sal."
  },
  {
    id: 7,
    nome: "Coxinha sem Massa (6 unidades)",
    categoria: "porcoes",
    preco: 22.00,
    icone: "🥟",
    descricao: "Coxinhas crocantes recheadas 100% com frango desfiado temperado e requeijão cremoso."
  },

  // Bebidas
  {
    id: 8,
    nome: "Refrigerante Lata 350ml",
    categoria: "bebidas",
    preco: 6.00,
    icone: "🥤",
    descricao: "Coca-Cola, Guaraná Antarctica ou Fanta Laranja gelada."
  },
  {
    id: 9,
    nome: "Suco Natural de Laranja 500ml",
    categoria: "bebidas",
    preco: 9.00,
    icone: "🍊",
    descricao: "Suco de laranja natural espremido na hora, servido bem gelado."
  },
  {
    id: 10,
    nome: "Água Mineral 500ml",
    categoria: "bebidas",
    preco: 4.00,
    icone: "💧",
    descricao: "Garrafinha de água mineral sem gás bem gelada."
  },

  // Sobremesas
  {
    id: 11,
    nome: "Pudim de Leite Condensado",
    categoria: "sobremesas",
    preco: 10.00,
    icone: "🍮",
    descricao: "Fatia de pudim caseiro com calda cremosa de caramelo."
  },
  {
    id: 12,
    nome: "Brownie com Sorvete de Baunilha",
    categoria: "sobremesas",
    preco: 16.50,
    icone: "🍫",
    descricao: "Brownie de chocolate morno acompanhado de uma bola de sorvete de baunilha."
  }
];

// ==========================================================================
// 2. VARIÁVEIS E ESTADO DO SISTEMA
// ==========================================================================
let categoriaAtual = "todos";
let textoBusca = "";
let carrinho = carregarCarrinhoDoLocalStorage();
let textoReciboFormatado = "";

// ==========================================================================
// 3. CAPTURA DOS ELEMENTOS DO DOM (HTML)
// ==========================================================================
const gridProdutos = document.getElementById("grid-produtos");
const tituloCategoria = document.getElementById("titulo-categoria");
const contadorProdutos = document.getElementById("contador-produtos");
const campoBusca = document.getElementById("campo-busca");
const btnLimparBusca = document.getElementById("btn-limpar-busca");
const containerCategorias = document.getElementById("container-categorias");
const mensagemVazio = document.getElementById("mensagem-vazio");

// Elementos do Carrinho
const carrinhoLista = document.getElementById("carrinho-lista");
const carrinhoTotalBox = document.getElementById("carrinho-total-box");
const formPedidoBox = document.getElementById("form-pedido-box");
const qtdTotalItens = document.getElementById("qtd-total-itens");
const valorTotalPedido = document.getElementById("valor-total-pedido");
const btnEsvaziarCarrinho = document.getElementById("btn-esvaziar-carrinho");

// Campos do Formulário
const nomeCliente = document.getElementById("nome-cliente");
const tipoEntrega = document.getElementById("tipo-entrega");
const localEntrega = document.getElementById("local-entrega");
const labelLocal = document.getElementById("label-local");
const formaPagamento = document.getElementById("forma-pagamento");
const observacoes = document.getElementById("observacoes");
const btnFinalizarPedido = document.getElementById("btn-finalizar-pedido");

// Elementos da Área de Recibo
const secaoRecibo = document.getElementById("secao-recibo");
const textoRecibo = document.getElementById("texto-recibo");
const btnEnviarWhatsapp = document.getElementById("btn-enviar-whatsapp");
const btnCopiarRecibo = document.getElementById("btn-copiar-recibo");
const btnNovoPedido = document.getElementById("btn-novo-pedido");

// Toast de Notificação
const avisoToast = document.getElementById("aviso-toast");

// ==========================================================================
// 4. FUNÇÕES UTILITÁRIAS
// ==========================================================================

// Formata número para formato de moeda brasileira (R$)
function formatarMoeda(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Exibe um pequeno aviso na tela por alguns segundos
function mostrarAviso(mensagem) {
  if (!avisoToast) return;
  avisoToast.textContent = mensagem;
  avisoToast.style.display = "block";
  
  clearTimeout(avisoToast.tempo);
  avisoToast.tempo = setTimeout(function () {
    avisoToast.style.display = "none";
  }, 2500);
}

// Salva e carrega o carrinho do LocalStorage
function salvarCarrinhoNoLocalStorage() {
  localStorage.setItem("trabalho_carrinho", JSON.stringify(carrinho));
}

function carregarCarrinhoDoLocalStorage() {
  try {
    const dados = localStorage.getItem("trabalho_carrinho");
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    return [];
  }
}

// ==========================================================================
// 5. FUNÇÃO PARA EXIBIR OS PRODUTOS (RENDERIZAÇÃO)
// ==========================================================================
function renderizarProdutos() {
  // Filtra produtos pela categoria e pelo campo de busca
  const produtosFiltrados = PRODUTOS.filter(function (produto) {
    const bateuCategoria = (categoriaAtual === "todos") || (produto.categoria === categoriaAtual);
    const bateuBusca = (textoBusca === "") || 
      produto.nome.toLowerCase().includes(textoBusca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(textoBusca.toLowerCase());

    return bateuCategoria && bateuBusca;
  });

  // Atualiza contadores e títulos
  contadorProdutos.textContent = produtosFiltrados.length + " itens disponíveis";

  if (categoriaAtual === "todos") {
    tituloCategoria.textContent = textoBusca ? `Resultados para "${textoBusca}"` : "Todos os Itens";
  } else {
    tituloCategoria.textContent = "Categoria: " + categoriaAtual.toUpperCase();
  }

  // Verifica se a busca não retornou nada
  if (produtosFiltrados.length === 0) {
    gridProdutos.innerHTML = "";
    mensagemVazio.style.display = "block";
    return;
  } else {
    mensagemVazio.style.display = "none";
  }

  // Limpa o grid e cria os cards de cada produto
  gridProdutos.innerHTML = "";

  produtosFiltrados.forEach(function (produto) {
    const card = document.createElement("div");
    card.className = "card-produto";

    card.innerHTML = `
      <div class="card-produto-topo">
        <div class="card-icone">${produto.icone}</div>
        <div class="card-info">
          <h3>${produto.nome}</h3>
          <p class="card-desc">${produto.descricao}</p>
        </div>
      </div>
      <div class="card-produto-rodape">
        <span class="card-preco">${formatarMoeda(produto.preco)}</span>
        <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
          + Adicionar
        </button>
      </div>
    `;

    gridProdutos.appendChild(card);
  });
}

// ==========================================================================
// 6. FUNÇÕES DE MANIPULAÇÃO DO CARRINHO
// ==========================================================================

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(idProduto) {
  const produto = PRODUTOS.find(function (p) {
    return p.id === idProduto;
  });

  if (!produto) return;

  const itemExistente = carrinho.find(function (item) {
    return item.id === idProduto;
  });

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      icone: produto.icone,
      quantidade: 1
    });
  }

  salvarCarrinhoNoLocalStorage();
  atualizarCarrinhoUI();
  mostrarAviso(`✅ ${produto.nome} adicionado ao pedido!`);
}

// Altera a quantidade de um item (+1 ou -1)
function alterarQuantidade(idProduto, delta) {
  const item = carrinho.find(function (i) {
    return i.id === idProduto;
  });

  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    removerDoCarrinho(idProduto);
    return;
  }

  salvarCarrinhoNoLocalStorage();
  atualizarCarrinhoUI();
}

// Remove o item completamente do carrinho
function removerDoCarrinho(idProduto) {
  carrinho = carrinho.filter(function (item) {
    return item.id !== idProduto;
  });

  salvarCarrinhoNoLocalStorage();
  atualizarCarrinhoUI();
  mostrarAviso("🗑️ Item removido do carrinho.");
}

// Esvazia todo o carrinho
function esvaziarCarrinho() {
  if (carrinho.length === 0) return;
  
  if (confirm("Deseja realmente limpar todo o carrinho?")) {
    carrinho = [];
    salvarCarrinhoNoLocalStorage();
    atualizarCarrinhoUI();
    mostrarAviso("🧹 Carrinho esvaziado com sucesso!");
  }
}

// Calcula totais do carrinho
function calcularTotais() {
  let totalItens = 0;
  let valorTotal = 0;

  carrinho.forEach(function (item) {
    totalItens += item.quantidade;
    valorTotal += (item.preco * item.quantidade);
  });

  return { totalItens: totalItens, valorTotal: valorTotal };
}

// Atualiza a visualização do carrinho na tela
function atualizarCarrinhoUI() {
  if (carrinho.length === 0) {
    carrinhoLista.innerHTML = `<p class="carrinho-vazio-msg">Seu carrinho está vazio. Clique em "+ Adicionar" nos produtos acima!</p>`;
    carrinhoTotalBox.style.display = "none";
    formPedidoBox.style.display = "none";
    return;
  }

  carrinhoTotalBox.style.display = "block";
  formPedidoBox.style.display = "block";

  carrinhoLista.innerHTML = "";

  carrinho.forEach(function (item) {
    const subtotal = item.preco * item.quantidade;
    const linha = document.createElement("div");
    linha.className = "carrinho-item";

    linha.innerHTML = `
      <div class="carrinho-item-info">
        <div class="carrinho-item-nome">${item.icone} ${item.nome}</div>
        <div class="carrinho-item-unitario">${formatarMoeda(item.preco)} cada</div>
      </div>
      <div class="carrinho-controles">
        <button class="btn-qtd" onclick="alterarQuantidade(${item.id}, -1)">-</button>
        <span class="qtd-numero">${item.quantidade}</span>
        <button class="btn-qtd" onclick="alterarQuantidade(${item.id}, 1)">+</button>
      </div>
      <div class="carrinho-subtotal">${formatarMoeda(subtotal)}</div>
      <button class="btn-remover-item" onclick="removerDoCarrinho(${item.id})" title="Remover item">✕</button>
    `;

    carrinhoLista.appendChild(linha);
  });

  const totais = calcularTotais();
  qtdTotalItens.textContent = totais.totalItens;
  valorTotalPedido.textContent = formatarMoeda(totais.valorTotal);
}

// ==========================================================================
// 7. FINALIZAÇÃO DO PEDIDO E GERAÇÃO DE RECIBO
// ==========================================================================
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos um item ao seu pedido antes de finalizar!");
    return;
  }

  const nome = nomeCliente.value.trim();
  const tipo = tipoEntrega.options[tipoEntrega.selectedIndex].text;
  const local = localEntrega.value.trim();
  const pagamento = formaPagamento.value;
  const obs = observacoes.value.trim();

  // Validação simples
  if (nome === "") {
    alert("Por favor, preencha o seu nome!");
    nomeCliente.focus();
    return;
  }

  if (tipoEntrega.value !== "balcao" && local === "") {
    alert("Por favor, informe a mesa ou o endereço de entrega!");
    localEntrega.focus();
    return;
  }

  const totais = calcularTotais();
  const dataHoje = new Date().toLocaleString("pt-BR");

  // Monta o texto formatado do recibo
  let texto = "========================================\n";
  texto += "🍔 LANCHONETE & CARDÁPIO ONLINE\n";
  texto += "Data: " + dataHoje + "\n";
  texto += "========================================\n\n";
  texto += "👤 Cliente: " + nome + "\n";
  texto += "📍 Atendimento: " + tipo + (local ? " (" + local + ")" : "") + "\n";
  texto += "💳 Pagamento: " + pagamento + "\n\n";
  texto += "📝 ITENS SELECIONADOS:\n";
  texto += "----------------------------------------\n";

  carrinho.forEach(function (item) {
    const subtotal = item.preco * item.quantidade;
    texto += `${item.quantidade}x ${item.nome} - ${formatarMoeda(subtotal)}\n`;
  });

  texto += "----------------------------------------\n";
  texto += "💰 VALOR TOTAL: " + formatarMoeda(totais.valorTotal) + "\n";
  texto += "========================================\n";

  if (obs !== "") {
    texto += "\n🗒️ Observações: " + obs + "\n";
  }

  textoReciboFormatado = texto;
  textoRecibo.textContent = texto;
  secaoRecibo.style.display = "block";

  // Rola até a área do comprovante
  secaoRecibo.scrollIntoView({ behavior: "smooth" });

  // Limpa o carrinho
  carrinho = [];
  salvarCarrinhoNoLocalStorage();
  atualizarCarrinhoUI();
  mostrarAviso("🎉 Pedido finalizado com sucesso!");
}

// Enviar resumo para o WhatsApp
function enviarWhatsApp() {
  if (!textoReciboFormatado) return;
  const textoUrl = encodeURIComponent(textoReciboFormatado);
  window.open("https://api.whatsapp.com/send?text=" + textoUrl, "_blank");
}

// Copiar recibo
function copiarRecibo() {
  if (!textoReciboFormatado) return;
  navigator.clipboard.writeText(textoReciboFormatado)
    .then(function () {
      mostrarAviso("📋 Comprovante copiado com sucesso!");
    })
    .catch(function () {
      alert("Não foi possível copiar o texto automaticamente.");
    });
}

// ==========================================================================
// 8. CONFIGURAÇÃO DE EVENTOS E INICIALIZAÇÃO
// ==========================================================================
function inicializarEventos() {
  // Filtro por abas de categorias
  const botoesCategoria = containerCategorias.querySelectorAll(".btn-categoria");
  botoesCategoria.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoesCategoria.forEach(function (b) { b.classList.remove("active"); });
      botao.classList.add("active");

      categoriaAtual = botao.dataset.cat;
      renderizarProdutos();
    });
  });

  // Busca em tempo real
  campoBusca.addEventListener("input", function (e) {
    textoBusca = e.target.value.trim();
    renderizarProdutos();
  });

  btnLimparBusca.addEventListener("click", function () {
    campoBusca.value = "";
    textoBusca = "";
    renderizarProdutos();
    campoBusca.focus();
  });

  // Mudança no tipo de entrega
  tipoEntrega.addEventListener("change", function () {
    if (tipoEntrega.value === "mesa") {
      labelLocal.textContent = "Número da Mesa *";
      localEntrega.placeholder = "Ex: Mesa 05";
      localEntrega.required = true;
    } else if (tipoEntrega.value === "delivery") {
      labelLocal.textContent = "Endereço Completo para Entrega *";
      localEntrega.placeholder = "Ex: Rua das Palmeiras, 100 - Bairro Centro";
      localEntrega.required = true;
    } else {
      labelLocal.textContent = "Ponto de Retirada";
      localEntrega.placeholder = "Balcão Principal";
      localEntrega.required = false;
    }
  });

  // Botões de Ação
  btnEsvaziarCarrinho.addEventListener("click", esvaziarCarrinho);
  btnFinalizarPedido.addEventListener("click", finalizarPedido);
  btnEnviarWhatsapp.addEventListener("click", enviarWhatsApp);
  btnCopiarRecibo.addEventListener("click", copiarRecibo);
  btnNovoPedido.addEventListener("click", function () {
    secaoRecibo.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Expor funções chamadas inline no HTML
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.alterarQuantidade = alterarQuantidade;
window.removerDoCarrinho = removerDoCarrinho;

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  renderizarProdutos();
  atualizarCarrinhoUI();
  inicializarEventos();
});
