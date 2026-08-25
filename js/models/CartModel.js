/**
 * ==========================================================================
 * MODEL LAYER - CART MODEL (src/js/models/CartModel.js)
 * ==========================================================================
 */

export class CartModel {
  constructor() {
    this.carrinho = this.carregarCarrinho();
  }

  carregarCarrinho() {
    try {
      const salvos = localStorage.getItem("cardapio_pro_carrinho");
      return salvos ? JSON.parse(salvos) : [];
    } catch (e) {
      console.error("Erro ao carregar carrinho:", e);
      return [];
    }
  }

  salvarCarrinho() {
    try {
      localStorage.setItem("cardapio_pro_carrinho", JSON.stringify(this.carrinho));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  }

  obterItens() {
    return this.carrinho;
  }

  obterQtdItem(produtoId) {
    const item = this.carrinho.find(it => it.id === produtoId);
    return item ? item.quantidade : 0;
  }

  adicionarItem(produto) {
    const existente = this.carrinho.find(it => it.id === produto.id);
    if (existente) {
      existente.quantidade += 1;
      existente.preco = produto.preco;
      existente.nome = produto.nome;
    } else {
      this.carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        icone: produto.icone,
        imagem: produto.imagem,
        quantidade: 1
      });
    }
    this.salvarCarrinho();
  }

  alterarQuantidade(produtoId, delta) {
    const index = this.carrinho.findIndex(it => it.id === produtoId);
    if (index === -1) return;

    this.carrinho[index].quantidade += delta;

    if (this.carrinho[index].quantidade <= 0) {
      this.carrinho.splice(index, 1);
    }

    this.salvarCarrinho();
  }

  removerItem(produtoId) {
    this.carrinho = this.carrinho.filter(it => it.id !== produtoId);
    this.salvarCarrinho();
  }

  limpar() {
    this.carrinho = [];
    this.salvarCarrinho();
  }

  calcularTotais(taxaEntrega = 0, ehDelivery = true) {
    const totalQtd = this.carrinho.reduce((soma, it) => soma + it.quantidade, 0);
    const subtotalValor = this.carrinho.reduce((soma, it) => soma + (it.preco * it.quantidade), 0);
    const taxa = (ehDelivery && totalQtd > 0) ? taxaEntrega : 0;
    const totalGeral = subtotalValor + taxa;

    return { totalQtd, subtotalValor, taxaEntrega: taxa, totalGeral };
  }
}
