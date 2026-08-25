# 🍔 Sabor & Arte Gourmet | Cardápio Digital & App Móvel

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

> Sistema de cardápio digital profissional interativo para restaurantes e delivery. Funciona como **Progressive Web App (PWA)** offline e como **Aplicativo Nativo Android** compilado com Ionic Capacitor.

---

## 🎓 Informações Acadêmicas

- **Instituição:** FANESE · Faculdade de Administração, Negócios e Saúde de Sergipe
- **Disciplina:** Programação para Dispositivos Móveis
- **Professor:** Márcio Rodrigo
- **Aluno:** Pedro Joaquim
- **Relatório Acadêmico:** [`docs/TRABALHO_ACADEMICO.md`](docs/TRABALHO_ACADEMICO.md)

---

## 📁 Arquitetura e Estrutura de Pastas

```text
minhas-tarefas/
├── 📁 src/                      # Código fonte principal da aplicação Web
│   ├── 📁 icons/                # Ícones PWA (192x192, 512x512)
│   ├── 📄 index.html            # Estrutura HTML5 com meta tags otimizadas
│   ├── 📄 style.css             # Design System com suporte a Safe Area
│   ├── 📄 app.js                # Lógica de negócio, catálogo e carrinho
│   ├── 📄 sw.js                 # Service Worker (Estratégias de Cache PWA)
│   └── 📄 manifest.json         # Manifesto PWA do aplicativo
├── 📁 android/                  # Projeto nativo Android gerado via Capacitor
├── 📁 docs/                     # Documentação acadêmica e relatórios
│   └── 📄 TRABALHO_ACADEMICO.md
├── 📁 www/                      # Bundle compilado enviado para o Android
├── 📄 build.js                  # Script automatizado de build e sincronização
├── 📄 capacitor.config.json     # Configuração do Capacitor Android
├── 📄 package.json              # Dependências e scripts do projeto
├── 📄 .gitignore                # Arquivos ignorados pelo Git
└── 📄 README.md                 # Documentação principal
```

---

## ✨ Funcionalidades Principais

- 🔍 **Catálogo com Categorias & Busca Instantânea**: Navegação entre abas (*Lanches, Porções, Bebidas, Sobremesas*) com filtro por nome e ingredientes.
- 🛒 **Carrinho Interativo & Stepper**: Controle rápido de quantidade (`+` / `-`) e remoção de itens.
- 💾 **Persistência de Dados**: Gestão de estado salva no `LocalStorage` para manter dados do usuário.
- 📲 **Checkout Estruturado para WhatsApp**: Formulário com validação de dados (*Consumo no Local, Delivery, Balcão*, *Mesa*, *Forma de Pagamento*) e geração de comprovante direto no WhatsApp.
- 📶 **Suporte Offline (PWA)**: Carregamento instantâneo via Service Worker com estratégia *Network First* para navegação.
- 📱 **Otimização Nativa**: Compatível com entalhes de tela (*notch*) e gestos em smartphones Android e iOS.

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
Ter o **Node.js** (v18+) instalado no computador.

### 2. Instalação de Dependências
```bash
npm install
```

### 3. Rodar em Ambiente de Desenvolvimento Web
Abra o arquivo `src/index.html` com a extensão **Live Server** no VS Code ou acesse via navegador.

### 4. Executar o Build do Aplicativo
```bash
npm run build
```
*(Esse comando compila os arquivos de `src/` para a pasta `www/` e sincroniza a raiz).*

---

## 📱 Como Gerar o APK Nativo para Android

1. Instale as dependências e execute o build:
   ```bash
   npm run build
   ```
2. Sincronize com a plataforma Android:
   ```bash
   npm run cap:sync
   ```
3. Abra o projeto no **Android Studio**:
   ```bash
   npm run cap:open:android
   ```
4. No Android Studio, vá em **Build > Build Bundle(s) / APK(s) > Build APK(s)** para gerar o arquivo `.apk`.

---

## 📄 Licença e Uso

Projeto desenvolvido para fins acadêmicos na disciplina de Programação para Dispositivos Móveis (FANESE).
