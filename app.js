// ==========================================================================
// CARDÁPIO DIGITAL - SELEÇÃO DE PEDIDOS COM PREÇO
// ==========================================================================

// Elementos da tela
const campo = document.getElementById("campo");
const campoPreco = document.getElementById("campo-preco");
const botao = document.getElementById("botao");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const totalPedido = document.getElementById("total-pedido");
const btnLimpar = document.getElementById("btn-limpar");
const btnPedir = document.getElementById("btn-pedir");

// Formatar número como moeda brasileira (R$)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// NÍVEL 3: Atualiza o contador de selecionados e a soma total do pedido
function atualizarContador() {
  const totalItens = lista.children.length;
  const selecionados = document.querySelectorAll("#lista li.selecionado");
  const qtdSelecionados = selecionados.length;

  let valorTotal = 0;
  selecionados.forEach(function (item) {
    const preco = parseFloat(item.dataset.preco) || 0;
    valorTotal += preco;
  });

  // Atualiza os textos na tela
  if (totalItens === 0) {
    contador.textContent = "0 itens no cardápio";
  } else {
    contador.textContent = qtdSelecionados + " de " + totalItens + " selecionados";
  }

  totalPedido.textContent = "Total: " + formatarMoeda(valorTotal);
}

// Cria um elemento <li> na lista do cardápio
function criarItemCardapio(nome, preco, jaSelecionado = false) {
  const item = document.createElement("li");
  item.dataset.preco = preco;
  if (jaSelecionado) item.classList.add("selecionado");

  // Div com texto, check e preço
  const info = document.createElement("div");
  info.className = "item-info";

  const check = document.createElement("span");
  check.className = "item-check";
  check.textContent = jaSelecionado ? "✅" : "⚪";

  const nomeEl = document.createElement("span");
  nomeEl.className = "item-nome";
  nomeEl.textContent = nome;

  const precoEl = document.createElement("span");
  precoEl.className = "item-preco";
  precoEl.textContent = formatarMoeda(preco);

  info.appendChild(check);
  info.appendChild(nomeEl);
  info.appendChild(precoEl);
  item.appendChild(info);

  // NÍVEL 1: Clicar para selecionar ou desmarcar do pedido
  item.addEventListener("click", function () {
    item.classList.toggle("selecionado");
    const isChecked = item.classList.contains("selecionado");
    check.textContent = isChecked ? "✅" : "⚪";
    atualizarContador();
  });

  // NÍVEL 2: Botão de apagar (✕) do cardápio
  const btnApagar = document.createElement("button");
  btnApagar.textContent = "✕";
  btnApagar.className = "btn-apagar";
  btnApagar.title = "Remover do cardápio";

  btnApagar.addEventListener("click", function (event) {
    event.stopPropagation();
    item.remove();
    atualizarContador();
  });

  item.appendChild(btnApagar);
  lista.appendChild(item);

  atualizarContador();
}

// Função para adicionar novo item digitado
function adicionarItem() {
  const texto = campo.value.trim();
  const precoValor = parseFloat(campoPreco.value);

  if (texto === "") {
    alert("Por favor, digite o nome do item!");
    campo.focus();
    return;
  }

  if (isNaN(precoValor) || precoValor < 0) {
    alert("Por favor, digite um preço válido!");
    campoPreco.focus();
    return;
  }

  criarItemCardapio(texto, precoValor, false);

  campo.value = "";
  campoPreco.value = "";
  campo.focus();
}

// Clique no botão Adicionar
botao.addEventListener("click", adicionarItem);

// NÍVEL 4 (Extra 1): Pressionar "Enter" nos campos para adicionar
campo.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    if (campoPreco.value === "") {
      campoPreco.focus();
    } else {
      adicionarItem();
    }
  }
});

campoPreco.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    adicionarItem();
  }
});

// NÍVEL 4 (Extra 2): Botão "Limpar Selecionados" (desmarca os itens do pedido)
btnLimpar.addEventListener("click", function () {
  const selecionados = document.querySelectorAll("#lista li.selecionado");
  selecionados.forEach(function (item) {
    item.classList.remove("selecionado");
    const check = item.querySelector(".item-check");
    if (check) check.textContent = "⚪";
  });
  atualizarContador();
});

// NÍVEL 4 (Extra 3): Botão "Enviar Pedido via WhatsApp"
btnPedir.addEventListener("click", function () {
  const selecionados = document.querySelectorAll("#lista li.selecionado");
  if (selecionados.length === 0) {
    alert("Selecione pelo menos um item para fazer seu pedido!");
    return;
  }

  let mensagem = "*NOVO PEDIDO - CARDÁPIO*\n\n";
  let total = 0;

  selecionados.forEach(function (item) {
    const nome = item.querySelector(".item-nome").textContent;
    const preco = parseFloat(item.dataset.preco) || 0;
    total += preco;
    mensagem += "• " + nome + " (" + formatarMoeda(preco) + ")\n";
  });

  mensagem += "\n*Total do Pedido:* " + formatarMoeda(total);

  const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
});

// ITENS PADRÃO INICIAIS DO CARDÁPIO
const itensIniciais = [
  { nome: "🍔 X-Burger Especial", preco: 25.00 },
  { nome: "🥓 X-Bacon Artesanal", preco: 29.90 },
  { nome: "🍟 Batata Frita Grande", preco: 16.00 },
  { nome: "🥤 Refrigerante Lata 350ml", preco: 6.50 },
  { nome: "🍨 Sobremesa Brownie", preco: 14.00 }
];

// Carrega os itens iniciais na tela
itensIniciais.forEach(function (it) {
  criarItemCardapio(it.nome, it.preco, false);
});

