(function () {
  var C = window.SCIENTIA;
  var slug = new URLSearchParams(window.location.search).get("s") || "";
  var servico = C.servicos[slug];

  var form = document.getElementById("formulario");
  var campos = document.getElementById("campos");
  var resultado = document.getElementById("resultado");
  var cabecalho = document.getElementById("cabecalho-servico");
  var naoEncontrado = document.getElementById("nao-encontrado");
  var listaServicos = document.getElementById("lista-servicos");

  if (!servico) {
    cabecalho.hidden = true;
    form.hidden = true;
    naoEncontrado.hidden = false;
    Object.keys(C.servicos).forEach(function (k) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "servico.html?s=" + k;
      a.textContent = C.servicos[k].titulo;
      li.appendChild(a);
      listaServicos.appendChild(li);
    });
    document.title = "Serviço não encontrado · Scientia";
    return;
  }

  document.title = servico.titulo + " · Scientia, Consultoria Académica";
  document.getElementById("servico-etapa").textContent = servico.etapa;
  document.getElementById("servico-titulo").textContent = servico.titulo;
  document.getElementById("servico-descricao").textContent = servico.descricao;

  if (servico.nota) {
    var nota = document.getElementById("servico-nota");
    nota.textContent = servico.nota;
    nota.hidden = false;
  }

  function criarCampo(def) {
    var id = "campo-" + def.name;
    var grupo = document.createElement("div");
    grupo.className = "campo";

    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = def.label;
    if (!def.required) {
      var opc = document.createElement("span");
      opc.className = "opcional";
      opc.textContent = " (opcional)";
      label.appendChild(opc);
    }
    grupo.appendChild(label);

    var el;
    if (def.type === "select") {
      el = document.createElement("select");
      var vazio = document.createElement("option");
      vazio.value = "";
      vazio.textContent = "Escolhe uma opção";
      el.appendChild(vazio);
      def.options.forEach(function (o) {
        var op = document.createElement("option");
        op.value = o;
        op.textContent = o;
        el.appendChild(op);
      });
    } else if (def.type === "textarea") {
      el = document.createElement("textarea");
      el.rows = 4;
    } else {
      el = document.createElement("input");
      el.type = def.type || "text";
      if (def.min !== undefined) el.min = def.min;
    }
    el.id = id;
    el.name = def.name;
    if (def.required) el.required = true;
    if (def.placeholder) el.placeholder = def.placeholder;
    if (def.autocomplete) el.autocomplete = def.autocomplete;
    grupo.appendChild(el);
    return grupo;
  }

  var todos = [].concat(C.comuns, servico.campos, C.finais);
  todos.forEach(function (def) {
    campos.appendChild(criarCampo(def));
  });

  function compor() {
    var linhas = ["Olá, Scientia! Quero pedir uma proposta.", "", "*Serviço:* " + servico.titulo];
    todos.forEach(function (def) {
      var el = document.getElementById("campo-" + def.name);
      var valor = el ? el.value.trim() : "";
      if (valor) linhas.push("*" + def.label + ":* " + valor);
    });
    return linhas.join("\n");
  }

  var botaoAbrir = document.getElementById("abrir-whatsapp");
  var pre = document.getElementById("mensagem");
  var aviso = document.getElementById("aviso-config");
  var copiar = document.getElementById("copiar");
  var estadoCopia = document.getElementById("estado-copia");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var texto = compor();
    pre.textContent = texto;
    resultado.hidden = false;

    if (window.scientiaWA.configurado()) {
      var url = window.scientiaWA.ligacao(texto);
      botaoAbrir.href = url;
      botaoAbrir.target = "_blank";
      botaoAbrir.rel = "noopener";
      aviso.hidden = true;
      window.open(url, "_blank", "noopener");
    } else {
      botaoAbrir.removeAttribute("href");
      aviso.hidden = false;
    }
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  copiar.addEventListener("click", function () {
    var texto = pre.textContent;
    function feito() {
      estadoCopia.textContent = "Mensagem copiada.";
    }
    function alternativa() {
      var area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        feito();
      } catch (err) {
        estadoCopia.textContent = "Não foi possível copiar. Seleciona o texto e copia à mão.";
      }
      document.body.removeChild(area);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(feito, alternativa);
    } else {
      alternativa();
    }
  });
})();
