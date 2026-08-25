/**
 * ==========================================================================
 * CONTROLLER LAYER - APP CONTROLLER (src/js/controllers/AppController.js)
 * ==========================================================================
 */

import { ProductModel } from "../models/ProductModel.js";
import { CartModel } from "../models/CartModel.js";
import { ConfigModel, CONFIG_PADRAO } from "../models/ConfigModel.js";

import { ProductView, formatarPreco } from "../views/ProductView.js";
import { CartView } from "../views/CartView.js";
import { ModalView } from "../views/ModalView.js";
import { ToastView } from "../views/ToastView.js";

export class AppController {
  constructor() {
    this.productModel = new ProductModel();
    this.cartModel = new CartModel();
    this.configModel = new ConfigModel();

    this.productView = new ProductView();
    this.cartView = new CartView();
    this.modalView = new ModalView();

    this.categoriaAtiva = "todos";
    this.termoBusca = "";
  }

  iniciar() {
    this.configurarEventos();
    this.atualizarInterface();
  }

  atualizarInterface() {
    const config = this.configModel.obter();
    this.modalView.atualizarHeaderConfig(config);

    const produtosFiltrados = this.productModel.filtrar(this.categoriaAtiva, this.termoBusca);
    this.productView.renderizar(produtosFiltrados, this.cartModel, this.categoriaAtiva, this.termoBusca);

    const tipoAtendimento = document.getElementById("tipo-atendimento")?.value || "Delivery";
    const ehDelivery = (tipoAtendimento === "Delivery");
    const totais = this.cartModel.calcularTotais(config.taxaEntrega, ehDelivery);

    this.cartView.atualizarDock(totais);
    this.cartView.renderizarModalItens(this.cartModel.obterItens(), totais);
  }

