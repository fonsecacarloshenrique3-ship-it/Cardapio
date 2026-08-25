/**
 * ==========================================================================
 * MODEL LAYER - PRODUCT MODEL (src/js/models/ProductModel.js)
 * ==========================================================================
 */

export const PRODUTOS_PADRAO = [
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

export class ProductModel {
  constructor() {
    this.produtos = this.carregarProdutos();
  }

  carregarProdutos() {
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

  salvarProdutos() {
    try {
      localStorage.setItem("cardapio_gourmet_v2_produtos", JSON.stringify(this.produtos));
    } catch (e) {
      console.error("Erro ao salvar produtos:", e);
    }
  }

  obterTodos() {
    return this.produtos;
  }

  obterPorId(id) {
    return this.produtos.find(p => p.id === id);
  }

  filtrar(categoria = "todos", termo = "") {
    return this.produtos.filter(p => {
      const matchCat = categoria === "todos" || p.categoria === categoria;
      const matchBusca = termo === "" ||
        p.nome.toLowerCase().includes(termo.toLowerCase()) ||
        (p.descricao && p.descricao.toLowerCase().includes(termo.toLowerCase()));
      return matchCat && matchBusca;
    });
  }

  adicionar(produtoData) {
    const iconesPorCat = {
      lanches: "🍔",
      porcoes: "🍟",
      bebidas: "🥤",
      sobremesas: "🍰"
    };

    const novoProduto = {
      id: Date.now(),
      nome: produtoData.nome,
      categoria: produtoData.categoria,
      preco: produtoData.preco,
      icone: iconesPorCat[produtoData.categoria] || "🍽️",
      badge: produtoData.badge || "",
      imagem: produtoData.imagem || "",
      descricao: produtoData.descricao || "Produto artesanal preparado na hora."
    };

    this.produtos.unshift(novoProduto);
    this.salvarProdutos();
    return novoProduto;
  }

  atualizar(id, produtoData) {
    const idx = this.produtos.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.produtos[idx] = {
        ...this.produtos[idx],
        ...produtoData
      };
      this.salvarProdutos();
      return this.produtos[idx];
    }
    return null;
  }

  excluir(id) {
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.salvarProdutos();
  }
}
