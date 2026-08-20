/**
 * ==========================================================================
 * CARDÁPIO DIGITAL INTERATIVO - APLICAÇÃO WEB
 * ==========================================================================
 */

// ==========================================================================
// 1. BANCO DE DADOS DE PRODUTOS E CATEGORIAS
// ==========================================================================
const CATEGORIES = [
  { id: 'todos', name: 'Todos', icon: '🍽️' },
  { id: 'combos', name: 'Combos', icon: '🌟' },
  { id: 'lanches', name: 'Lanches', icon: '🍔' },
  { id: 'porcoes', name: 'Porções', icon: '🍟' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'sobremesas', name: 'Sobremesas', icon: '🍰' }
];

const PRODUCTS = [
  // COMBOS
  {
    id: 1,
    name: 'Combo Smash Master',
    category: 'combos',
    price: 44.90,
    icon: '🍔',
    tag: 'Mais Vendido',
    description: '1 Smash Burger Duplo + 1 Batata Frita Individual + 1 Refrigerante Lata 350ml.'
  },
  {
    id: 2,
    name: 'Combo Casal Gourmet',
    category: 'combos',
    price: 79.90,
    icon: '🌟',
    tag: 'Especial',
    description: '2 Hambúrgueres Artesanais à sua escolha + 1 Porção Grande de Fritas + 2 Bebidas.'
  },

  // LANCHES
  {
    id: 3,
    name: 'X-Bacon Artesanal',
    category: 'lanches',
    price: 34.50,
    icon: '🥓',
    tag: 'Favorito',
    description: 'Pão brioche selado na manteiga, blend bovino 160g, muito bacon crocante, queijo cheddar e maionese especial.'
  },
  {
    id: 4,
    name: 'Smash Duplo Cheddar',
    category: 'lanches',
    price: 29.90,
    icon: '🍔',
    tag: 'Artesanal',
    description: '2 carnes smash de 90g ultra prensadas com crostinha crocante, dobro de cheddar cremoso e cebola caramelizada.'
  },
  {
    id: 5,
    name: 'Chicken Crispy Supreme',
    category: 'lanches',
    price: 31.00,
    icon: '🍗',
    tag: 'Crocante',
    description: 'Sobrecoxa de frango empanada ultra crocante, alface americana fresca, picles artesanal e molho tártaro da casa.'
  },
  {
    id: 6,
    name: 'Veggie Melt Burger',
    category: 'lanches',
    price: 32.00,
    icon: '🥑',
    tag: 'Vegetariano',
    description: 'Hambúrguer artesanal de grão de bico e cogumelos frescos, queijo muçarela derretido, tomate confit e rúcula.'
  },

  // PORÇÕES
  {
    id: 7,
    name: 'Batata Rústica Cheddar & Bacon',
    category: 'porcoes',
    price: 28.90,
    icon: '🍟',
    tag: 'Top Porção',
    description: 'Batatas rústicas douradas e crocantes, cobertas com blend de queijo cheddar derretido e cubos de bacon.'
  },
  {
    id: 8,
    name: 'Anéis de Cebola Empanados',
    category: 'porcoes',
    price: 24.00,
    icon: '🧅',
    tag: 'Petisco',
    description: 'Anéis de cebola gigantes empanados em farinha especial crocante, servidos com molho barbecue artesanal.'
  },
  {
    id: 9,
    name: 'Coxinha Gourmet sem Massa (6 un)',
    category: 'porcoes',
    price: 26.50,
    icon: '🥟',
    tag: 'Delícia',
    description: 'Puro recheio de frango desfiado com requeijão cremoso, empanadas e fritas na hora com casquinha crocante.'
  },

  // BEBIDAS
  {
    id: 10,
    name: 'Coca-Cola Original 350ml',
    category: 'bebidas',
    price: 7.00,
    icon: '🥤',
    tag: 'Gelada',
    description: 'Lata 350ml trincando de gelada.'
  },
  {
    id: 11,
    name: 'Coca-Cola Sem Açúcar 350ml',
    category: 'bebidas',
    price: 7.00,
    icon: '🥤',
    tag: 'Zero',
    description: 'Lata 350ml trincando de gelada, sem calorias.'
  },
  {
    id: 12,
    name: 'Suco Natural de Laranja 500ml',
    category: 'bebidas',
    price: 11.00,
    icon: '🍊',
    tag: 'Natural',
    description: 'Suco feito na hora com 100% laranjas frescas selecionadas, sem adição de conservantes.'
  },
  {
    id: 13,
    name: 'Limonada Suíça com Hortelã 500ml',
    category: 'bebidas',
    price: 12.50,
    icon: '🍋',
    tag: 'Refrescante',
    description: 'Limões frescos batidos com leite condensado e folhas de hortelã fresca.'
  },

  // SOBREMESAS
  {
    id: 14,
    name: 'Milkshake de Nutella & Leite Ninho',
    category: 'sobremesas',
    price: 22.90,
    icon: '🍨',
    tag: 'Imperdível',
    description: 'Sorvete artesanal batido com Nutella pura legítima, borda recheada e finalizado com leite ninho em pó.'
  },
  {
    id: 15,
    name: 'Brownie Quentinho com Sorvete',
    category: 'sobremesas',
    price: 19.50,
    icon: '🍫',
    tag: 'Gourmet',
    description: 'Brownie de chocolate belga morno com castanhas, acompanhado de uma bola generosa de sorvete de baunilha.'
  },
  {
    id: 16,
    name: 'Pudim de Leite Condensado',
    category: 'sobremesas',
    price: 14.00,
    icon: '🍮',
    tag: 'Tradicional',
    description: 'Fatia generosa do clássico pudim aveludado sem furinhos, com calda de caramelo dourada.'
  }
];

