/* =====================================================================
   CONFIGURACIÓN DEL SITIO WEB  ·  CETPRO CONRADO KRETZ LENZ – CHUPA
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesita editar para personalizar la web.
   - Escriba entre comillas "..." y respete las comas al final de cada línea.
   - Si deja un dato vacío ("") ese bloque simplemente no se muestra.
   ===================================================================== */

window.CETPRO = {

  // ---------- Datos de la institución ----------
  nombre: "CETPRO Chupa",
  subtitulo: "“Conrado Kretz Lenz”",
  nombreCompleto: "CETPRO Conrado Kretz Lenz – Chupa",
  codigoModular: "1027291",
  lema: "Estudio · Trabajo · Justicia",
  descripcion: "Centro de Educación Técnico-Productiva público de gestión directa, UGEL Azángaro. " +
               "Formamos jóvenes y adultos de Chupa y sus comunidades en oficios con demanda en la región.",
  direccion: "Jr. San Román s/n, Chupa, Azángaro, Puno",
  ubicacionMapa: "Jirón San Román, Chupa, Azángaro, Puno, Perú",   // Texto que se busca en Google Maps
  telefono: "983 319 569",
  whatsapp: "51983319569",                 // Solo números con 51 delante
  correo: "victorraulhuamanaguilar1@gmail.com",
  facebook: "",                            // Enlace completo a la página de Facebook
  horarioAtencion: "Lunes a viernes, de 2:00 p. m. a 6:00 p. m.",
  logo: "assets/img/logo.png",

  // ---------- Conexión con Google (ver GUIA_PUBLICACION.html) ----------
  // Pegue aquí la URL de su aplicación web de Google Apps Script.
  // Mientras esté vacía, los formularios funcionan en MODO DEMOSTRACIÓN (no guardan nada).
  urlServidor: "https://script.google.com/macros/s/AKfycbz09dT7DlOTfyT_O8RyLwWEKdLLuno9fdhho-li8vDYhlIjlipXSoDJidCofBjNvHo/exec",

  // ---------- Matrícula ----------
  periodoMatricula: "2027-I",
  matriculaAbierta: true,
  edadMinima: 14,
  turnos: ["Tarde"],
  requisitos: [
    "DNI vigente (foto o escaneo legible)",
    "Comprobante del pago de matrícula (S/ 30 por módulo)",
    "Tener 14 años o más"
  ],

  // ---------- Especialidades ----------
  // duracion: déjela vacía si aún no la define.
  // modulos: lista de módulos que se muestran al abrir la especialidad.
  especialidades: [
    {
      nombre: "Computación e Informática",
      descripcion: "Manejo de computadoras, ofimática, mantenimiento de equipos e internet para el trabajo y el emprendimiento.",
      duracion: "",
      horario: "Turno tarde",
      modulos: []
    },
    {
      nombre: "Construcción Civil",
      descripcion: "Técnicas de albañilería, lectura de planos, encofrado y acabados para obras de construcción.",
      duracion: "",
      horario: "Turno tarde",
      modulos: []
    },
    {
      nombre: "Mecánica de Motos",
      descripcion: "Diagnóstico, mantenimiento y reparación de motocicletas y mototaxis.",
      duracion: "",
      horario: "Turno tarde",
      modulos: []
    },
    {
      nombre: "Cosmetología",
      descripcion: "Corte, peinado, tratamientos capilares, maquillaje y cuidado de manos y pies.",
      duracion: "",
      horario: "Turno tarde",
      modulos: []
    },
    {
      nombre: "Confección Textil",
      descripcion: "Diseño, corte y confección de prendas, uso de máquinas industriales y acabados.",
      duracion: "",
      horario: "Turno tarde",
      modulos: []
    }
  ],

  // ---------- Pagos ----------
  // monto: escriba el número (ej. 50) o déjelo vacío "" para mostrar "Consultar".
  tarifas: [
    { concepto: "Matrícula (por módulo)", monto: 30 },
    { concepto: "Constancia de estudios", monto: 10 },
    { concepto: "Certificado de estudios (por módulo)", monto: 40 }
  ],
  yape: { numero: "983 319 569", titular: "Víctor Raúl Huamán Aguilar", qr: "" },   // qr: ruta a la imagen, ej. "assets/img/qr-yape.png"
  plin: { numero: "", titular: "" },
  banco: { nombre: "Banco de la Nación", cuenta: "", cci: "", titular: "" },

  // ---------- Mesa de partes ----------
  tiposTramite: [
    "Solicitud de constancia de estudios",
    "Solicitud de certificado de estudios",
    "Traslado o reserva de matrícula",
    "Justificación de inasistencias",
    "Reclamo o queja",
    "Otro trámite"
  ],
  avisoMesaPartes: "Los documentos enviados fuera del horario de atención se registran el siguiente día hábil.",

  // ---------- Noticias y comunicados (la más reciente primero) ----------
  noticias: [
    {
      fecha: "2026-10-25",
      titulo: "Matrícula 2027-I en línea",
      texto: "Ya puede matricularse desde su celular en cualquiera de nuestras cinco especialidades, en el turno tarde. Pague S/ 30 por módulo por Yape y adjunte la captura en el formulario."
    },
    {
      fecha: "2026-10-25",
      titulo: "Trámites sin viajar",
      texto: "Solicite su constancia o certificado por la mesa de partes virtual y consulte el estado con su número de expediente y DNI."
    }
  ]
};
