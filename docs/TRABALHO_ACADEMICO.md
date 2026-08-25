# Relatório Acadêmico: Sistema de Cardápio Digital Móvel (PWA & Android)

**INSTITUIÇÃO:** FANESE · Faculdade de Administração, Negócios e Saúde de Sergipe  
**DISCIPLINA:** Programação para Dispositivos Móveis  
**PROFESSOR:** Márcio Rodrigo  
**ALUNO:** Pedro Joaquim  
**DATA:** 25 de Agosto de 2026  

---

## 1. Visão Geral do Projeto

O **Sabor & Arte Gourmet** é um sistema de cardápio digital profissional interativo desenvolvido para estabelecimentos gastronômicos (restaurantes, lanchonetes e hamburguerias). O projeto foi concebido para funcionar tanto como uma **PWA (Progressive Web App)** acessível via navegador móvel/desktop quanto como um **Aplicativo Nativo Android** compilado com **Ionic Capacitor**.

---

## 2. Especificação das Funcionalidades

### Nível 1: Catálogo com Categorias & Busca em Tempo Real
- **Filtros por Categoria:** Navegação fluida entre abas (*Todos, Lanches, Porções, Bebidas, Sobremesas*).
- **Busca Dinâmica:** Pesquisa instantânea por nome e palavras-chave presentes nos ingredientes dos produtos.

### Nível 2: Gestão de Itens e Controle de Quantidades
- **Transformação de Controle:** Botão "+ Adicionar" transforma-se imediatamente em um stepper de quantidade (`-` `qtd` `+`).
- **Gerenciamento de Cardápio:** Opção de cadastrar novos itens dinamicamente ou excluir produtos existentes.

### Nível 3: Cálculo Inteligente de Subtotais e Resumo Sticky
- **Cálculo Automático:** Contagem total de itens e cálculo do valor total em Reais (`R$`) formatado via `Intl.NumberFormat`.
- **Barra Flutuante (Sticky Footer):** Exibe contagem de itens e valor total acumulado com acesso rápido ao checkout.

### Nível 4: Cadastro Dinâmico e Checkout para WhatsApp
- **Painel de Cadastro:** Permite adicionar novos produtos com nome, categoria, preço e ingredientes.
- **Modal de Conferência (`<dialog>`):** Coleta dados do cliente (*Nome*, *Mesa/Delivery/Balcão*, *Forma de Pagamento*, *Observações*).
- **Integração WhatsApp:** Formatação automática da mensagem com o comprovante completo estruturado e redirecionamento para o WhatsApp do estabelecimento.

---

## 3. Fundamentação Teórica e Respostas (Aula 03)

### Questão 1: O que é um Service Worker?
> **Resposta:** O Service Worker é um script JavaScript (`sw.js`) que executa em segundo plano no navegador, separado da thread principal da interface do usuário (UI). Ele atua como um proxy de rede programável, interceptando requisições HTTP para armazenar arquivos estáticos em cache (*Cache Storage*). Isso garante que o aplicativo continue funcionando perfeitamente sem conexão com a internet (offline) e permite a instalação do app na tela inicial do dispositivo.

### Questão 2: Estratégias de Caching: "Cache First" vs "Network First"?
> **Resposta:**
> - **Cache Primeiro (Cache First):** O Service Worker busca a resposta primeiramente no *Cache Storage*. Caso o arquivo seja localizado no cache, ele é entregue instantaneamente sem fazer requisição de rede. Indicado para imagens, fontes e arquivos CSS estáticos.
> - **Rede Primeiro (Network First):** O Service Worker tenta buscar primeiramente a versão mais recente na rede. Caso a conexão falhe ou o usuário esteja offline, ele recorre à cópia armazenada em cache como fallback. Utilizado para o arquivo HTML principal para evitar o travamento em versões antigas.

---

## 4. Testes Realizados e Validação

1. **Execução em Servidor de Desenvolvimento:** Testado no Live Server do VS Code (`http://127.0.0.1:5500`).
2. **Verificação do Service Worker:** Inspecionado no DevTools (`Application > Service Workers`) confirmando status *"activated and running"*.
3. **Navegação Offline:** Validado em DevTools (`Network > Offline`), mantendo a navegação, busca e carrinho funcionais.
4. **Instalação PWA:** Testada a adição do aplicativo à tela de início em dispositivos móveis Android e iOS.
5. **Integração Nativa Android (Capacitor):** Gerada e sincronizada a pasta `android/` para compilação do arquivo APK nativo.