  configurarEventos() {
    // Busca em tempo real
    const campoBusca = document.getElementById("campo-busca");
    const btnLimparBusca = document.getElementById("btn-limpar-busca");
    const btnResetBusca = document.getElementById("btn-reset-busca");

    if (campoBusca) {
      campoBusca.addEventListener("input", (e) => {
        this.termoBusca = e.target.value.trim();
        if (btnLimparBusca) btnLimparBusca.style.display = this.termoBusca ? "flex" : "none";
        this.atualizarInterface();
      });
    }

    if (btnLimparBusca) {
      btnLimparBusca.addEventListener("click", () => {
        if (campoBusca) campoBusca.value = "";
        this.termoBusca = "";
        btnLimparBusca.style.display = "none";
        this.atualizarInterface();
        if (campoBusca) campoBusca.focus();
      });
    }

    if (btnResetBusca) {
      btnResetBusca.addEventListener("click", () => {
        if (campoBusca) campoBusca.value = "";
        this.termoBusca = "";
        this.categoriaAtiva = "todos";
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === "todos"));
        if (btnLimparBusca) btnLimparBusca.style.display = "none";
        this.atualizarInterface();
      });
    }

    // Abas de categorias
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.categoriaAtiva = btn.dataset.cat;
        this.atualizarInterface();
      });
    });

    // Eventos delegados na Grid de produtos
    const grid = document.getElementById("grid-produtos");
    if (grid) {
      grid.addEventListener("click", (e) => {
        const btnAdd = e.target.closest(".btn-adicionar-cart");
        const btnAumentar = e.target.closest(".btn-aumentar");
        const btnDiminuir = e.target.closest(".btn-diminuir");
        const btnEditar = e.target.closest(".btn-editar-prod");
        const btnExcluir = e.target.closest(".btn-excluir-prod");

        if (btnAdd) {
          const id = parseInt(btnAdd.dataset.id);
          const prod = this.productModel.obterPorId(id);
          if (prod) {
            this.cartModel.adicionarItem(prod);
            this.atualizarInterface();
            ToastView.mostrarToast(`${prod.nome} adicionado!`, "🛒");
          }
        } else if (btnAumentar) {
          const id = parseInt(btnAumentar.dataset.id);
          this.cartModel.alterarQuantidade(id, 1);
          this.atualizarInterface();
        } else if (btnDiminuir) {
          const id = parseInt(btnDiminuir.dataset.id);
          this.cartModel.alterarQuantidade(id, -1);
          this.atualizarInterface();
        } else if (btnEditar) {
          const id = parseInt(btnEditar.dataset.id);
          const prod = this.productModel.obterPorId(id);
          if (prod) {
            this.modalView.preencherFormEdicao(prod);
            this.modalView.abrirModal(this.modalView.modalEditar);
          }
        } else if (btnExcluir) {
          const id = parseInt(btnExcluir.dataset.id);
          const prod = this.productModel.obterPorId(id);
          if (prod) {
            ToastView.solicitarConfirmacao(
              "Excluir Produto?",
              `Deseja remover "${prod.nome}" permanentemente do cardápio?`,
              "🗑️",
              () => {
                this.productModel.excluir(id);
                this.cartModel.removerItem(id);
                this.atualizarInterface();
                ToastView.fecharModalConfirmacao();
                ToastView.mostrarToast("Produto excluído!", "🗑️");
              }
            );
          }
        }
      });
    }

    // Modal Checkout
    const btnAbrirPedido = document.getElementById("btn-abrir-pedido");
    const btnFecharModal = document.getElementById("btn-fechar-modal");
    const btnLimparTudo = document.getElementById("btn-limpar-tudo");
    const btnEnviarWhatsApp = document.getElementById("btn-enviar-whatsapp");

    if (btnAbrirPedido) {
      btnAbrirPedido.addEventListener("click", () => {
        this.atualizarInterface();
        this.modalView.abrirModal(this.modalView.modalPedido);
      });
    }

    if (btnFecharModal) {
      btnFecharModal.addEventListener("click", () => {
        this.modalView.fecharModal(this.modalView.modalPedido);
      });
    }

    if (btnLimparTudo) {
      btnLimparTudo.addEventListener("click", () => {
        if (this.cartModel.obterItens().length === 0) return;
        ToastView.solicitarConfirmacao(
          "Esvaziar Carrinho?",
          "Deseja remover todos os itens selecionados do seu pedido?",
          "🧹",
          () => {
            this.cartModel.limpar();
            this.atualizarInterface();
            this.modalView.fecharModal(this.modalView.modalPedido);
            ToastView.fecharModalConfirmacao();
            ToastView.mostrarToast("Carrinho esvaziado!", "🧹");
          }
        );
      });
    }

    if (btnEnviarWhatsApp) {
      btnEnviarWhatsApp.addEventListener("click", () => this.finalizarPedidoWhatsApp());
    }

    // Modal de Itens no Checkout (steppers inline)
    const listaModal = document.getElementById("pedido-itens-lista");
    if (listaModal) {
      listaModal.addEventListener("click", (e) => {
        const btnAumentar = e.target.closest(".btn-modal-aumentar");
        const btnDiminuir = e.target.closest(".btn-modal-diminuir");
        if (btnAumentar) {
          this.cartModel.alterarQuantidade(parseInt(btnAumentar.dataset.id), 1);
          this.atualizarInterface();
        } else if (btnDiminuir) {
          this.cartModel.alterarQuantidade(parseInt(btnDiminuir.dataset.id), -1);
          this.atualizarInterface();
        }
      });
    }

    // Selects Atendimento e Pagamento
    const tipoAtendimentoSelect = document.getElementById("tipo-atendimento");
    const formaPagamentoSelect = document.getElementById("forma-pagamento");

    if (tipoAtendimentoSelect) {
      tipoAtendimentoSelect.addEventListener("change", () => {
        this.modalView.atualizarCamposAtendimento(this.configModel.obter().taxaEntrega);
        this.atualizarInterface();
      });
    }

    if (formaPagamentoSelect) {
      formaPagamentoSelect.addEventListener("change", () => {
        this.modalView.atualizarCamposPagamento();
      });
    }

    // Copiar PIX
    const btnCopiarPix = document.getElementById("btn-copiar-pix");
    if (btnCopiarPix) {
      btnCopiarPix.addEventListener("click", () => {
        const chave = this.configModel.obter().chavePix || CONFIG_PADRAO.chavePix;
        navigator.clipboard.writeText(chave).then(() => {
          ToastView.mostrarToast("Chave PIX copiada!", "⚡");
        }).catch(() => {
          ToastView.mostrarToast("Chave: " + chave, "📋");
        });
      });
    }

    // Modal de Edição de Produto
    const btnFecharEditar = document.getElementById("btn-fechar-editar");
    const btnSalvarEdicao = document.getElementById("btn-salvar-edicao");

    if (btnFecharEditar) {
      btnFecharEditar.addEventListener("click", () => {
        this.modalView.fecharModal(this.modalView.modalEditar);
      });
    }

    if (btnSalvarEdicao) {
      btnSalvarEdicao.addEventListener("click", () => {
        const id = parseInt(document.getElementById("edit-id").value);
        const nome = document.getElementById("edit-nome").value.trim();
        const categoria = document.getElementById("edit-categoria").value;
        const preco = parseFloat(document.getElementById("edit-preco").value);
        const badge = document.getElementById("edit-badge").value;
        const imagem = document.getElementById("edit-imagem").value.trim();
        const descricao = document.getElementById("edit-descricao").value.trim();

        if (!nome || isNaN(preco) || preco <= 0) {
          ToastView.mostrarToast("Preencha nome e preço válido!", "⚠️");
          return;
        }

        this.productModel.atualizar(id, { nome, categoria, preco, badge, imagem, descricao });
        this.atualizarInterface();
        this.modalView.fecharModal(this.modalView.modalEditar);
        ToastView.mostrarToast("Produto atualizado!", "✨");
      });
    }

    // Modal de Configurações
    const btnAbrirConfig = document.getElementById("btn-abrir-config");
    const btnFecharConfig = document.getElementById("btn-fechar-config");
    const btnSalvarConfig = document.getElementById("btn-salvar-config");

    if (btnAbrirConfig) {
      btnAbrirConfig.addEventListener("click", () => {
        this.modalView.preencherFormConfig(this.configModel.obter());
        this.modalView.abrirModal(this.modalView.modalConfig);
      });
    }

    if (btnFecharConfig) {
      btnFecharConfig.addEventListener("click", () => {
        this.modalView.fecharModal(this.modalView.modalConfig);
      });
    }

    if (btnSalvarConfig) {
      btnSalvarConfig.addEventListener("click", () => {
        const nomeLoja = document.getElementById("config-nome-loja").value.trim() || CONFIG_PADRAO.nomeLoja;
        const whatsapp = document.getElementById("config-whatsapp").value.replace(/\D/g, "") || CONFIG_PADRAO.whatsapp;
        const taxaEntrega = parseFloat(document.getElementById("config-taxa-entrega").value) || 0;
        const chavePix = document.getElementById("config-chave-pix").value.trim() || CONFIG_PADRAO.chavePix;

        this.configModel.salvarConfig({ nomeLoja, whatsapp, taxaEntrega, chavePix });
        this.atualizarInterface();
        this.modalView.fecharModal(this.modalView.modalConfig);
        ToastView.mostrarToast("Configurações salvas!", "⚙️");
      });
    }

    // Cadastro de Novo Produto
    const btnSalvarNovo = document.getElementById("btn-salvar-novo");
    if (btnSalvarNovo) {
      btnSalvarNovo.addEventListener("click", () => {
        const novoNomeInput = document.getElementById("novo-nome");
        const novaCategoriaSelect = document.getElementById("nova-categoria");
        const novoPrecoInput = document.getElementById("novo-preco");
        const novoBadgeSelect = document.getElementById("novo-badge");
        const novaImagemInput = document.getElementById("nova-imagem");
        const novaDescricaoInput = document.getElementById("nova-descricao");

        const nome = novoNomeInput.value.trim();
        const categoria = novaCategoriaSelect.value;
        const preco = parseFloat(novoPrecoInput.value);
        const badge = novoBadgeSelect ? novoBadgeSelect.value : "";
        const imagem = novaImagemInput ? novaImagemInput.value.trim() : "";
        const descricao = novaDescricaoInput.value.trim();

        if (!nome || isNaN(preco) || preco <= 0) {
          ToastView.mostrarToast("Informe nome e preço válido!", "⚠️");
          return;
        }

        this.productModel.adicionar({ nome, categoria, preco, badge, imagem, descricao });

        novoNomeInput.value = "";
        novoPrecoInput.value = "";
        if (novaImagemInput) novaImagemInput.value = "";
        novaDescricaoInput.value = "";

        const details = document.getElementById("accordion-cadastro");
        if (details) details.removeAttribute("open");

        this.atualizarInterface();
        ToastView.mostrarToast(`"${nome}" cadastrado!`, "✨");
      });
    }

    // Modal de Confirmação Botões
    const btnCancelConfirm = document.getElementById("btn-confirm-cancelar");
    const btnOkConfirm = document.getElementById("btn-confirm-ok");

    if (btnCancelConfirm) btnCancelConfirm.addEventListener("click", ToastView.fecharModalConfirmacao);
    if (btnOkConfirm) {
      btnOkConfirm.addEventListener("click", () => {
        if (typeof window.acaoConfirmacaoPendente === "function") {
          window.acaoConfirmacaoPendente();
        } else {
          ToastView.fecharModalConfirmacao();
        }
      });
    }

    // Fechar modais ao clicar no backdrop (Target check seguro)
    const modais = [this.modalView.modalPedido, this.modalView.modalEditar, this.modalView.modalConfig, document.getElementById("modal-confirmacao")];
    modais.forEach(mod => {
      if (mod) {
        mod.addEventListener("click", (e) => {
          if (e.target === mod) {
            this.modalView.fecharModal(mod);
            if (mod.id === "modal-confirmacao") ToastView.fecharModalConfirmacao();
          }
        });
      }
    });
  }

  finalizarPedidoWhatsApp() {
    const itens = this.cartModel.obterItens();
    if (itens.length === 0) {
      ToastView.mostrarToast("Seu carrinho está vazio!", "⚠️");
      return;
    }

    const clienteNomeInput = document.getElementById("cliente-nome");
    const tipoAtendimentoSelect = document.getElementById("tipo-atendimento");
    const clienteLocalInput = document.getElementById("cliente-local");
    const formaPagamentoSelect = document.getElementById("forma-pagamento");
    const pedidoTrocoInput = document.getElementById("pedido-troco");
    const pedidoObsInput = document.getElementById("pedido-obs");

    const nome = clienteNomeInput ? clienteNomeInput.value.trim() : "";
    const tipo = tipoAtendimentoSelect ? tipoAtendimentoSelect.value : "Delivery";
    const local = clienteLocalInput ? clienteLocalInput.value.trim() : "";
    const pagamento = formaPagamentoSelect ? formaPagamentoSelect.value : "PIX";
    const troco = pedidoTrocoInput ? pedidoTrocoInput.value.trim() : "";
    const obs = pedidoObsInput ? pedidoObsInput.value.trim() : "";

    if (!nome) {
      ToastView.mostrarToast("Informe seu nome completo!", "⚠️");
      if (clienteNomeInput) clienteNomeInput.focus();
      return;
    }

    if (tipo !== "Balcão" && !local) {
      ToastView.mostrarToast("Informe a mesa ou endereço!", "⚠️");
      if (clienteLocalInput) clienteLocalInput.focus();
      return;
    }

    const config = this.configModel.obter();
    const ehDelivery = (tipo === "Delivery");
    const { subtotalValor, taxaEntrega, totalGeral } = this.cartModel.calcularTotais(config.taxaEntrega, ehDelivery);
    const agora = new Date().toLocaleString("pt-BR");

    let texto = `*🍽️ NOVO PEDIDO - ${config.nomeLoja.toUpperCase()}*\n`;
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

    itens.forEach(it => {
      texto += `• ${it.quantidade}x ${it.nome} - ${formatarPreco(it.preco * it.quantidade)}\n`;
    });

    texto += `----------------------------------------\n`;
    texto += `💰 *Subtotal:* ${formatarPreco(subtotalValor)}\n`;
    if (ehDelivery) {
      texto += `🛵 *Taxa de Entrega:* ${formatarPreco(taxaEntrega)}\n`;
    }
    texto += `✨ *TOTAL A PAGAR:* ${formatarPreco(totalGeral)}\n`;
    texto += `----------------------------------------\n`;

    if (obs) {
      texto += `📝 *Observações:* ${obs}\n`;
    }

    const numeroWhats = config.whatsapp || CONFIG_PADRAO.whatsapp;
    const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");

    this.modalView.fecharModal(this.modalView.modalPedido);
    ToastView.solicitarConfirmacao(
      "Pedido Enviado!",
      "Seu pedido foi enviado para o WhatsApp. Deseja limpar o carrinho?",
      "📲",
      () => {
        this.cartModel.limpar();
        this.atualizarInterface();
        ToastView.fecharModalConfirmacao();
      }
    );
  }
}

// Inicializa quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
  const app = new AppController();
  app.iniciar();
});
