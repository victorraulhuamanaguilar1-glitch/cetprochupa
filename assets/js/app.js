/* =====================================================================
   CETPRO CHUPA · Lógica del sitio (sin librerías externas)
   ===================================================================== */
(function () {
  "use strict";

  var C = window.CETPRO || {};
  var MODO_DEMO = !C.urlServidor;
  var MAX_ARCHIVO_MB = 4;
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
               "septiembre", "octubre", "noviembre", "diciembre"];

  // ---------------------------------------------------------------- iconos
  var ICONOS = {
    matricula: '<path d="M4 19.5V5a2 2 0 0 1 2-2h9l5 5v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5Z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>',
    documento: '<path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 7l3-4h12l3 4M9 12h6"/>',
    pago: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    ok: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.8 8.6c.2-.5.5-.6.8-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.4 0 .6.6 1 1.4 1.8 2.5 2.4.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .9-.6 1.8-1.6 2-.8.1-1.8.1-4-1.1-2.1-1.2-3.4-3.3-3.6-3.7-.3-.4-.9-1.6-.9-2.7 0-.6.2-1.1.4-1.4Z"/>'
  };
  function icono(nombre, tam) {
    tam = tam || 22;
    return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONOS[nombre] + '</svg>';
  }

  // ---------------------------------------------------------------- utilidades
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fechaLarga(iso) {
    var p = String(iso || "").split("-");
    if (p.length !== 3) return esc(iso);
    return Number(p[2]) + " de " + MESES[Number(p[1]) - 1] + " de " + p[0];
  }
  function soles(m) {
    if (m === "" || m === null || m === undefined || isNaN(Number(m))) return "Consultar";
    return "S/ " + Number(m).toFixed(2);
  }
  function iniciales(nombre) {
    return String(nombre || "C").split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join("").toUpperCase();
  }
  function parametro(nombre) {
    var m = new RegExp("[?&]" + nombre + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  // ---------------------------------------------------------------- cabecera y pie
  function renderCabecera() {
    var pagina = document.body.getAttribute("data-pagina");
    var enlaces = [
      ["inicio", "index.html", "Inicio"],
      ["especialidades", "index.html#especialidades", "Especialidades"],
      ["tramites", "tramites.html", "Mesa de partes"],
      ["pagos", "pagos.html", "Pagos"],
      ["contacto", "index.html#contacto", "Contacto"]
    ];
    var html = "";
    if (MODO_DEMO) {
      html += '<div class="aviso-demo" role="status">Modo demostración: los formularios todavía no guardan datos. ' +
        'Configure la conexión con Google en <code>config.js</code>.</div>';
    }
    html += '<div class="contenedor">' +
      '<a class="marca" href="index.html">' +
      (C.logo ? '<img src="' + esc(C.logo) + '" alt="" onerror="this.outerHTML=\'<span class=&quot;sin-logo&quot;>' + esc(iniciales(C.nombre)) + '</span>\'">'
              : '<span class="sin-logo">' + esc(iniciales(C.nombre)) + '</span>') +
      '<span><strong>' + esc(C.nombre) + '</strong><span>' + esc(C.subtitulo || "Educación técnico-productiva") + '</span></span></a>' +
      '<button class="boton-hamburguesa" aria-expanded="false" aria-controls="menu-principal">' + icono("menu", 20) + ' Menú</button>' +
      '<nav class="menu" id="menu-principal" aria-label="Principal">';
    enlaces.forEach(function (e) {
      html += '<a href="' + e[1] + '"' + (pagina === e[0] ? ' aria-current="page"' : "") + '>' + e[2] + '</a>';
    });
    html += '<a class="boton-menu-accion" href="matricula.html"' + (pagina === "matricula" ? ' aria-current="page"' : "") +
      '>Matricularme</a></nav></div>';
    var cab = $("#cabecera");
    if (!cab) return;
    cab.className = "cabecera";
    cab.innerHTML = html;
    var boton = $(".boton-hamburguesa", cab), menu = $(".menu", cab);
    boton.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("abierto"); }); });
  }

  function renderPie() {
    var pie = $("#pie");
    if (!pie) return;
    pie.className = "pie";
    var contacto = [];
    if (C.direccion) contacto.push("<li>" + esc(C.direccion) + "</li>");
    if (C.telefono) contacto.push('<li><a href="tel:' + esc(C.telefono.replace(/\s/g, "")) + '">' + esc(C.telefono) + "</a></li>");
    if (C.correo) contacto.push('<li><a href="mailto:' + esc(C.correo) + '">' + esc(C.correo) + "</a></li>");
    if (C.facebook) contacto.push('<li><a href="' + esc(C.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>');
    if (C.horarioAtencion) contacto.push("<li>" + esc(C.horarioAtencion) + "</li>");
    pie.innerHTML = '<div class="aguayo fina"></div><div class="contenedor">' +
      "<div><strong>" + esc(C.nombreCompleto || C.nombre) + "</strong>" +
      (C.codigoModular ? "Código modular " + esc(C.codigoModular) + "<br>" : "") + esc(C.descripcion || "") +
      (C.lema ? '<br><em class="lema">' + esc(C.lema) + "</em>" : "") + "</div>" +
      "<div><strong>Trámites en línea</strong><ul>" +
      '<li><a href="matricula.html">Matrícula</a></li><li><a href="tramites.html">Mesa de partes virtual</a></li>' +
      '<li><a href="pagos.html">Registrar un pago</a></li><li><a href="tramites.html#consulta">Consultar mi trámite</a></li></ul></div>' +
      "<div><strong>Contacto</strong><ul>" + (contacto.join("") || "<li>Atención presencial en la institución</li>") + "</ul></div>" +
      '<p class="legal">Los datos personales que registre se usan solo para atender su trámite, conforme a la Ley N.° 29733, ' +
      "Ley de Protección de Datos Personales. © " + new Date().getFullYear() + " " + esc(C.nombre) + ".</p></div>";

    if (C.whatsapp) {
      var w = document.createElement("a");
      w.className = "whatsapp";
      w.href = "https://wa.me/" + C.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent("Hola, quisiera información sobre el " + C.nombre);
      w.target = "_blank"; w.rel = "noopener";
      w.setAttribute("aria-label", "Escribir por WhatsApp");
      w.innerHTML = icono("whatsapp", 28);
      document.body.appendChild(w);
    }
  }

  // ---------------------------------------------------------------- página de inicio
  function renderInicio() {
    var t = $("#texto-portada");
    if (t) t.textContent = C.descripcion || "";
    var dp = $("#datos-portada");
    if (dp) {
      var d = [];
      d.push("<span><strong>" + (C.especialidades || []).length + "</strong> especialidades</span>");
      if (C.matriculaAbierta) d.push("<span>Matrícula <strong>" + esc(C.periodoMatricula) + "</strong> abierta</span>");
      if (C.horarioAtencion) d.push("<span>" + esc(C.horarioAtencion) + "</span>");
      dp.innerHTML = d.join("");
    }

    var lista = $("#lista-especialidades");
    if (lista) {
      lista.innerHTML = (C.especialidades || []).map(function (e, i) {
        var meta = [e.duracion, e.horario].filter(Boolean).map(esc).join("<br>");
        var mods = (e.modulos || []).length
          ? "<div><h4>Módulos</h4><ul>" + e.modulos.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul></div>"
          : "<div><h4>Turnos disponibles</h4><p>" + esc((C.turnos || []).join(", ")) + "</p></div>";
        return '<li><details class="especialidad"' + (i === 0 ? " open" : "") + '><summary>' +
          "<h3>" + esc(e.nombre) + '</h3><span class="meta">' + meta + '</span><span class="signo">' + icono("mas", 16) + "</span>" +
          '</summary><div class="detalle"><div><p>' + esc(e.descripcion) + "</p>" +
          '<a class="boton" href="matricula.html?esp=' + encodeURIComponent(e.nombre) + '">Matricularme en ' + esc(e.nombre) + "</a></div>" +
          mods + "</div></details></li>";
      }).join("");
    }

    var req = $("#lista-requisitos");
    if (req) req.innerHTML = (C.requisitos || []).map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");
    $$(".periodo").forEach(function (el) { el.textContent = C.periodoMatricula || ""; });

    var not = $("#lista-noticias");
    if (not) {
      if (!(C.noticias || []).length) { $("#noticias").hidden = true; }
      else {
        not.innerHTML = C.noticias.map(function (n) {
          return '<article class="noticia"><time datetime="' + esc(n.fecha) + '">' + fechaLarga(n.fecha) + "</time><div><h3>" +
            esc(n.titulo) + "</h3><p>" + esc(n.texto) + "</p></div></article>";
        }).join("");
      }
    }

    var dl = $("#datos-contacto");
    if (dl) {
      var filas = [];
      if (C.direccion) filas.push(["Dirección", esc(C.direccion)]);
      if (C.horarioAtencion) filas.push(["Horario de atención", esc(C.horarioAtencion)]);
      if (C.telefono) filas.push(["Teléfono", '<a href="tel:' + esc(C.telefono.replace(/\s/g, "")) + '">' + esc(C.telefono) + "</a>"]);
      if (C.whatsapp) filas.push(["WhatsApp", '<a href="https://wa.me/' + esc(C.whatsapp.replace(/\D/g, "")) + '" target="_blank" rel="noopener">Escribir un mensaje</a>']);
      if (C.correo) filas.push(["Correo", '<a href="mailto:' + esc(C.correo) + '">' + esc(C.correo) + "</a>"]);
      filas.push(["Trámites sin viajar", '<a href="tramites.html">Mesa de partes virtual</a>']);
      dl.innerHTML = filas.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + f[1] + "</dd></div>"; }).join("");
    }
    var mapa = $("#mapa");
    if (mapa && C.ubicacionMapa) {
      mapa.src = "https://www.google.com/maps?q=" + encodeURIComponent(C.direccion || C.ubicacionMapa) + "&output=embed";
    }
  }

  // ---------------------------------------------------------------- validación
  var REGLAS = {
    dni: function (v) { return /^\d{8}$/.test(v) || "El DNI tiene 8 números."; },
    celular: function (v) { return /^9\d{8}$/.test(v.replace(/\s/g, "")) || "Escriba un celular de 9 números que empiece con 9."; },
    correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Revise el correo; debe ser como nombre@gmail.com"; },
    fecha: function (v) {
      var d = new Date(v + "T00:00:00");
      if (isNaN(d)) return "Elija una fecha válida.";
      var edad = (Date.now() - d.getTime()) / 31557600000;
      var minima = Number(C.edadMinima || 12);
      if (edad < minima) return "Para matricularse debe tener " + minima + " años o más.";
      return edad <= 90 || "Revise la fecha de nacimiento.";
    },
    monto: function (v) { return (Number(v) > 0 && Number(v) < 100000) || "Escriba el monto pagado, por ejemplo 50."; },
    operacion: function (v) { return /^[A-Za-z0-9-]{4,30}$/.test(v) || "Copie el número de operación que aparece en su comprobante."; },
    texto: function (v) { return v.length >= 3 || "Escriba un poco más."; }
  };

  function validarCampo(input) {
    var campo = input.closest(".campo") || input.closest(".consentimiento");
    var v = input.type === "checkbox" ? input.checked : input.value.trim();
    var msg = true;
    if (input.required && (v === "" || v === false)) {
      msg = input.getAttribute("data-requerido") || (input.type === "checkbox" ? "Debe aceptar para continuar." : "Este dato es obligatorio.");
    } else if (v !== "" && input.getAttribute("data-tipo") && REGLAS[input.getAttribute("data-tipo")]) {
      msg = REGLAS[input.getAttribute("data-tipo")](String(v));
    }
    if (campo) {
      campo.classList.toggle("invalido", msg !== true);
      var e = $(".error", campo);
      if (e) e.textContent = msg === true ? "" : msg;
    }
    input.setAttribute("aria-invalid", msg === true ? "false" : "true");
    return msg === true;
  }

  function validarZona(zona) {
    var ok = true, primero = null;
    $$("input, select, textarea", zona).forEach(function (el) {
      if (el.classList.contains("sin-validar") || el.type === "file") return;
      if (!validarCampo(el)) { ok = false; primero = primero || el; }
    });
    $$(".archivos[data-requerido]", zona).forEach(function (a) {
      var campo = a.closest(".campo");
      var vacio = !(a._archivos && a._archivos.length);
      campo.classList.toggle("invalido", vacio);
      if (vacio) { $(".error", campo).textContent = a.getAttribute("data-requerido"); ok = false; primero = primero || a; }
    });
    if (primero) { primero.scrollIntoView({ block: "center", behavior: "smooth" }); if (primero.focus) primero.focus({ preventScroll: true }); }
    return ok;
  }

  function activarValidacionEnVivo(form) {
    $$("input, select, textarea", form).forEach(function (el) {
      if (el.type === "file") return;
      el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") validarCampo(el); });
      el.addEventListener("input", function () {
        var c = el.closest(".campo") || el.closest(".consentimiento");
        if (c && c.classList.contains("invalido")) validarCampo(el);
      });
      el.addEventListener("change", function () {
        var c = el.closest(".campo") || el.closest(".consentimiento");
        if (c && c.classList.contains("invalido")) validarCampo(el);
      });
    });
    // Solo números en DNI y celular
    $$('input[data-tipo="dni"], input[data-tipo="celular"]', form).forEach(function (el) {
      el.addEventListener("input", function () { el.value = el.value.replace(/\D/g, "").slice(0, el.getAttribute("data-tipo") === "dni" ? 8 : 9); });
    });
  }

  // ---------------------------------------------------------------- adjuntos
  function iniciarAdjuntos(zona) {
    var input = $("input[type=file]", zona);
    var lista = $(".lista-archivos", zona);
    var maximo = Number(zona.getAttribute("data-max") || 3);
    zona._archivos = [];

    function pintar() {
      lista.innerHTML = zona._archivos.map(function (f, i) {
        return "<li><span>" + esc(f.name) + " · " + (f.size / 1048576).toFixed(1) + ' MB</span><button type="button" data-i="' + i +
          '" aria-label="Quitar ' + esc(f.name) + '">Quitar</button></li>';
      }).join("");
      $$("button", lista).forEach(function (b) {
        b.addEventListener("click", function () { zona._archivos.splice(Number(b.getAttribute("data-i")), 1); pintar(); });
      });
    }
    function agregar(archivos) {
      var campo = zona.closest(".campo"), err = $(".error", campo), problema = "";
      Array.prototype.forEach.call(archivos, function (f) {
        if (zona._archivos.length >= maximo) { problema = "Puede adjuntar hasta " + maximo + " archivo(s)."; return; }
        if (!/\.(pdf|jpe?g|png)$/i.test(f.name)) { problema = "«" + f.name + "» no es PDF, JPG ni PNG."; return; }
        if (f.size > MAX_ARCHIVO_MB * 1048576) { problema = "«" + f.name + "» pesa más de " + MAX_ARCHIVO_MB + " MB. Reduzca su tamaño o tome una foto con menor resolución."; return; }
        zona._archivos.push(f);
      });
      campo.classList.toggle("invalido", !!problema);
      err.textContent = problema;
      pintar();
    }
    input.addEventListener("change", function () { agregar(input.files); input.value = ""; });
    ["dragenter", "dragover"].forEach(function (ev) {
      zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.add("arrastrando"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.remove("arrastrando"); });
    });
    zona.addEventListener("drop", function (e) { agregar(e.dataTransfer.files); });
  }

  function leerArchivos(archivos) {
    return Promise.all((archivos || []).map(function (f) {
      return new Promise(function (ok, mal) {
        var r = new FileReader();
        r.onload = function () { ok({ nombre: f.name, tipo: f.type || "application/octet-stream", contenido: String(r.result).split(",")[1] }); };
        r.onerror = function () { mal(new Error("No se pudo leer " + f.name)); };
        r.readAsDataURL(f);
      });
    }));
  }

  // ---------------------------------------------------------------- comunicación con el servidor
  function enviar(tipo, datos, archivos, trampa) {
    if (MODO_DEMO) {
      return new Promise(function (ok) {
        setTimeout(function () {
          var pref = { mesa_partes: "EXP", matricula: "MAT", pago: "PAG" }[tipo];
          ok({ ok: true, codigo: pref + "-" + new Date().getFullYear() + "-DEMO" + Math.floor(Math.random() * 900 + 100), demo: true });
        }, 900);
      });
    }
    return leerArchivos(archivos).then(function (adj) {
      return fetch(C.urlServidor, {
        method: "POST",
        body: JSON.stringify({ tipo: tipo, datos: datos, archivos: adj, web: trampa || "" })
      });
    }).then(function (r) {
      if (!r.ok) throw new Error("El servidor respondió con un error (" + r.status + ").");
      return r.json();
    }).then(function (res) {
      if (!res.ok) throw new Error(res.error || "No se pudo registrar el trámite.");
      return res;
    });
  }

  function datosDe(form) {
    var d = {};
    $$("input, select, textarea", form).forEach(function (el) {
      if (!el.name || el.type === "file" || el.name === "web") return;
      d[el.name] = el.type === "checkbox" ? (el.checked ? "Sí" : "No") : el.value.trim();
    });
    return d;
  }

  function procesarEnvio(form, tipo, opciones) {
    var boton = $("button[type=submit]", form);
    var aviso = $(".mensaje-envio", form);
    var texto = boton.textContent;
    boton.disabled = true;
    boton.textContent = "Enviando…";
    aviso.innerHTML = "";
    var datos = datosDe(form);
    if (opciones.preparar) opciones.preparar(datos);
    var adjuntos = $$(".archivos", form).reduce(function (a, z) { return a.concat(z._archivos || []); }, []);
    var trampa = ($("input[name=web]", form) || {}).value;
    enviar(tipo, datos, adjuntos, trampa).then(function (res) {
      mostrarResultado(form, res.codigo, opciones, datos, res.demo);
    }).catch(function (err) {
      boton.disabled = false;
      boton.textContent = texto;
      aviso.innerHTML = '<div class="mensaje error" role="alert"><strong>No se pudo enviar.</strong> ' + esc(err.message) +
        " Revise su conexión a internet e intente otra vez. Si el problema continúa, " +
        (C.whatsapp ? 'escríbanos por <a href="https://wa.me/' + esc(C.whatsapp.replace(/\D/g, "")) + '" target="_blank" rel="noopener">WhatsApp</a>.' : "acérquese a la institución.") +
        "</div>";
      aviso.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  function mostrarResultado(form, codigo, opciones, datos, demo) {
    var ahora = new Date();
    var fecha = ahora.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }) + ", " +
      ahora.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    var resumen = (opciones.resumen || []).filter(function (r) { return datos[r[1]]; })
      .map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(datos[r[1]]) + "</dd></div>"; }).join("");
    form.innerHTML = '<div class="resultado" role="status" tabindex="-1">' +
      '<div class="sello">' + icono("ok", 38) + "</div>" +
      "<h2>" + esc(opciones.titulo) + "</h2>" +
      "<p>Guarde este número para consultar el estado de su trámite:</p>" +
      '<div class="codigo">' + esc(codigo) + "</div>" +
      "<p>" + esc(opciones.mensaje) + "</p>" +
      (demo ? '<p class="mensaje info">Modo demostración: este número es de prueba y no se guardó ningún dato.</p>' : "") +
      '<div class="estado-tramite" style="text-align:left"><h3>Cargo de recepción</h3><dl>' +
      "<div><dt>Fecha y hora</dt><dd>" + esc(fecha) + "</dd></div>" + resumen + "</dl></div>" +
      '<div class="acciones-form no-imprimir">' +
      '<button type="button" class="boton secundario" onclick="window.print()">Imprimir o guardar cargo</button>' +
      '<a class="boton" href="tramites.html?codigo=' + encodeURIComponent(codigo) + '#consulta">Consultar estado</a></div></div>';
    var r = $(".resultado", form);
    r.focus();
    window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  }

  // ---------------------------------------------------------------- MATRÍCULA
  function initMatricula() {
    var form = $("#form-matricula");
    if (!form) return;
    $$(".periodo").forEach(function (el) { el.textContent = C.periodoMatricula || ""; });
    if (!C.matriculaAbierta) {
      form.innerHTML = '<div class="mensaje info"><strong>La matrícula en línea está cerrada por ahora.</strong> ' +
        "Revise los comunicados en la página de inicio o comuníquese con la institución.</div>";
      return;
    }
    var esp = $("#mat-especialidad");
    esp.innerHTML = '<option value="">Elija una especialidad</option>' + (C.especialidades || []).map(function (e) {
      return "<option>" + esc(e.nombre) + "</option>";
    }).join("");
    var turno = $("#mat-turno");
    turno.innerHTML = ((C.turnos || []).length === 1 ? "" : '<option value="">Elija un turno</option>') +
      (C.turnos || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("");
    var pre = parametro("esp");
    if (pre) esp.value = pre;
    pintarMediosPago($("#mat-medios"));
    var tarifa = (C.tarifas || []).filter(function (t) { return /matr[ií]cula/i.test(t.concepto); })[0];
    if (tarifa && tarifa.monto !== "") $("#mat-monto").value = tarifa.monto;
    $("#mat-monto-texto").textContent = tarifa ? soles(tarifa.monto) + (/por m[oó]dulo/i.test(tarifa.concepto) && tarifa.monto !== "" ? " por módulo" : "") : "Consultar";
    iniciarAdjuntos($("#mat-voucher"));
    iniciarAdjuntos($("#mat-dni-archivo"));
    activarValidacionEnVivo(form);

    var pasos = $$(".paso-form", form), barras = $$(".progreso div", form), actual = 0;
    function irA(n) {
      pasos.forEach(function (p, i) { p.hidden = i !== n; });
      barras.forEach(function (b, i) { b.className = i < n ? "hecho" : i === n ? "actual" : ""; });
      actual = n;
      if (n === pasos.length - 1) pintarResumen();
      var h = $("legend", pasos[n]);
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
    function pintarResumen() {
      var d = datosDe(form);
      var filas = [["Estudiante", d.apellidos + ", " + d.nombres], ["DNI", d.dni], ["Celular", d.celular],
                   ["Especialidad", d.especialidad], ["Turno", d.turno], ["N.° de operación", d.operacion],
                   ["Monto", d.monto ? soles(d.monto) : ""]];
      $("#mat-resumen").innerHTML = filas.filter(function (f) { return f[1]; })
        .map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("");
    }
    $$("[data-siguiente]", form).forEach(function (b) {
      b.addEventListener("click", function () { if (validarZona(pasos[actual])) irA(actual + 1); });
    });
    $$("[data-anterior]", form).forEach(function (b) { b.addEventListener("click", function () { irA(actual - 1); }); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarZona(pasos[actual])) return;
      procesarEnvio(form, "matricula", {
        titulo: "Solicitud de matrícula recibida",
        mensaje: "Validaremos su pago y sus datos. Le avisaremos por correo o celular cuando su matrícula quede confirmada.",
        preparar: function (d) { d.periodo = C.periodoMatricula; d.nombre_completo = d.apellidos + ", " + d.nombres; },
        resumen: [["Estudiante", "nombre_completo"], ["DNI", "dni"], ["Especialidad", "especialidad"], ["Turno", "turno"], ["Periodo", "periodo"]]
      });
    });
    irA(0);
  }

  // ---------------------------------------------------------------- PAGOS
  function pintarMediosPago(zona) {
    if (!zona) return;
    var h = "";
    if (C.yape && C.yape.numero) {
      h += '<div class="medio yape"><h3>Yape</h3><div class="numero">' + esc(C.yape.numero) + "</div>" +
        (C.yape.titular ? '<div class="titular">A nombre de ' + esc(C.yape.titular) + "</div>" : "") +
        '<button type="button" class="copiar" data-copiar="' + esc(C.yape.numero) + '">Copiar número</button>' +
        (C.yape.qr ? '<img src="' + esc(C.yape.qr) + '" alt="Código QR de Yape">' : "") + "</div>";
    }
    if (C.plin && C.plin.numero) {
      h += '<div class="medio plin"><h3>Plin</h3><div class="numero">' + esc(C.plin.numero) + "</div>" +
        (C.plin.titular ? '<div class="titular">A nombre de ' + esc(C.plin.titular) + "</div>" : "") +
        '<button type="button" class="copiar" data-copiar="' + esc(C.plin.numero) + '">Copiar número</button></div>';
    }
    if (C.banco && C.banco.cuenta) {
      h += '<div class="medio"><h3>' + esc(C.banco.nombre) + '</h3><div class="titular">Cuenta</div><div class="numero">' + esc(C.banco.cuenta) + "</div>" +
        (C.banco.cci ? '<div class="titular">CCI: ' + esc(C.banco.cci) + "</div>" : "") +
        (C.banco.titular ? '<div class="titular">A nombre de ' + esc(C.banco.titular) + "</div>" : "") +
        '<button type="button" class="copiar" data-copiar="' + esc(C.banco.cuenta) + '">Copiar cuenta</button></div>';
    }
    zona.innerHTML = h || '<div class="mensaje info">Los datos para pagar se publicarán pronto. Mientras tanto, puede pagar en la oficina de la institución.</div>';
    $$("[data-copiar]", zona).forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-copiar"), original = b.textContent;
        (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () {
          b.textContent = "Copiado"; setTimeout(function () { b.textContent = original; }, 1600);
        }).catch(function () { b.textContent = t; });
      });
    });
  }

  function initPagos() {
    var form = $("#form-pago");
    if (!form) return;
    var tabla = $("#tabla-tarifas tbody");
    tabla.innerHTML = (C.tarifas || []).map(function (t) {
      return "<tr><td>" + esc(t.concepto) + "</td><td>" + soles(t.monto) + "</td></tr>";
    }).join("");
    pintarMediosPago($("#medios-pago"));
    var concepto = $("#pag-concepto");
    concepto.innerHTML = '<option value="">Elija el concepto</option>' + (C.tarifas || []).map(function (t) {
      return "<option>" + esc(t.concepto) + "</option>";
    }).join("") + "<option>Otro</option>";
    concepto.addEventListener("change", function () {
      var t = (C.tarifas || []).filter(function (x) { return x.concepto === concepto.value; })[0];
      if (t && t.monto !== "") $("#pag-monto").value = t.monto;
    });
    $("#pag-fecha").max = new Date().toISOString().slice(0, 10);
    iniciarAdjuntos($("#pag-voucher"));
    activarValidacionEnVivo(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarZona(form)) return;
      procesarEnvio(form, "pago", {
        titulo: "Pago registrado",
        mensaje: "Verificaremos la operación con el comprobante adjunto. Puede consultar el estado con su número y DNI.",
        resumen: [["Nombre", "nombres"], ["DNI", "dni"], ["Concepto", "concepto"], ["Monto (S/)", "monto"], ["N.° de operación", "operacion"]]
      });
    });
  }

  // ---------------------------------------------------------------- MESA DE PARTES Y CONSULTA
  function initTramites() {
    var form = $("#form-tramite");
    if (!form) return;
    $("#tra-tipo").innerHTML = '<option value="">Elija el tipo de trámite</option>' +
      (C.tiposTramite || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("");
    if (C.avisoMesaPartes) $("#aviso-mesa").textContent = C.avisoMesaPartes + (C.horarioAtencion ? " Horario: " + C.horarioAtencion + "." : "");
    iniciarAdjuntos($("#tra-adjuntos"));
    activarValidacionEnVivo(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarZona(form)) return;
      procesarEnvio(form, "mesa_partes", {
        titulo: "Documento recibido",
        mensaje: "Su expediente fue registrado en la mesa de partes virtual. Le responderemos por correo o celular.",
        resumen: [["Remitente", "nombres"], ["DNI", "dni"], ["Trámite", "tipo_tramite"], ["Asunto", "asunto"]]
      });
    });

    // Pestañas
    var botones = $$(".pestanas button");
    function mostrar(id) {
      botones.forEach(function (b) {
        var activo = b.getAttribute("aria-controls") === id;
        b.setAttribute("aria-selected", activo ? "true" : "false");
        $("#" + b.getAttribute("aria-controls")).hidden = !activo;
      });
    }
    botones.forEach(function (b) { b.addEventListener("click", function () { mostrar(b.getAttribute("aria-controls")); history.replaceState(null, "", "#" + (b.getAttribute("aria-controls") === "panel-consulta" ? "consulta" : "presentar")); }); });
    if (location.hash === "#consulta") mostrar("panel-consulta");
    var cod = parametro("codigo");
    if (cod) $("#con-codigo").value = cod;

    var fc = $("#form-consulta");
    activarValidacionEnVivo(fc);
    fc.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarZona(fc)) return;
      consultar($("#con-codigo").value.trim().toUpperCase(), $("#con-dni").value.trim());
    });
  }

  function consultar(codigo, dni) {
    var zona = $("#resultado-consulta"), boton = $("#form-consulta button[type=submit]");
    boton.disabled = true;
    zona.innerHTML = '<p class="mensaje info">Buscando…</p>';
    var promesa = MODO_DEMO
      ? new Promise(function (ok) { setTimeout(function () { ok({ ok: true, demo: true, tramite: { codigo: codigo, tipo: "Trámite de prueba", estado: "En revisión", fecha: new Date().toLocaleDateString("es-PE"), observacion: "Modo demostración: este resultado es de ejemplo." } }); }, 700); })
      : fetch(C.urlServidor + "?accion=consulta&codigo=" + encodeURIComponent(codigo) + "&dni=" + encodeURIComponent(dni))
          .then(function (r) { if (!r.ok) throw new Error("Error del servidor (" + r.status + ")."); return r.json(); });
    promesa.then(function (res) {
      boton.disabled = false;
      if (!res.ok) {
        zona.innerHTML = '<div class="mensaje error" role="alert">' + esc(res.error || "No encontramos un trámite con ese número y DNI. Revise que estén bien escritos.") + "</div>";
        return;
      }
      var t = res.tramite, clase = /atendid|matriculad|validad|aprobad/i.test(t.estado) ? "atendido" :
        /observ/i.test(t.estado) ? "observado" : /rechaz|anulad/i.test(t.estado) ? "rechazado" : "";
      zona.innerHTML = '<div class="estado-tramite" role="status"><h3>' + esc(t.codigo) + '</h3><span class="etiqueta-estado ' + clase + '">' + esc(t.estado) +
        "</span><dl><dt>Trámite</dt><dd>" + esc(t.tipo) + "</dd><dt>Recibido</dt><dd>" + esc(t.fecha) + "</dd>" +
        (t.actualizado ? "<dt>Última actualización</dt><dd>" + esc(t.actualizado) + "</dd>" : "") +
        (t.observacion ? "<dt>Observación</dt><dd>" + esc(t.observacion) + "</dd>" : "") + "</dl></div>";
    }).catch(function (err) {
      boton.disabled = false;
      zona.innerHTML = '<div class="mensaje error" role="alert">No se pudo consultar. ' + esc(err.message) + " Revise su conexión e intente otra vez.</div>";
    });
  }

  // ---------------------------------------------------------------- medios de pago en los textos
  function textoMedios() {
    var m = [];
    if (C.yape && C.yape.numero) m.push("Yape");
    if (C.plin && C.plin.numero) m.push("Plin");
    if (C.banco && C.banco.cuenta) m.push("depósito bancario");
    if (!m.length) return "";
    return m.length === 1 ? m[0] : m.slice(0, -1).join(", ") + " o " + m[m.length - 1];
  }
  function pintarTextosMedios() {
    var t = textoMedios();
    if (!t) return;
    $$(".texto-medios").forEach(function (el) { el.textContent = t; });
  }

  // ---------------------------------------------------------------- arranque
  document.addEventListener("DOMContentLoaded", function () {
    if (C.nombre) document.title = document.title.replace("CETPRO Chupa", C.nombre);
    renderCabecera();
    renderPie();
    renderInicio();
    pintarTextosMedios();
    initMatricula();
    initPagos();
    initTramites();
  });
})();