// ==========================================================================
// 2. ESTADO DA APLICAÇÃO
// ==========================================================================
let currentCategory = 'todos';
let searchQuery = '';
let cart = loadCartFromStorage();
let lastCompletedOrderText = '';

// ==========================================================================
// 3. ELEMENTOS DO DOM
// ==========================================================================
const categoriesContainer = document.getElementById('categories-container');
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const currentCategoryTitle = document.getElementById('current-category-title');
const itemsCountBadge = document.getElementById('items-count-badge');
const emptyState = document.getElementById('empty-state');
const resetFiltersBtn = document.getElementById('reset-filters-btn');

// Carrinho Flutuante
const floatingCartBar = document.getElementById('floating-cart-bar');
const openCartBtn = document.getElementById('open-cart-btn');
const cartBadgeCount = document.getElementById('cart-badge-count');
const cartBadgeSummary = document.getElementById('cart-badge-summary');
const cartBadgeTotal = document.getElementById('cart-badge-total');

// Dialog Carrinho
const cartDialog = document.getElementById('cart-dialog');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartEmptyView = document.getElementById('cart-empty-view');
const orderForm = document.getElementById('order-form');
const cartFooter = document.getElementById('cart-footer');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');
const clearCartBtn = document.getElementById('clear-cart-btn');
const submitOrderBtn = document.getElementById('submit-order-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');

// Form inputs
const customerNameInput = document.getElementById('customer-name');
const orderTypeSelect = document.getElementById('order-type');
const customerLocationInput = document.getElementById('customer-location');
const locationLabel = document.getElementById('location-label');
const paymentMethodSelect = document.getElementById('payment-method');
const orderNotesInput = document.getElementById('order-notes');

// Dialog Sucesso
const successDialog = document.getElementById('success-dialog');
const orderReceiptPreview = document.getElementById('order-receipt-preview');
const whatsappSendBtn = document.getElementById('whatsapp-send-btn');
const copyOrderBtn = document.getElementById('copy-order-btn');
const newOrderBtn = document.getElementById('new-order-btn');

// Toast
const toast = document.getElementById('toast');

// ==========================================================================
// 4. FORMATADORES E UTILITÁRIOS
// ==========================================================================
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

function formatPrice(value) {
  return currencyFormatter.format(value);
}

function showToast(message, icon = '✅') {
  if (!toast) return;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');
  
  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ==========================================================================
// 5. GERENCIAMENTO DO CARRINHO (STORAGE & FUNÇÕES)
// ==========================================================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('cardapio_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Erro ao carregar carrinho:', e);
    return [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('cardapio_cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Erro ao salvar carrinho:', e);
  }
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`${product.name} adicionado ao pedido!`, '🛒');
}

function updateItemQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;

  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
    showToast('Item removido do pedido', '🗑️');
  }

  saveCartToStorage();
  updateCartUI();
}

function removeItemFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast('Item removido do pedido', '🗑️');
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast('Carrinho esvaziado com sucesso', '🧹');
}

function getCartTotals() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, subtotal, total: subtotal };
}

// ==========================================================================
// 6. RENDERIZAÇÃO DA INTERFACE (UI)
// ==========================================================================

