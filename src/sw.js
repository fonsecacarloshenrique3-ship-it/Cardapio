// ==========================================================================
// SERVICE WORKER PROFISSIONAL (PWA) - CARDÁPIO GOURMET
// ==========================================================================

const CACHE_NAME = "cardapio-gourmet-v4";

const ARQUIVOS_ESTATICOS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// 1. Instalação: Salva arquivos essenciais e força ativação imediata
self.addEventListener("install", (evento) => {
  self.skipWaiting();
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Armazenando cache essencial:", CACHE_NAME);
      return cache.addAll(ARQUIVOS_ESTATICOS);
    })
  );
});

// 2. Ativação: Limpa caches antigos e assume controle das páginas abertas
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) => {
      return Promise.all(
        chaves.map((chave) => {
          if (chave !== CACHE_NAME) {
            console.log("[SW] Removendo cache obsoleto:", chave);
            return caches.delete(chave);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Busca de arquivos (Fetch): Estratégia Network-First para HTML e Stale-While-Revalidate para recursos
self.addEventListener("fetch", (evento) => {
  const req = evento.request;

  // Ignora requisições não-GET
  if (req.method !== 'GET') return;

  // Se for navegação (abertura da página HTML), busca rede primeiro para nunca travar versão antiga
  if (req.mode === "navigate") {
    evento.respondWith(
      fetch(req)
        .then((respostaRede) => {
          const clone = respostaRede.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return respostaRede;
        })
        .catch(() => caches.match(req) || caches.match("./index.html"))
    );
    return;
  }

  // Para outros arquivos: responde rápido do cache e atualiza em segundo plano
  evento.respondWith(
    caches.match(req).then((respostaCache) => {
      const buscaRede = fetch(req)
        .then((respostaRede) => {
          if (respostaRede && respostaRede.status === 200 && (respostaRede.type === "basic" || respostaRede.type === "cors")) {
            const clone = respostaRede.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return respostaRede;
        })
        .catch(() => respostaCache);

      return respostaCache || buscaRede;
    })
  );
});
