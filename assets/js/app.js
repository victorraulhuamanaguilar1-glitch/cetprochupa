/* =====================================================================
   CETPRO CHUPA · Lógica del sitio v2 (sin librerías externas)
   ===================================================================== */
(function () {
  "use strict";

  var C = window.CETPRO || {};
  var MODO_DEMO = !C.urlServidor;
  var MAX_ARCHIVO_MB = 4;
  var CLAVE_CACHE = "cetpro_contenido_v2";
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
               "septiembre", "octubre", "noviembre", "diciembre"];
  var MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];

  // ================================================================ iconos
  var ICONOS = {
    matricula: '<path d="M4 19.5V5a2 2 0 0 1 2-2h9l5 5v11.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5Z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>',
    documento: '<path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 7l3-4h12l3 4M9 12h6"/>',
    pago: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    ok: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
    izq: '<path d="m15 5-7 7 7 7"/>',
    der: '<path d="m9 5 7 7-7 7"/>',
    alerta: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17.5v.5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    enlace: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8Z"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.8 8.6c.2-.5.5-.6.8-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.4 0 .6.6 1 1.4 1.8 2.5 2.4.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .9-.6 1.8-1.6 2-.8.1-1.8.1-4-1.1-2.1-1.2-3.4-3.3-3.6-3.7-.3-.4-.9-1.6-.9-2.7 0-.6.2-1.1.4-1.4Z"/>',
    // Oficios
    computacion: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    construccion: '<path d="M4 15a8 8 0 0 1 16 0"/><path d="M2 15h20v3H2zM10 7v4M14 7v4"/>',
    mecanica: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    cosmetologia: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    textil: '<path d="M20.4 6.6 16 4a4 4 0 0 1-8 0L3.6 6.6a1 1 0 0 0-.5 1.2l1.2 3.3a1 1 0 0 0 1.2.6L7 11v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9l1.5.7a1 1 0 0 0 1.2-.6l1.2-3.3a1 1 0 0 0-.5-1.2z"/>',
    oficio: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M20 17v4H6.5A2.5 2.5 0 0 1 4 18.5"/>'
  };
  function icono(nombre, tam) {
    tam = tam || 22;
    return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS[nombre] || ICONOS.oficio) + '</svg>';
  }
  function iconoOficio(nombre) {
    var n = normalizar(nombre);
    if (/comput|inform|ofimat/.test(n)) return "computacion";
    if (/constru|albañ|alban/.test(n)) return "construccion";
    if (/mecan|moto|auto/.test(n)) return "mecanica";
    if (/cosmet|belleza|peluq|estet/.test(n)) return "cosmetologia";
    if (/confec|textil|costur|tejid/.test(n)) return "textil";
    return "oficio";
  }

  // ================================================================ utilidades
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function normalizar(t) {
    return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function slug(t) { return normalizar(t).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function fechaLarga(iso) {
    var p = String(iso || "").split("-");
    if (p.length !== 3) return esc(iso);
    return Number(p[2]) + " de " + MESES[Number(p[1]) - 1] + " de " + p[0];
  }
  function fechaCorta(iso) {
    var p = String(iso || "").split("-");
    if (p.length !== 3) return { dia: "", mes: "", anio: "" };
    return { dia: Number(p[2]), mes: MESES_CORTOS[Number(p[1]) - 1], anio: p[0] };
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
  function parrafos(texto) {
    return String(texto || "").split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean)
      .map(function (p) { return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>"; }).join("");
  }
  function lista(items) {
    return "<ul>" + (items || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }
  function guardarLocal(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  function leerLocal(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function tarifaModulo() {
    var t = (C.tarifas || []).filter(function (x) { return /matr[ií]cula/i.test(x.concepto); })[0];
    return t && t.monto !== "" ? Number(t.monto) : Number(C.tarifaModulo || 0);
  }

  // ================================================================ datos (hoja de Google + respaldo)
  function datosRespaldo() {
    return {
      institucion: C.institucional || {},
      especialidades: (C.especialidades || []).map(function (e) {
        return Object.assign({ id: slug(e.nombre), galeria: [], portada: null, modulos: [], campoLaboral: [], requisitos: [] }, e);
      }),
      docentes: [],
      publicaciones: (C.noticias || []).map(function (n) {
        return { id: n.fecha + "-" + slug(n.titulo), fecha: n.fecha, categoria: n.categoria || "Comunicado", titulo: n.titulo,
                 resumen: n.texto, contenido: n.texto, fotos: [], destacado: true };
      })
    };
  }
  function combinar(servidor) {
    var base = datosRespaldo();
    if (!servidor || !servidor.ok) return base;
    var inst = Object.assign({}, base.institucion);
    Object.keys(servidor.institucion || {}).forEach(function (k) {
      var v = servidor.institucion[k];
      if (v && (!Array.isArray(v) || v.length)) inst[k] = v;
    });
    return {
      institucion: inst,
      especialidades: (servidor.especialidades || []).length ? servidor.especialidades : base.especialidades,
      docentes: servidor.docentes || [],
      publicaciones: (servidor.publicaciones || []).length ? servidor.publicaciones : base.publicaciones
    };
  }
  function pedirContenido() {
    if (MODO_DEMO) return Promise.resolve(null);
    var control = window.AbortController ? new AbortController() : null;
    var t = setTimeout(function () { if (control) control.abort(); }, 9000);
    return fetch(C.urlServidor + "?accion=contenido", control ? { signal: control.signal } : {})
      .then(function (r) { clearTimeout(t); if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { if (j && j.ok) { guardarLocal(CLAVE_CACHE, JSON.stringify(j)); return j; } return null; })
      .catch(function () { clearTimeout(t); return null; });
  }
  /** Entrega los datos: al instante desde la memoria del navegador y luego los actualiza. */
  function conDatos(pintar, volverAPintar) {
    var guardado = leerLocal(CLAVE_CACHE), previo = null;
    try { previo = guardado ? JSON.parse(guardado) : null; } catch (e) { previo = null; }
    if (previo) pintar(combinar(previo));
    var pedido = pedirContenido();
    pedido.then(function (nuevo) {
      if (!previo) pintar(combinar(nuevo));
      else if (nuevo && volverAPintar && JSON.stringify(nuevo.especialidades) + JSON.stringify(nuevo.publicaciones) + JSON.stringify(nuevo.institucion) !==
               JSON.stringify(previo.especialidades) + JSON.stringify(previo.publicaciones) + JSON.stringify(previo.institucion)) {
        pintar(combinar(nuevo));
      }
    });
  }

  // ================================================================ cabecera y pie
  function renderCabecera() {
    var pagina = document.body.getAttribute("data-pagina");
    var enlaces = [
      ["inicio", "index.html", "Inicio"],
      ["nosotros", "nosotros.html", "Nosotros"],
      ["especialidades", "especialidades.html", "Especialidades"],
      ["actividades", "actividades.html", "Actividades"],
      ["tramites", "tramites.html", "Trámites"],
      ["pagos", "pagos.html", "Pagos"]
    ];
    var html = "";
    if (MODO_DEMO) {
      html += '<div class="aviso-demo" role="status">Modo demostración: los formularios todavía no guardan datos.</div>';
    }
    html += '<div class="contenedor">' +
      '<a class="marca" href="index.html">' +
      (C.logo ? '<img src="' + esc(C.logo) + '" alt="" width="40" height="52" onerror="this.outerHTML=\'<span class=&quot;sin-logo&quot;>' + esc(iniciales(C.nombre)) + '</span>\'">'
              : '<span class="sin-logo">' + esc(iniciales(C.nombre)) + '</span>') +
      '<span><strong>' + esc(C.nombre) + '</strong><span>' + esc(C.subtitulo || "Educación técnico-productiva") + '</span></span></a>' +
      '<button class="boton-hamburguesa" aria-expanded="false" aria-controls="menu-principal">' + icono("menu", 20) + ' Menú</button>' +
      '<nav class="menu" id="menu-principal" aria-label="Principal">';
    var actual = pagina === "especialidad" ? "especialidades" : pagina === "actividad" ? "actividades" : pagina;
    enlaces.forEach(function (e) {
      html += '<a href="' + e[1] + '"' + (actual === e[0] ? ' aria-current="page"' : "") + '>' + e[2] + '</a>';
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
      "<div><strong>Institución</strong><ul>" +
      '<li><a href="nosotros.html">Misión y visión</a></li><li><a href="especialidades.html">Especialidades</a></li>' +
      '<li><a href="actividades.html">Actividades y noticias</a></li><li><a href="index.html#contacto">Ubicación</a></li></ul></div>' +
      "<div><strong>Trámites en línea</strong><ul>" +
      '<li><a href="matricula.html">Matrícula</a></li><li><a href="tramites.html">Mesa de partes virtual</a></li>' +
      '<li><a href="pagos.html">Registrar un pago</a></li><li><a href="tramites.html#consulta">Consultar mi trámite</a></li></ul></div>' +
      "<div><strong>Contacto</strong><ul>" + (contacto.join("") || "<li>Atención presencial en la institución</li>") + "</ul></div>" +
      '<p class="legal">Los datos personales que registre se usan solo para atender su trámite, conforme a la Ley N.° 29733, ' +
      "Ley de Protección de Datos Personales. © " + new Date().getFullYear() + " " + esc(C.nombreCompleto || C.nombre) + ".</p></div>";

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

  // ================================================================ piezas reutilizables
  function medio(img, nombreIcono, clase) {
    if (img && img.min) {
      return '<div class="media ' + (clase || "") + '"><img src="' + esc(img.min) + '" alt="" loading="lazy" ' +
        'onerror="this.parentNode.classList.add(\'sin-foto\');this.remove()"></div>';
    }
    return '<div class="media sin-foto ' + (clase || "") + '"><span class="icono-oficio">' + icono(nombreIcono, 46) + "</span></div>";
  }
  function claseCategoria(cat) { return "cat cat-" + slug(cat || "actividad"); }

  function tarjetaEspecialidad(e) {
    return '<a class="tile" href="especialidad.html?e=' + encodeURIComponent(e.id || slug(e.nombre)) + '">' +
      medio(e.portada, iconoOficio(e.nombre)) +
      '<div class="tile-cuerpo"><h3>' + esc(e.nombre) + "</h3><p>" + esc(e.resumen || e.descripcion || "") + "</p>" +
      '<span class="tile-enlace">Ver especialidad</span></div></a>';
  }

  function tarjetaPublicacion(p) {
    var f = fechaCorta(p.fecha);
    return '<a class="pub" href="actividad.html?id=' + encodeURIComponent(p.id) + '">' +
      medio(p.fotos && p.fotos[0], "oficio", "pub-media") +
      '<div class="pub-cuerpo"><div class="pub-meta"><span class="' + claseCategoria(p.categoria) + '">' + esc(p.categoria) + "</span>" +
      (p.fecha ? '<time datetime="' + esc(p.fecha) + '">' + f.dia + " " + f.mes + " " + f.anio + "</time>" : "") + "</div>" +
      "<h3>" + esc(p.titulo) + "</h3>" + (p.resumen ? "<p>" + esc(p.resumen) + "</p>" : "") +
      (p.fotos && p.fotos.length > 1 ? '<span class="pub-fotos">' + p.fotos.length + " fotos</span>" : "") + "</div></a>";
  }

  // ================================================================ INICIO
  function paginaInicio(D) {
    var t = $("#texto-portada");
    if (t) t.textContent = C.descripcion || "";
    var dp = $("#datos-portada");
    if (dp) {
      var d = ["<span><strong>" + D.especialidades.length + "</strong> especialidades</span>"];
      if (C.matriculaAbierta) d.push("<span>Matrícula <strong>" + esc(C.periodoMatricula) + "</strong> abierta</span>");
      if (tarifaModulo()) d.push("<span><strong>" + soles(tarifaModulo()) + "</strong> por módulo</span>");
      dp.innerHTML = d.join("");
    }
    var g = $("#grid-especialidades");
    if (g) g.innerHTML = D.especialidades.map(tarjetaEspecialidad).join("");
    var pubs = $("#ultimas-publicaciones");
    if (pubs) {
      var lista3 = D.publicaciones.filter(function (p) { return p.destacado; }).concat(D.publicaciones.filter(function (p) { return !p.destacado; })).slice(0, 3);
      lista3.sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
      pubs.innerHTML = lista3.map(tarjetaPublicacion).join("");
      $("#noticias").hidden = !lista3.length;
    }
    var req = $("#lista-requisitos");
    if (req) req.innerHTML = (C.requisitos || []).map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");
    $$(".periodo").forEach(function (el) { el.textContent = C.periodoMatricula || ""; });
    var dl = $("#datos-contacto");
    if (dl) {
      var filas = [];
      if (C.direccion) filas.push(["Dirección", esc(C.direccion)]);
      if (C.horarioAtencion) filas.push(["Horario de atención", esc(C.horarioAtencion)]);
      if (C.telefono) filas.push(["Teléfono", '<a href="tel:' + esc(C.telefono.replace(/\s/g, "")) + '">' + esc(C.telefono) + "</a>"]);
      if (C.whatsapp) filas.push(["WhatsApp", '<a href="https://wa.me/' + esc(C.whatsapp.replace(/\D/g, "")) + '" target="_blank" rel="noopener">Escribir un mensaje</a>']);
      if (C.correo) filas.push(["Correo", '<a href="mailto:' + esc(C.correo) + '">' + esc(C.correo) + "</a>"]);
      dl.innerHTML = filas.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + f[1] + "</dd></div>"; }).join("");
    }
    var mapa = $("#mapa");
    if (mapa && C.ubicacionMapa && !mapa.src) {
      mapa.src = "https://www.google.com/maps?q=" + encodeURIComponent(C.ubicacionMapa) + "&output=embed";
    }
  }

  // ================================================================ NOSOTROS
  function paginaNosotros(D) {
    var I = D.institucion || {};
    var cont = $("#nosotros");
    if (!cont) return;
    var valores = Array.isArray(I.valores) ? I.valores : String(I.valores || "").split(/\n/).filter(Boolean);
    var h = "";
    h += '<section class="seccion blanca"><div class="contenedor mv">' +
      (I.mision ? '<article class="mv-item"><h2>Misión</h2><p>' + esc(I.mision) + "</p></article>" : "") +
      (I.vision ? '<article class="mv-item"><h2>Visión</h2><p>' + esc(I.vision) + "</p></article>" : "") + "</div></section>";
    if (valores.length || C.lema) {
      h += '<section class="seccion"><div class="contenedor"><h2 class="titulo">Nuestros valores</h2>' +
        (C.lema ? '<p class="bajada">Nuestro lema: <strong>' + esc(C.lema) + "</strong></p>" : "") +
        '<ul class="valores">' + valores.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("") + "</ul></div></section>";
    }
    if (I.mensaje_director || I.director) {
      h += '<section class="seccion blanca"><div class="contenedor angosto-texto"><h2 class="titulo">Mensaje de la dirección</h2>' +
        (I.mensaje_director ? '<blockquote class="mensaje-director">' + parrafos(I.mensaje_director) + "</blockquote>" : "") +
        (I.director ? '<p class="firma-director"><strong>' + esc(I.director) + "</strong><br>Director(a)</p>" : "") + "</div></section>";
    }
    if (I.resena) {
      h += '<section class="seccion"><div class="contenedor angosto-texto"><h2 class="titulo">Nuestra historia</h2>' +
        (I.anio_creacion ? '<p class="bajada">Desde ' + esc(I.anio_creacion) + " formando técnicos en Chupa.</p>" : "") +
        '<div class="texto-largo">' + parrafos(I.resena) + "</div></div></section>";
    }
    if (D.docentes.length) {
      h += '<section class="seccion blanca"><div class="contenedor"><h2 class="titulo">Nuestro equipo</h2>' +
        '<p class="bajada">Docentes y personal de la institución.</p><ul class="equipo">' +
        D.docentes.map(function (p) {
          return '<li class="persona">' + (p.foto && p.foto.min ? '<img src="' + esc(p.foto.min) + '" alt="" loading="lazy">'
            : '<span class="sin-foto-persona">' + icono("usuario", 34) + "</span>") +
            "<strong>" + esc(p.nombre) + "</strong><span>" + esc([p.cargo, p.especialidad].filter(Boolean).join(" · ")) + "</span></li>";
        }).join("") + "</ul></div></section>";
    }
    if ((C.datosInstitucionales || []).length) {
      h += '<section class="seccion"><div class="contenedor"><h2 class="titulo">Datos institucionales</h2>' +
        '<table class="tabla-datos"><tbody>' + C.datosInstitucionales.map(function (f) {
          return '<tr><th scope="row">' + esc(f[0]) + "</th><td>" + esc(f[1]) + "</td></tr>";
        }).join("") + "</tbody></table></div></section>";
    }
    cont.innerHTML = h;
  }

  // ================================================================ ESPECIALIDADES
  function paginaEspecialidades(D) {
    var g = $("#lista-especialidades");
    if (g) g.innerHTML = D.especialidades.map(tarjetaEspecialidad).join("");
  }

  function paginaEspecialidad(D) {
    var cont = $("#especialidad");
    if (!cont) return;
    var clave = parametro("e");
    var e = D.especialidades.filter(function (x) { return (x.id || slug(x.nombre)) === clave || slug(x.nombre) === slug(clave); })[0];
    if (!e) {
      cont.innerHTML = '<div class="contenedor seccion"><div class="mensaje info"><strong>No encontramos esa especialidad.</strong> ' +
        'Vea la <a href="especialidades.html">lista de especialidades</a>.</div></div>';
      return;
    }
    document.title = e.nombre + " · " + (C.nombre || "CETPRO");
    var tarifa = tarifaModulo();
    var datos = [];
    if (e.duracion) datos.push(["Duración", e.duracion]);
    if (e.horario) datos.push(["Horario", e.horario]);
    if (e.modulos && e.modulos.length) datos.push(["Módulos", e.modulos.length + " módulo(s)"]);
    if (tarifa) datos.push(["Matrícula", soles(tarifa) + " por módulo"]);
    if (e.certificacion) datos.push(["Certificación", e.certificacion]);
    if (e.docente) datos.push(["Docente", e.docente]);
    var requisitos = (e.requisitos && e.requisitos.length) ? e.requisitos : (C.requisitos || []);
    var mods = (e.modulos || []).map(function (m, i) {
      return '<details class="modulo"' + (i === 0 ? " open" : "") + "><summary><span class=\"num\">" + (i + 1) + "</span><span class=\"nom\">" +
        esc(m.nombre) + "</span>" + (m.horas ? '<span class="horas">' + esc(m.horas) + " h</span>" : "") + "</summary>" +
        (m.contenidos && m.contenidos.length ? lista(m.contenidos) : "<p>Contenidos por publicar.</p>") + "</details>";
    }).join("");
    var portada = e.portada && e.portada.url;
    cont.innerHTML =
      '<section class="esp-portada' + (portada ? " con-foto" : "") + '"' + (portada ? ' style="--foto:url(\'' + esc(portada) + '\')"' : "") + ">" +
      '<div class="contenedor"><a class="volver" href="especialidades.html">' + icono("izq", 16) + " Especialidades</a>" +
      '<span class="esp-icono">' + icono(iconoOficio(e.nombre), 40) + "</span><h1>" + esc(e.nombre) + "</h1>" +
      (e.resumen ? '<p class="esp-resumen">' + esc(e.resumen) + "</p>" : "") + "</div></section>" +
      '<div class="aguayo fina" role="presentation"></div>' +
      '<div class="contenedor esp-cuerpo"><div class="esp-principal">' +
      (e.descripcion ? '<section><h2>De qué trata</h2>' + parrafos(e.descripcion) + "</section>" : "") +
      '<section><h2>Qué aprenderás</h2>' + (mods ? '<div class="modulos">' + mods + "</div>"
        : '<p class="nota-suave">El plan de módulos se publicará pronto. Consulte en secretaría o por WhatsApp.</p>') + "</section>" +
      (e.perfil ? '<section><h2>Al terminar podrás</h2><p class="destacado">' + esc(e.perfil) + "</p></section>" : "") +
      (e.campoLaboral && e.campoLaboral.length ? '<section><h2>Dónde podrás trabajar</h2><ul class="lista-check">' +
        e.campoLaboral.map(function (c) { return "<li>" + icono("ok", 18) + "<span>" + esc(c) + "</span></li>"; }).join("") + "</ul></section>" : "") +
      (e.galeria && e.galeria.length ? '<section><h2>Galería</h2><div class="galeria" data-galeria>' +
        e.galeria.map(function (f, i) { return '<button type="button" class="foto" data-i="' + i + '"><img src="' + esc(f.min) + '" alt="Foto ' + (i + 1) + " de " + esc(e.nombre) + '" loading="lazy"></button>'; }).join("") +
        "</div></section>" : "") +
      "</div>" +
      '<aside class="esp-lateral"><div class="ficha"><h2>Datos de la especialidad</h2><dl>' +
      datos.map(function (d) { return "<div><dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd></div>"; }).join("") + "</dl>" +
      "<h3>Requisitos</h3>" + lista(requisitos) +
      '<a class="boton exito ancho" href="matricula.html?esp=' + encodeURIComponent(e.nombre) + '">Matricularme en esta especialidad</a>' +
      (C.whatsapp ? '<a class="boton secundario ancho" target="_blank" rel="noopener" href="https://wa.me/' + esc(C.whatsapp.replace(/\D/g, "")) +
        "?text=" + encodeURIComponent("Hola, quisiera información sobre la especialidad de " + e.nombre) + '">Preguntar por WhatsApp</a>' : "") +
      "</div></aside></div>";
    activarGaleria(cont, e.galeria || [], e.nombre);
    var otras = $("#otras-especialidades");
    if (otras) otras.innerHTML = D.especialidades.filter(function (x) { return x !== e; }).map(tarjetaEspecialidad).join("");
  }

  // ================================================================ ACTIVIDADES
  var estadoActividades = { categoria: "", texto: "", anio: "", mostrar: 9 };
  function paginaActividades(D) {
    var cont = $("#portal");
    if (!cont) return;
    var pubs = D.publicaciones;
    var categorias = [];
    pubs.forEach(function (p) { if (categorias.indexOf(p.categoria) < 0) categorias.push(p.categoria); });
    var anios = [];
    pubs.forEach(function (p) { var a = String(p.fecha).slice(0, 4); if (a && anios.indexOf(a) < 0) anios.push(a); });
    var catParam = parametro("categoria");
    if (catParam && !estadoActividades._iniciado) estadoActividades.categoria = catParam;
    estadoActividades._iniciado = true;
    $("#filtros").innerHTML =
      '<div class="chips" role="group" aria-label="Filtrar por categoría"><button type="button" data-cat="" class="chip">Todas</button>' +
      categorias.map(function (c) { return '<button type="button" class="chip" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>" +
      '<div class="filtros-der"><label class="visualmente-oculto" for="buscar-act">Buscar</label>' +
      '<input id="buscar-act" type="search" placeholder="Buscar actividades…" value="' + esc(estadoActividades.texto) + '">' +
      '<label class="visualmente-oculto" for="anio-act">Año</label><select id="anio-act"><option value="">Todos los años</option>' +
      anios.map(function (a) { return "<option" + (a === estadoActividades.anio ? " selected" : "") + ">" + a + "</option>"; }).join("") + "</select></div>";
    function pintar() {
      var t = normalizar(estadoActividades.texto);
      var filtradas = pubs.filter(function (p) {
        return (!estadoActividades.categoria || p.categoria === estadoActividades.categoria) &&
          (!estadoActividades.anio || String(p.fecha).slice(0, 4) === estadoActividades.anio) &&
          (!t || normalizar(p.titulo + " " + p.resumen + " " + p.contenido + " " + p.categoria).indexOf(t) >= 0);
      });
      $$(".chip", cont).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-cat") === estadoActividades.categoria ? "true" : "false"); });
      var destacada = !estadoActividades.categoria && !t && !estadoActividades.anio ? filtradas.filter(function (p) { return p.destacado && p.fotos && p.fotos.length; })[0] : null;
      var resto = filtradas.filter(function (p) { return p !== destacada; });
      $("#destacada").innerHTML = destacada ? '<a class="pub-destacada" href="actividad.html?id=' + encodeURIComponent(destacada.id) + '">' +
        '<img src="' + esc(destacada.fotos[0].url) + '" alt="" loading="lazy"><div><span class="' + claseCategoria(destacada.categoria) + '">' +
        esc(destacada.categoria) + "</span><h2>" + esc(destacada.titulo) + "</h2><p>" + esc(destacada.resumen) + "</p><time>" +
        fechaLarga(destacada.fecha) + "</time></div></a>" : "";
      $("#grid-publicaciones").innerHTML = resto.slice(0, estadoActividades.mostrar).map(tarjetaPublicacion).join("") ||
        '<p class="vacio">No hay publicaciones con esos filtros.</p>';
      var mas = $("#ver-mas");
      mas.hidden = resto.length <= estadoActividades.mostrar;
      $("#conteo-act").textContent = filtradas.length + (filtradas.length === 1 ? " publicación" : " publicaciones");
    }
    $$(".chip", cont).forEach(function (b) {
      b.addEventListener("click", function () { estadoActividades.categoria = b.getAttribute("data-cat"); estadoActividades.mostrar = 9; pintar(); });
    });
    $("#buscar-act").addEventListener("input", function () { estadoActividades.texto = this.value; pintar(); });
    $("#anio-act").addEventListener("change", function () { estadoActividades.anio = this.value; pintar(); });
    $("#ver-mas").onclick = function () { estadoActividades.mostrar += 9; pintar(); };
    pintar();
  }

  function paginaActividad(D) {
    var cont = $("#actividad");
    if (!cont) return;
    var id = parametro("id");
    var p = D.publicaciones.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      cont.innerHTML = '<div class="contenedor seccion"><div class="mensaje info"><strong>No encontramos esa publicación.</strong> ' +
        'Puede que aún se esté cargando o que haya sido retirada. Vea <a href="actividades.html">todas las actividades</a>.</div></div>';
      return;
    }
    document.title = p.titulo + " · " + (C.nombre || "CETPRO");
    var url = location.href.split("#")[0];
    var fotos = p.fotos || [];
    cont.innerHTML =
      '<article class="contenedor articulo"><a class="volver oscuro" href="actividades.html">' + icono("izq", 16) + " Actividades</a>" +
      '<header class="art-cabecera"><div class="pub-meta"><span class="' + claseCategoria(p.categoria) + '">' + esc(p.categoria) + "</span>" +
      (p.fecha ? '<time datetime="' + esc(p.fecha) + '">' + fechaLarga(p.fecha) + "</time>" : "") + "</div>" +
      "<h1>" + esc(p.titulo) + "</h1>" + (p.resumen ? '<p class="art-resumen">' + esc(p.resumen) + "</p>" : "") + "</header>" +
      (fotos.length ? '<button type="button" class="art-portada" data-i="0"><img src="' + esc(fotos[0].url) + '" alt="Foto principal: ' + esc(p.titulo) + '"></button>' : "") +
      '<div class="art-texto">' + parrafos(p.contenido || p.resumen) + "</div>" +
      (fotos.length > 1 ? '<section class="art-galeria"><h2>Galería · ' + fotos.length + ' fotos</h2><div class="galeria" data-galeria>' +
        fotos.map(function (f, i) { return '<button type="button" class="foto" data-i="' + i + '"><img src="' + esc(f.min) + '" alt="Foto ' + (i + 1) + '" loading="lazy"></button>'; }).join("") +
        "</div></section>" : "") +
      '<div class="compartir"><span>Compartir</span>' +
      '<a class="btn-red wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(p.titulo + " · " + url) + '">' + icono("whatsapp", 18) + " WhatsApp</a>" +
      '<a class="btn-red fb" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '">' + icono("facebook", 18) + " Facebook</a>" +
      '<button type="button" class="btn-red" id="copiar-enlace">' + icono("enlace", 18) + " Copiar enlace</button></div></article>";
    activarGaleria(cont, fotos, p.titulo);
    $("#copiar-enlace").addEventListener("click", function () {
      var b = this;
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        b.lastChild.textContent = " Enlace copiado";
      }).catch(function () { prompt("Copie el enlace:", url); });
    });
    var rel = $("#relacionadas");
    if (rel) {
      var otras = D.publicaciones.filter(function (x) { return x !== p; });
      otras.sort(function (a, b) { return (b.categoria === p.categoria) - (a.categoria === p.categoria); });
      rel.innerHTML = otras.slice(0, 3).map(tarjetaPublicacion).join("");
      $("#seccion-relacionadas").hidden = !otras.length;
    }
  }

  // ================================================================ visor de fotos
  var visor = null;
  function activarGaleria(cont, fotos, titulo) {
    if (!fotos.length) return;
    $$("[data-i]", cont).forEach(function (b) {
      b.addEventListener("click", function () { abrirVisor(fotos, Number(b.getAttribute("data-i")), titulo); });
    });
  }
  function abrirVisor(fotos, inicio, titulo) {
    if (!visor) {
      visor = document.createElement("dialog");
      visor.className = "visor";
      visor.innerHTML = '<button type="button" class="visor-cerrar" aria-label="Cerrar">' + icono("cerrar", 26) + "</button>" +
        '<button type="button" class="visor-ant" aria-label="Foto anterior">' + icono("izq", 30) + "</button>" +
        '<figure><img alt=""><figcaption></figcaption></figure>' +
        '<button type="button" class="visor-sig" aria-label="Foto siguiente">' + icono("der", 30) + "</button>";
      document.body.appendChild(visor);
      $(".visor-cerrar", visor).onclick = function () { visor.close(); };
      visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); });
      var x0 = null;
      visor.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      visor.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) visor._mover(dx < 0 ? 1 : -1);
        x0 = null;
      });
      visor.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") visor._mover(1);
        if (e.key === "ArrowLeft") visor._mover(-1);
      });
    }
    var i = inicio;
    function mostrar() {
      $("img", visor).src = fotos[i].url;
      $("img", visor).alt = titulo + " · foto " + (i + 1);
      $("figcaption", visor).textContent = (i + 1) + " de " + fotos.length;
      $(".visor-ant", visor).hidden = $(".visor-sig", visor).hidden = fotos.length < 2;
    }
    visor._mover = function (d) { i = (i + d + fotos.length) % fotos.length; mostrar(); };
    $(".visor-ant", visor).onclick = function () { visor._mover(-1); };
    $(".visor-sig", visor).onclick = function () { visor._mover(1); };
    mostrar();
    if (visor.showModal) visor.showModal(); else visor.setAttribute("open", "");
  }

  // ================================================================ validación de formularios
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
    monto: function (v) { return (Number(v) > 0 && Number(v) < 100000) || "Escriba el monto pagado, por ejemplo 30."; },
    operacion: function (v) { return /^[A-Za-z0-9-]{4,30}$/.test(v) || "Copie el número de operación que aparece en su comprobante."; },
    codigo: function (v) { return /^(EXP|MAT|PAG)-\d{4}-\d{5}$/i.test(v.trim()) || "El número es como MAT-2026-00001."; },
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
      if (el.classList.contains("sin-validar") || el.type === "file" || el.type === "hidden") return;
      if (!validarCampo(el)) { ok = false; primero = primero || el; }
    });
    $$(".archivos[data-requerido]", zona).forEach(function (a) {
      var campo = a.closest(".campo");
      var vacio = !(a._archivos && a._archivos.length);
      campo.classList.toggle("invalido", vacio);
      if (vacio) { $(".error", campo).textContent = a.getAttribute("data-requerido"); ok = false; primero = primero || a; }
    });
    $$("[data-validar]", zona).forEach(function (el) {
      var r = el._validar ? el._validar() : true;
      if (r !== true) { ok = false; primero = primero || el; }
    });
    if (primero) { primero.scrollIntoView({ block: "center", behavior: "smooth" }); if (primero.focus) primero.focus({ preventScroll: true }); }
    return ok;
  }

  function activarValidacionEnVivo(form) {
    $$("input, select, textarea", form).forEach(function (el) {
      if (el.type === "file" || el.type === "hidden") return;
      el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") validarCampo(el); });
      ["input", "change"].forEach(function (ev) {
        el.addEventListener(ev, function () {
          var c = el.closest(".campo") || el.closest(".consentimiento");
          if (c && c.classList.contains("invalido")) validarCampo(el);
        });
      });
    });
    $$('input[data-tipo="dni"], input[data-tipo="celular"]', form).forEach(function (el) {
      el.addEventListener("input", function () { el.value = el.value.replace(/\D/g, "").slice(0, el.getAttribute("data-tipo") === "dni" ? 8 : 9); });
    });
    $$('input[data-tipo="codigo"]', form).forEach(function (el) {
      el.addEventListener("input", function () { el.value = el.value.toUpperCase().replace(/\s/g, ""); });
    });
  }

  // ================================================================ adjuntos
  function iniciarAdjuntos(zona) {
    var input = $("input[type=file]", zona);
    var listaEl = $(".lista-archivos", zona);
    var maximo = Number(zona.getAttribute("data-max") || 3);
    zona._archivos = [];
    function pintar() {
      listaEl.innerHTML = zona._archivos.map(function (f, i) {
        return "<li><span>" + esc(f.name) + " · " + (f.size / 1048576).toFixed(1) + ' MB</span><button type="button" data-i="' + i +
          '" aria-label="Quitar ' + esc(f.name) + '">Quitar</button></li>';
      }).join("");
      $$("button", listaEl).forEach(function (b) {
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
    ["dragenter", "dragover"].forEach(function (ev) { zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.add("arrastrando"); }); });
    ["dragleave", "drop"].forEach(function (ev) { zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.remove("arrastrando"); }); });
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

  // ================================================================ envío al servidor
  function enviar(tipo, datos, archivos, trampa) {
    if (MODO_DEMO) {
      return new Promise(function (ok) {
        setTimeout(function () {
          if (tipo === "subsanacion") return ok({ ok: true, codigo: String(datos.codigo).toUpperCase(), demo: true });
          var pref = { mesa_partes: "EXP", matricula: "MAT", pago: "PAG" }[tipo];
          ok({ ok: true, codigo: pref + "-" + new Date().getFullYear() + "-DEMO" + Math.floor(Math.random() * 900 + 100), demo: true });
        }, 900);
      });
    }
    return leerArchivos(archivos).then(function (adj) {
      return fetch(C.urlServidor, { method: "POST", body: JSON.stringify({ tipo: tipo, datos: datos, archivos: adj, web: trampa || "" }) });
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
      .map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(datos[r[1]]).replace(/\n/g, "<br>") + "</dd></div>"; }).join("");
    form.innerHTML = '<div class="resultado" role="status" tabindex="-1">' +
      '<div class="sello">' + icono("ok", 38) + "</div>" +
      "<h2>" + esc(opciones.titulo) + "</h2>" +
      "<p>" + esc(opciones.antesCodigo || "Guarde este número para consultar el estado de su trámite:") + "</p>" +
      '<div class="codigo">' + esc(codigo) + "</div>" +
      "<p>" + esc(opciones.mensaje) + "</p>" +
      (demo ? '<p class="mensaje info">Modo demostración: este número es de prueba y no se guardó ningún dato.</p>' : "") +
      '<div class="estado-tramite" style="text-align:left"><h3>Cargo de recepción</h3><dl>' +
      "<div><dt>Fecha y hora</dt><dd>" + esc(fecha) + "</dd></div>" + resumen + "</dl></div>" +
      '<div class="acciones-form no-imprimir">' +
      '<button type="button" class="boton secundario" onclick="window.print()">Imprimir o guardar cargo</button>' +
      '<a class="boton" href="tramites.html?codigo=' + encodeURIComponent(codigo) + '#consulta">Consultar estado</a></div></div>';
    $(".resultado", form).focus();
    window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  }

  // ================================================================ MATRÍCULA
  function paginaMatricula(D) {
    var form = $("#form-matricula");
    if (!form || form._iniciado) return;
    form._iniciado = true;
    $$(".periodo").forEach(function (el) { el.textContent = C.periodoMatricula || ""; });
    if (!C.matriculaAbierta) {
      form.innerHTML = '<div class="mensaje info"><strong>La matrícula en línea está cerrada por ahora.</strong> ' +
        "Revise los comunicados o comuníquese con la institución.</div>";
      return;
    }
    var especialidades = D.especialidades;
    var tarifa = tarifaModulo();
    var esp = $("#mat-especialidad");
    esp.innerHTML = '<option value="">Elija una especialidad</option>' + especialidades.map(function (e) {
      return "<option>" + esc(e.nombre) + "</option>";
    }).join("");
    var turno = $("#mat-turno");
    turno.innerHTML = ((C.turnos || []).length === 1 ? "" : '<option value="">Elija un turno</option>') +
      (C.turnos || []).map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("");
    var pre = parametro("esp");
    if (pre) {
      var hallada = especialidades.filter(function (e) { return e.nombre === pre || slug(e.nombre) === slug(pre); })[0];
      if (hallada) esp.value = hallada.nombre;
    }

    // ----- Módulos
    var zonaMod = $("#mat-modulos"), campoMods = $("#mat-modulos-campo");
    var hidMods = $("#mat-modulos-hidden"), hidCant = $("#mat-cantidad");
    function totalTexto(n) { return n && tarifa ? n + " módulo(s) × " + soles(tarifa) + " = " + soles(n * tarifa) : ""; }
    function actualizarTotal() {
      var n = Number(hidCant.value) || 0;
      $("#mat-total").innerHTML = n && tarifa ? "Total a pagar: <strong>" + soles(n * tarifa) + "</strong> <span>(" + totalTexto(n) + ")</span>" : "";
      $("#mat-monto-texto").textContent = n && tarifa ? soles(n * tarifa) + " (" + n + " módulo" + (n > 1 ? "s" : "") + ")" : soles(tarifa) + " por módulo";
      if (n && tarifa) $("#mat-monto").value = n * tarifa;
    }
    function pintarModulos() {
      var e = especialidades.filter(function (x) { return x.nombre === esp.value; })[0];
      hidMods.value = ""; hidCant.value = "";
      if (!e) { zonaMod.innerHTML = '<p class="nota-suave">Elija primero la especialidad.</p>'; actualizarTotal(); return; }
      if (e.modulos && e.modulos.length) {
        zonaMod.innerHTML = '<p class="ayuda-grupo">Marque los módulos en los que se matricula:</p><div class="opciones-modulos">' +
          e.modulos.map(function (m, i) {
            return '<label class="opcion"><input type="checkbox" value="' + esc(m.nombre) + '"' + (i === 0 ? " checked" : "") + '><span><strong>' +
              (i + 1) + ". " + esc(m.nombre) + "</strong>" + (m.horas ? "<em>" + esc(m.horas) + " horas</em>" : "") + "</span></label>";
          }).join("") + "</div>";
        var leer = function () {
          var marcados = $$("input[type=checkbox]", zonaMod).filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
          hidMods.value = marcados.join("\n"); hidCant.value = marcados.length || "";
          actualizarTotal();
          if (campoMods.classList.contains("invalido")) zonaMod._validar();
        };
        $$("input[type=checkbox]", zonaMod).forEach(function (c) { c.addEventListener("change", leer); });
        leer();
      } else {
        var max = Number(C.maxModulos || 6), opts = "";
        for (var k = 1; k <= max; k++) opts += "<option value=\"" + k + "\">" + k + " módulo" + (k > 1 ? "s" : "") + "</option>";
        zonaMod.innerHTML = '<label class="ayuda-grupo" for="mat-cant-sel">¿En cuántos módulos se matricula?</label>' +
          '<select id="mat-cant-sel" class="sin-validar">' + opts + "</select>";
        var sel = $("#mat-cant-sel");
        var leerSel = function () { hidCant.value = sel.value; hidMods.value = ""; actualizarTotal(); };
        sel.addEventListener("change", leerSel);
        leerSel();
      }
    }
    zonaMod.setAttribute("data-validar", "");
    zonaMod._validar = function () {
      var ok = Number(hidCant.value) > 0;
      campoMods.classList.toggle("invalido", !ok);
      $(".error", campoMods).textContent = ok ? "" : "Elija al menos un módulo.";
      return ok || "sin módulos";
    };
    esp.addEventListener("change", pintarModulos);
    pintarModulos();

    pintarMediosPago($("#mat-medios"));
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
      var d = datosDe(form), n = Number(d.cantidad_modulos) || 0;
      var filas = [["Estudiante", d.apellidos + ", " + d.nombres], ["DNI", d.dni], ["Celular", d.celular],
                   ["Especialidad", d.especialidad], ["Módulos", d.modulos ? d.modulos.split("\n").join(" · ") : (n ? n + " módulo(s)" : "")],
                   ["Turno", d.turno], ["N.° de operación", d.operacion], ["Monto pagado", d.monto ? soles(d.monto) : ""]];
      $("#mat-resumen").innerHTML = filas.filter(function (f) { return f[1]; })
        .map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("");
      var esperado = n * tarifa, aviso = $("#mat-aviso-monto");
      aviso.innerHTML = tarifa && n && Number(d.monto) < esperado
        ? '<div class="mensaje error">' + icono("alerta", 18) + " El monto pagado (" + soles(d.monto) + ") es menor al total de " + soles(esperado) +
          ". Su matrícula podría quedar observada.</div>" : "";
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
        mensaje: "Validaremos su pago y sus datos. Consulte el estado con este número y su DNI. Si hay alguna observación, verá el motivo y podrá corregirlo en línea.",
        preparar: function (d) { d.periodo = C.periodoMatricula; d.nombre_completo = d.apellidos + ", " + d.nombres; },
        resumen: [["Estudiante", "nombre_completo"], ["DNI", "dni"], ["Especialidad", "especialidad"], ["Módulos", "modulos"],
                  ["Turno", "turno"], ["Periodo", "periodo"], ["Monto (S/)", "monto"]]
      });
    });
    irA(0);
  }

  // ================================================================ PAGOS
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
    if (t) $$(".texto-medios").forEach(function (el) { el.textContent = t; });
  }
  function pintarMediosPago(zona) {
    if (!zona) return;
    var h = "";
    if (C.yape && C.yape.numero) {
      h += '<div class="medio yape"><h3>Yape</h3><div class="numero">' + esc(C.yape.numero) + "</div>" +
        (C.yape.titular ? '<div class="titular">A nombre de ' + esc(C.yape.titular) + "</div>" : "") +
        '<button type="button" class="copiar" data-copiar="' + esc(C.yape.numero.replace(/\s/g, "")) + '">Copiar número</button>' +
        (C.yape.qr ? '<img src="' + esc(C.yape.qr) + '" alt="Código QR de Yape">' : "") + "</div>";
    }
    if (C.plin && C.plin.numero) {
      h += '<div class="medio plin"><h3>Plin</h3><div class="numero">' + esc(C.plin.numero) + "</div>" +
        (C.plin.titular ? '<div class="titular">A nombre de ' + esc(C.plin.titular) + "</div>" : "") +
        '<button type="button" class="copiar" data-copiar="' + esc(C.plin.numero.replace(/\s/g, "")) + '">Copiar número</button></div>';
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

  function paginaPagos() {
    var form = $("#form-pago");
    if (!form || form._iniciado) return;
    form._iniciado = true;
    $("#tabla-tarifas tbody").innerHTML = (C.tarifas || []).map(function (t) {
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

  // ================================================================ MESA DE PARTES, CONSULTA Y SUBSANACIÓN
  function mostrarPestana(id) {
    $$(".pestanas button").forEach(function (b) {
      var activo = b.getAttribute("aria-controls") === id;
      b.setAttribute("aria-selected", activo ? "true" : "false");
      $("#" + b.getAttribute("aria-controls")).hidden = !activo;
    });
  }

  function paginaTramites() {
    var form = $("#form-tramite");
    if (!form || form._iniciado) return;
    form._iniciado = true;
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
        mensaje: "Su expediente fue registrado en la mesa de partes virtual. Consulte el estado con este número y su DNI.",
        resumen: [["Remitente", "nombres"], ["DNI", "dni"], ["Trámite", "tipo_tramite"], ["Asunto", "asunto"]]
      });
    });

    var mapaHash = { "#consulta": "panel-consulta", "#subsanar": "panel-subsanar", "#presentar": "panel-presentar" };
    $$(".pestanas button").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("aria-controls");
        mostrarPestana(id);
        history.replaceState(null, "", location.pathname + location.search + "#" + id.replace("panel-", ""));
      });
    });
    if (mapaHash[location.hash]) mostrarPestana(mapaHash[location.hash]);
    var cod = parametro("codigo");
    if (cod) { $("#con-codigo").value = cod; $("#sub-codigo").value = cod; }

    var fc = $("#form-consulta");
    activarValidacionEnVivo(fc);
    fc.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarZona(fc)) return;
      consultar($("#con-codigo").value.trim().toUpperCase(), $("#con-dni").value.trim());
    });

    var fs = $("#form-subsanar");
    iniciarAdjuntos($("#sub-adjuntos"));
    activarValidacionEnVivo(fs);
    fs.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarZona(fs)) return;
      procesarEnvio(fs, "subsanacion", {
        titulo: "Corrección enviada",
        antesCodigo: "Recibimos la corrección de su trámite:",
        mensaje: "Revisaremos lo que envió. El estado de su trámite cambió a «Subsanado». Consulte nuevamente en unos días.",
        preparar: function (d) { d.codigo = d.codigo.toUpperCase(); },
        resumen: [["Trámite", "codigo"], ["DNI", "dni"], ["Mensaje", "mensaje"]]
      });
    });
  }

  var GUIA_ESTADOS = {
    "Observado": "Corrija lo indicado en el motivo y envíelo con el botón «Subsanar ahora». No necesita volver a empezar el trámite.",
    "Rechazado": "Su trámite no pudo ser aceptado por el motivo indicado. Si cree que es un error, comuníquese con la institución.",
    "Subsanado": "Recibimos su corrección y la estamos revisando. Le avisaremos cuando cambie el estado.",
    "Matriculado": "Su matrícula está confirmada. Revise los comunicados para la fecha de inicio de clases.",
    "Atendido": "Su trámite fue atendido. Revise el detalle indicado.",
    "Validado": "Su pago fue verificado correctamente."
  };

  function consultar(codigo, dni) {
    var zona = $("#resultado-consulta"), boton = $("#form-consulta button[type=submit]");
    boton.disabled = true;
    zona.innerHTML = '<p class="mensaje info">Buscando…</p>';
    var promesa = MODO_DEMO
      ? new Promise(function (ok) { setTimeout(function () { ok({ ok: true, demo: true, tramite: { codigo: codigo, tipo: "Trámite de prueba", estado: "Observado", fecha: new Date().toLocaleDateString("es-PE"), observacion: "Modo demostración: este resultado es de ejemplo.", puedeSubsanar: true, subsanaciones: 0 } }); }, 700); })
      : fetch(C.urlServidor + "?accion=consulta&codigo=" + encodeURIComponent(codigo) + "&dni=" + encodeURIComponent(dni))
          .then(function (r) { if (!r.ok) throw new Error("Error del servidor (" + r.status + ")."); return r.json(); });
    promesa.then(function (res) {
      boton.disabled = false;
      if (!res.ok) {
        zona.innerHTML = '<div class="mensaje error" role="alert">' + esc(res.error || "No encontramos un trámite con ese número y DNI. Revise que estén bien escritos.") + "</div>";
        return;
      }
      var t = res.tramite;
      var clase = /atendid|matriculad|validad/i.test(t.estado) ? "atendido" : /observ/i.test(t.estado) ? "observado" :
        /rechaz/i.test(t.estado) ? "rechazado" : /subsan/i.test(t.estado) ? "subsanado" : "";
      var requiereMotivo = /observ|rechaz/i.test(t.estado);
      var guia = GUIA_ESTADOS[t.estado] || "Su trámite está en revisión. Le avisaremos cuando cambie el estado.";
      zona.innerHTML = '<div class="estado-tramite consulta-' + (clase || "proceso") + '" role="status">' +
        '<div class="consulta-cabecera"><h3>' + esc(t.codigo) + '</h3><span class="etiqueta-estado ' + clase + '">' + esc(t.estado) + "</span></div>" +
        (t.observacion ? '<div class="motivo ' + (requiereMotivo ? "motivo-alerta" : "motivo-ok") + '"><strong>' +
          (requiereMotivo ? "Motivo" : "Detalle") + "</strong><p>" + esc(t.observacion) + "</p></div>" : "") +
        '<p class="guia-estado">' + esc(guia) + "</p>" +
        (t.puedeSubsanar ? '<button type="button" class="boton exito" id="ir-subsanar">Subsanar ahora</button>' : "") +
        "<dl><dt>Trámite</dt><dd>" + esc(t.tipo) + "</dd><dt>Recibido</dt><dd>" + esc(t.fecha) + "</dd>" +
        (t.actualizado ? "<dt>Última actualización</dt><dd>" + esc(t.actualizado) + "</dd>" : "") +
        (t.subsanaciones ? "<dt>Correcciones enviadas</dt><dd>" + esc(t.subsanaciones) + "</dd>" : "") + "</dl></div>";
      var ir = $("#ir-subsanar");
      if (ir) ir.addEventListener("click", function () {
        $("#sub-codigo").value = codigo; $("#sub-dni").value = dni;
        mostrarPestana("panel-subsanar");
        history.replaceState(null, "", location.pathname + "#subsanar");
        $("#sub-mensaje").focus();
      });
    }).catch(function (err) {
      boton.disabled = false;
      zona.innerHTML = '<div class="mensaje error" role="alert">No se pudo consultar. ' + esc(err.message) + " Revise su conexión e intente otra vez.</div>";
    });
  }

  // ================================================================ arranque
  document.addEventListener("DOMContentLoaded", function () {
    renderCabecera();
    renderPie();
    pintarTextosMedios();
    var pagina = document.body.getAttribute("data-pagina");
    var vistas = { inicio: paginaInicio, nosotros: paginaNosotros, especialidades: paginaEspecialidades,
                   especialidad: paginaEspecialidad, actividades: paginaActividades, actividad: paginaActividad };
    if (vistas[pagina]) conDatos(vistas[pagina], true);
    if (pagina === "matricula") conDatos(paginaMatricula, false);
    if (pagina === "pagos") paginaPagos();
    if (pagina === "tramites") paginaTramites();
  });
})();