// Renderiza abas de categorias
function renderCategories() {
  if (!categoriesContainer) return;

  categoriesContainer.innerHTML = CATEGORIES.map(cat => `
    <button 
      class="category-tab ${cat.id === currentCategory ? 'active' : ''}" 
      data-category="${cat.id}"
      aria-label="Categoria ${cat.name}"
    >
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');

  // Event listeners para as abas
  categoriesContainer.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}

// Renderiza lista de produtos
function renderProducts() {
  if (!productsGrid) return;

  // Filtragem por categoria e busca
  const filtered = PRODUCTS.filter(product => {
    const matchCategory = currentCategory === 'todos' || product.category === currentCategory;
    const matchSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Atualiza título da seção
  const currentCatObj = CATEGORIES.find(c => c.id === currentCategory);
  if (currentCategoryTitle) {
    currentCategoryTitle.textContent = currentCategory === 'todos' 
      ? (searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Itens') 
      : `${currentCatObj.icon} ${currentCatObj.name}`;
  }

  if (itemsCountBadge) {
    itemsCountBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'itens'}`;
  }

  // Estado vazio
  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Renderiza os cards
  productsGrid.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-top">
        <div class="product-icon">${product.icon}</div>
        <div class="product-details">
          <div class="product-header-row">
            <h3 class="product-title">${product.name}</h3>
            ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
          </div>
          <p class="product-desc">${product.description}</p>
        </div>
      </div>
      <div class="product-bottom">
        <span class="product-price">${formatPrice(product.price)}</span>
        <button class="btn-add-item" onclick="addToCart(${product.id})" aria-label="Adicionar ${product.name} ao pedido">
          <span>+ Adicionar</span>
        </button>
      </div>
    </article>
  `).join('');
}

// Atualiza toda a visualização do carrinho (Badge flutuante + Modal)
function updateCartUI() {
  const { totalItems, total } = getCartTotals();

  // 1. Atualizar Botão Flutuante
  if (cartBadgeCount) cartBadgeCount.textContent = totalItems;
  if (cartBadgeSummary) {
    cartBadgeSummary.textContent = totalItems === 0 
      ? 'Nenhum item adicionado' 
      : `${totalItems} ${totalItems === 1 ? 'item selecionado' : 'itens selecionados'}`;
  }
  if (cartBadgeTotal) cartBadgeTotal.textContent = formatPrice(total);

  // 2. Atualizar Lista dentro do Dialog
  if (cartItemsList) {
    if (cart.length === 0) {
      cartItemsList.innerHTML = '';
      if (cartEmptyView) cartEmptyView.style.display = 'block';
      if (orderForm) orderForm.style.display = 'none';
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      if (cartEmptyView) cartEmptyView.style.display = 'none';
      if (orderForm) orderForm.style.display = 'block';
      if (cartFooter) cartFooter.style.display = 'block';

      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.icon} ${item.name}</div>
            <div class="cart-item-unit-price">${formatPrice(item.price)} cada</div>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)" title="Diminuir quantidade" aria-label="Diminuir">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)" title="Aumentar quantidade" aria-label="Aumentar">+</button>
          </div>
          <div class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</div>
          <button class="cart-item-remove-btn" onclick="removeItemFromCart(${item.id})" title="Remover item" aria-label="Remover">✕</button>
        </div>
      `).join('');
    }
  }

  // 3. Atualizar Totais do Rodapé do Modal
  if (summarySubtotal) summarySubtotal.textContent = formatPrice(total);
  if (summaryTotal) summaryTotal.textContent = formatPrice(total);
}

// ==========================================================================
// 7. DIALOGS & FLUXO DE PEDIDO
// ==========================================================================

// Abrir e fechar Dialog do Carrinho
function openCart() {
  updateCartUI();
  if (cartDialog && typeof cartDialog.showModal === 'function') {
    cartDialog.showModal();
  }
}

function closeCart() {
  if (cartDialog) cartDialog.close();
}

// Adaptação dos campos conforme o tipo de pedido selecionado
function handleOrderTypeChange() {
  const type = orderTypeSelect.value;
  if (type === 'mesa') {
    locationLabel.textContent = 'Número da Mesa *';
    customerLocationInput.placeholder = 'Ex: Mesa 04';
    customerLocationInput.required = true;
  } else if (type === 'delivery') {
    locationLabel.textContent = 'Endereço Completo de Entrega *';
    customerLocationInput.placeholder = 'Ex: Rua das Flores, 123 - Apto 402 - Bairro';
    customerLocationInput.required = true;
  } else {
    locationLabel.textContent = 'Ponto de Retirada';
    customerLocationInput.placeholder = 'Balcão Principal';
    customerLocationInput.required = false;
  }
}

