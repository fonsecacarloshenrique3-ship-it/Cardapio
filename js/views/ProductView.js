/**
 * ==========================================================================
 * VIEW LAYER - PRODUCT VIEW (src/js/views/ProductView.js)
 * ==========================================================================
 */

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function formatarPreco(valor) {
  return formatadorMoeda.format(valor || 0);
}

export class ProductView {
  constructor() {
    this.grid = document.getElementById("grid-produtos");
    this.alertaVazio = document.getElementById("vazio-alerta");
    this.tituloCat = document.getElementById("titulo-categoria");
    this.badgeTotal = document.getElementById("badge-total-itens");
  }

  renderizar(produtos, carrinhoModel, categoriaAtiva = "todos", termoBusca = "") {
    if (!this.grid) return;

    const nomesCategorias = {
      todos: "Todos os Produtos",
      lanches: "🍔 Lanches Artesanais",
      porcoes: "🍟 Porções & Petiscos",
      bebidas: "🥤 Bebidas Geladas",
      sobremesas: "🍰 Sobremesas Gourmet"
    };

    if (this.tituloCat) {
      this.tituloCat.textContent = termoBusca ? `Resultados para "${termoBusca}"` : (nomesCategorias[categoriaAtiva] || "Cardápio");
    }
    if (this.badgeTotal) {
      this.badgeTotal.textContent = `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;
    }

    if (produtos.length === 0) {
      this.grid.innerHTML = "";
      if (this.alertaVazio) this.alertaVazio.style.display = "block";
      return;
    }
    if (this.alertaVazio) this.alertaVazio.style.display = "none";

    this.grid.innerHTML = produtos.map(p => {
      const qtdNoCarrinho = carrinhoModel.obterQtdItem(p.id);
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
                  <button class="btn-step btn-diminuir" data-id="${p.id}" title="Diminuir" aria-label="Diminuir quantidade">-</button>
                  <span class="step-valor">${qtdNoCarrinho}</span>
                  <button class="btn-step btn-aumentar" data-id="${p.id}" title="Aumentar" aria-label="Aumentar quantidade">+</button>
                </div>
              ` : `
                <button class="btn-pedir-card btn-adicionar-cart" data-id="${p.id}">
                  + Adicionar
                </button>
              `}
              <button class="btn-card-action btn-editar-prod" data-id="${p.id}" title="Editar produto" aria-label="Editar produto">✏️</button>
              <button class="btn-card-action btn-excluir-prod" data-id="${p.id}" title="Remover produto" aria-label="Remover produto">🗑️</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }
}
