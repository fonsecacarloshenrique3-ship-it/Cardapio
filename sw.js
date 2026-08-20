// ==========================================================================
// AULA 03 - SERVICE WORKER (PWA)
// Professor: Márcio Rodrigo · FANESE
// Aluno: Pedro Joaquim
// ==========================================================================

// Nome da "caixa" do cache. Troque para v2, v3... ao mudar os arquivos.
const CACHE = "cardapio-tarefas-v1";

// Arquivos que o app precisa para funcionar offline.
const ARQUIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// 1) INSTALAR: baixa e guarda todos os arquivos no cache.
self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("Service Worker: Guardando arquivos no cache...");
      return cache.addAll(ARQUIVOS);
    })
  );
});

// 2) ATIVAR: apaga caches de versões antigas.
self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(
        nomes.map(function (nome) {
          if (nome !== CACHE) {
            console.log("Service Worker: Apagando cache antigo:", nome);
            return caches.delete(nome);
          }
        })
      );
    })
  );
});

// 3) BUSCAR (FETCH): responde do cache; se não achar, vai à rede (Cache Primeiro).
self.addEventListener("fetch", function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (guardado) {
      return guardado || fetch(evento.request);
    })
  );
});
