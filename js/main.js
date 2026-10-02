(function () {
  var C = window.SCIENTIA;

  function configurado() {
    return /^\d{8,15}$/.test(C.whatsapp);
  }

  function ligacao(texto) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  window.scientiaWA = { configurado: configurado, ligacao: ligacao };

  // Todos os elementos com data-wa abrem o WhatsApp da marca.
  // O valor do atributo é a mensagem; se estiver vazio, usa o texto geral.
  var elementos = document.querySelectorAll("[data-wa]");
  for (var i = 0; i < elementos.length; i++) {
    (function (a) {
      var texto = a.getAttribute("data-wa") || C.textoGeral;
      if (configurado()) {
        a.href = ligacao(texto);
        a.target = "_blank";
        a.rel = "noopener";
      } else {
        a.href = "#";
        a.addEventListener("click", function (e) {
          e.preventDefault();
          alert("O número de WhatsApp ainda não foi configurado. Edita js/config.js.");
        });
      }
    })(elementos[i]);
  }

  var ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = new Date().getFullYear();

  /* Tema claro / escuro.
     O tema inicial é decidido por um pequeno script no <head> de cada página
     (escolha guardada ou predefinição do sistema), para não haver "piscar".
     Aqui trata-se do botão e de acompanhar o sistema enquanto não houver escolha. */
  var raiz = document.documentElement;
  var botaoTema = document.getElementById("tema");
  var metaCor = document.querySelector('meta[name="theme-color"]');
  var CHAVE = "scientia-tema";

  function guardado() {
    try {
      var v = window.localStorage.getItem(CHAVE);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function doSistema() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function aplicarTema(t) {
    raiz.setAttribute("data-tema", t);
    if (metaCor) metaCor.setAttribute("content", t === "dark" ? "#0c1620" : "#f3f6f8");
    if (botaoTema) {
      botaoTema.setAttribute("aria-label", t === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
    }
  }

  aplicarTema(raiz.getAttribute("data-tema") || guardado() || doSistema());

  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      var novo = raiz.getAttribute("data-tema") === "dark" ? "light" : "dark";
      aplicarTema(novo);
      try {
        window.localStorage.setItem(CHAVE, novo);
      } catch (e) {}
    });
  }

  if (window.matchMedia) {
    var escuro = window.matchMedia("(prefers-color-scheme: dark)");
    var seguir = function (e) {
      if (!guardado()) aplicarTema(e.matches ? "dark" : "light");
    };
    if (escuro.addEventListener) escuro.addEventListener("change", seguir);
    else if (escuro.addListener) escuro.addListener(seguir);
  }

  /* Cabeçalho fixo: sombra quando a página rola. */
  var cabecalho = document.querySelector(".cabecalho");
  function aoRolar() {
    if (cabecalho) cabecalho.classList.toggle("rolou", window.scrollY > 8);
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  /* Menu hambúrguer (ecrãs pequenos). */
  var botaoMenu = document.getElementById("menu-botao");
  var menu = document.getElementById("menu");

  function abrirMenu(abrir) {
    menu.classList.toggle("aberto", abrir);
    botaoMenu.setAttribute("aria-expanded", abrir ? "true" : "false");
    botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  }

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
      abrirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) abrirMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("aberto")) {
        abrirMenu(false);
        botaoMenu.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (menu.classList.contains("aberto") && cabecalho && !cabecalho.contains(e.target)) {
        abrirMenu(false);
      }
    });

    if (window.matchMedia) {
      var larga = window.matchMedia("(min-width: 960px)");
      var fechar = function (e) {
        if (e.matches) abrirMenu(false);
      };
      if (larga.addEventListener) larga.addEventListener("change", fechar);
      else if (larga.addListener) larga.addListener(fechar);
    }
  }
})();