// Finalização do Pedido
function handleOrderSubmit() {
  if (cart.length === 0) {
    showToast('Adicione pelo menos um item ao pedido!', '⚠️');
    return;
  }

  const name = customerNameInput.value.trim();
  const orderType = orderTypeSelect.options[orderTypeSelect.selectedIndex].text;
  const location = customerLocationInput.value.trim();
  const payment = paymentMethodSelect.value;
  const notes = orderNotesInput.value.trim();

  if (!name) {
    showToast('Por favor, informe seu nome.', '⚠️');
    customerNameInput.focus();
    return;
  }

  if (orderTypeSelect.value !== 'retirada' && !location) {
    showToast('Por favor, preencha o número da mesa ou endereço.', '⚠️');
    customerLocationInput.focus();
    return;
  }

  const { total } = getCartTotals();
  const dateStr = new Date().toLocaleString('pt-BR');

  // Constrói o texto formatado do pedido
  let receipt = `====================================\n`;
  receipt += `🍽️ SABOR & ARTE GOURMET\n`;
  receipt += `Data: ${dateStr}\n`;
  receipt += `====================================\n\n`;
  receipt += `👤 CLIENTE: ${name}\n`;
  receipt += `📍 TIPO: ${orderType} ${location ? `(${location})` : ''}\n`;
  receipt += `💳 PAGAMENTO: ${payment}\n\n`;
  receipt += `📝 ITENS DO PEDIDO:\n`;
  receipt += `------------------------------------\n`;

  cart.forEach(item => {
    receipt += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
  });

  receipt += `------------------------------------\n`;
  receipt += `💰 TOTAL: ${formatPrice(total)}\n`;
  receipt += `====================================\n`;

  if (notes) {
    receipt += `\n🗒️ OBSERVAÇÕES:\n${notes}\n`;
  }

  lastCompletedOrderText = receipt;

  // Fecha carrinho e abre modal de sucesso
  closeCart();
  if (orderReceiptPreview) {
    orderReceiptPreview.textContent = receipt;
  }

  if (successDialog && typeof successDialog.showModal === 'function') {
    successDialog.showModal();
  }

  // Limpa o carrinho após finalizar
  clearCart();
}

// Envio para WhatsApp
function sendOrderToWhatsApp() {
  if (!lastCompletedOrderText) return;
  const encoded = encodeURIComponent(lastCompletedOrderText);
  // Abre o link do WhatsApp (pode ser configurado com número específico)
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

// Copiar resumo do pedido
function copyOrderReceipt() {
  if (!lastCompletedOrderText) return;
  navigator.clipboard.writeText(lastCompletedOrderText)
    .then(() => showToast('Resumo copiado para a área de transferência!', '📋'))
    .catch(() => showToast('Não foi possível copiar o texto', '❌'));
}

// ==========================================================================
// 8. CONFIGURAÇÃO DE EVENTOS E INICIALIZAÇÃO
// ==========================================================================
function setupEventListeners() {
  // Busca em tempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
      }
      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderProducts();
      searchInput.focus();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      currentCategory = 'todos';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      renderCategories();
      renderProducts();
    });
  }

  // Carrinho
  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
  if (submitOrderBtn) submitOrderBtn.addEventListener('click', handleOrderSubmit);
  if (backToMenuBtn) backToMenuBtn.addEventListener('click', closeCart);

  // Mudança no tipo de pedido (Mesa / Delivery / Balcão)
  if (orderTypeSelect) {
    orderTypeSelect.addEventListener('change', handleOrderTypeChange);
  }

  // Sucesso
  if (whatsappSendBtn) whatsappSendBtn.addEventListener('click', sendOrderToWhatsApp);
  if (copyOrderBtn) copyOrderBtn.addEventListener('click', copyOrderReceipt);
  if (newOrderBtn) {
    newOrderBtn.addEventListener('click', () => {
      if (successDialog) successDialog.close();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fechar dialog ao clicar no backdrop (Light Dismiss)
  [cartDialog, successDialog].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

// Expor funções necessárias globalmente para os atributos onclick inline
window.addToCart = addToCart;
window.updateItemQuantity = updateItemQuantity;
window.removeItemFromCart = removeItemFromCart;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  updateCartUI();
  setupEventListeners();
});