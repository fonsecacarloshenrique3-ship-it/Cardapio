/**
 * ==========================================================================
 * VIEW LAYER - MODAL VIEW (src/js/views/ModalView.js)
 * ==========================================================================
 */

import { formatarPreco } from "./ProductView.js";

export class ModalView {
  constructor() {
    this.modalPedido = document.getElementById("modal-pedido");
    this.modalEditar = document.getElementById("modal-editar-produto");
    this.modalConfig = document.getElementById("modal-configuracoes");

    this.tipoAtendimentoSelect = document.getElementById("tipo-atendimento");
    this.formaPagamentoSelect = document.getElementById("forma-pagamento");
    this.rotuloLocal = document.getElementById("rotulo-local");
    this.clienteLocalInput = document.getElementById("cliente-local");
    this.linhaTaxaEntrega = document.getElementById("linha-taxa-entrega");
    this.grupoPix = document.getElementById("grupo-pix");
    this.grupoTroco = document.getElementById("grupo-troco");
  }

  abrirModal(modal) {
    if (!modal) return;
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "true");
    }
  }

  fecharModal(modal) {
    if (!modal) return;
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  }

  atualizarCamposAtendimento(taxaEntrega = 5.00) {
    if (!this.tipoAtendimentoSelect) return;
    const tipo = this.tipoAtendimentoSelect.value;

    if (tipo === "Delivery") {
      if (this.rotuloLocal) this.rotuloLocal.textContent = "Endereço Completo de Entrega *";
      if (this.clienteLocalInput) {
        this.clienteLocalInput.placeholder = "Rua, Número, Bairro, Ponto de Referência";
        this.clienteLocalInput.required = true;
      }
      if (this.linhaTaxaEntrega) this.linhaTaxaEntrega.style.display = "flex";
    } else if (tipo === "Mesa") {
      if (this.rotuloLocal) this.rotuloLocal.textContent = "Número da Mesa *";
      if (this.clienteLocalInput) {
        this.clienteLocalInput.placeholder = "Ex: Mesa 05";
        this.clienteLocalInput.required = true;
      }
      if (this.linhaTaxaEntrega) this.linhaTaxaEntrega.style.display = "none";
    } else {
      if (this.rotuloLocal) this.rotuloLocal.textContent = "Ponto de Retirada";
      if (this.clienteLocalInput) {
        this.clienteLocalInput.placeholder = "Retirada no Balcão do Restaurante";
        this.clienteLocalInput.required = false;
      }
      if (this.linhaTaxaEntrega) this.linhaTaxaEntrega.style.display = "none";
    }
  }

  atualizarCamposPagamento() {
    if (!this.formaPagamentoSelect) return;
    const forma = this.formaPagamentoSelect.value;
    if (this.grupoPix) this.grupoPix.style.display = (forma === "PIX") ? "block" : "none";
    if (this.grupoTroco) this.grupoTroco.style.display = (forma === "Dinheiro") ? "block" : "none";
  }

  preencherFormEdicao(prod) {
    document.getElementById("edit-id").value = prod.id;
    document.getElementById("edit-nome").value = prod.nome;
    document.getElementById("edit-categoria").value = prod.categoria;
    document.getElementById("edit-preco").value = prod.preco;
    document.getElementById("edit-badge").value = prod.badge || "";
    document.getElementById("edit-imagem").value = prod.imagem || "";
    document.getElementById("edit-descricao").value = prod.descricao || "";
  }

  preencherFormConfig(config) {
    document.getElementById("config-nome-loja").value = config.nomeLoja || "";
    document.getElementById("config-whatsapp").value = config.whatsapp || "";
    document.getElementById("config-taxa-entrega").value = config.taxaEntrega || 0;
    document.getElementById("config-chave-pix").value = config.chavePix || "";
  }

  atualizarHeaderConfig(config) {
    const elNomeLoja = document.getElementById("display-nome-loja");
    const elTaxaBadge = document.getElementById("display-taxa-badge");
    const elPixChave = document.getElementById("pix-chave-texto");

    if (elNomeLoja) elNomeLoja.textContent = config.nomeLoja;
    if (elTaxaBadge) elTaxaBadge.textContent = `🛵 Entrega ${formatarPreco(config.taxaEntrega)}`;
    if (elPixChave) elPixChave.textContent = config.chavePix;
  }
}
