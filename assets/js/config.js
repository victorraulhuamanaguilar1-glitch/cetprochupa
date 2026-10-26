/* =====================================================================
   CONFIGURACIÓN DEL SITIO WEB  ·  CETPRO CONRADO KRETZ LENZ – CHUPA
   ---------------------------------------------------------------------
   La mayor parte del contenido (misión, visión, especialidades, módulos,
   docentes y actividades) se edita en la hoja de Google
   "CETPRO Chupa · Trámites en línea", pestañas Web_...  y en el panel.
   Este archivo guarda los datos fijos y sirve de respaldo si la hoja
   no responde.
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
  datosInstitucionales: [
    ["Código modular", "1027291"],
    ["Nivel / modalidad", "Educación Técnico-Productiva (CETPRO)"],
    ["Gestión", "Pública de gestión directa · Sector Educación"],
    ["UGEL", "Azángaro"],
    ["Dirección", "Jr. San Román s/n, Chupa"],
    ["Distrito / provincia / región", "Chupa · Azángaro · Puno"]
  ],
  direccion: "Jr. San Román s/n, Chupa, Azángaro, Puno",
  ubicacionMapa: "Jirón San Román, Chupa, Azángaro, Puno, Perú",   // Texto que se busca en Google Maps
  telefono: "983 319 569",
  whatsapp: "51983319569",                 // Solo números con 51 delante
  correo: "victorraulhuamanaguilar1@gmail.com",
  facebook: "",                            // Enlace completo a la página de Facebook
  horarioAtencion: "Lunes a viernes, de 2:00 p. m. a 6:00 p. m.",
  logo: "assets/img/logo.png",

  // ---------- Conexión con Google ----------
  urlServidor: "https://script.google.com/macros/s/AKfycbz09dT7DlOTfyT_O8RyLwWEKdLLuno9fdhho-li8vDYhlIjlipXSoDJidCofBjNvHo/exec",

  // ---------- Matrícula ----------
  periodoMatricula: "2027-I",
  matriculaAbierta: true,
  edadMinima: 14,
  tarifaModulo: 30,
  maxModulos: 6,
  turnos: ["Tarde"],
  requisitos: [
    "DNI vigente (foto o escaneo legible)",
    "Comprobante del pago de matrícula (S/ 30 por módulo)",
    "Tener 14 años o más"
  ],

  // ---------- Respaldo de contenidos (la hoja de Google tiene prioridad) ----------
  institucional: {
    mision: "Brindar formación técnico-productiva de calidad a jóvenes y adultos de Chupa y sus comunidades, desarrollando competencias laborales y emprendedoras que les permitan insertarse en el mundo del trabajo y mejorar su calidad de vida.",
    vision: "Ser un CETPRO referente en la provincia de Azángaro por la calidad de su formación técnica, su vínculo con el sector productivo y el éxito laboral de sus egresados.",
    valores: ["Estudio", "Trabajo", "Justicia", "Responsabilidad", "Respeto", "Identidad con nuestra comunidad"],
    resena: "",
    director: "",
    mensaje_director: ""
  },

  especialidades: [
    {
      nombre: "Computación e Informática",
      resumen: "Aprende a usar la computadora para el trabajo, la oficina y tu propio negocio.",
      descripcion: "Formación práctica en el manejo de computadoras, programas de oficina, internet y mantenimiento básico de equipos, orientada a la empleabilidad y al emprendimiento.",
      perfil: "Opera computadoras y programas de oficina, elabora documentos, hojas de cálculo y presentaciones, y realiza mantenimiento preventivo de equipos.",
      campoLaboral: ["Asistente de oficina y digitación", "Centros de cómputo e impresiones", "Soporte técnico y mantenimiento de computadoras", "Negocio propio de servicios digitales"],
      certificacion: "Certificado por cada módulo aprobado.", duracion: "", horario: "Turno tarde", modulos: []
    },
    {
      nombre: "Construcción Civil",
      resumen: "Domina las técnicas de construcción que más se necesitan en la región.",
      descripcion: "Formación en albañilería, lectura de planos, encofrado, acabados y seguridad en obra, con prácticas en situaciones reales de trabajo.",
      perfil: "Ejecuta trabajos de albañilería, encofrado y acabados siguiendo planos y normas de seguridad.",
      campoLaboral: ["Obras municipales y privadas", "Operario o maestro de obra", "Contratista independiente", "Empresas constructoras de la región"],
      certificacion: "Certificado por cada módulo aprobado.", duracion: "", horario: "Turno tarde", modulos: []
    },
    {
      nombre: "Mecánica de Motos",
      resumen: "Repara y da mantenimiento a motos y mototaxis.",
      descripcion: "Formación en diagnóstico, mantenimiento preventivo y correctivo de motocicletas y mototaxis: motor, sistema eléctrico, frenos y transmisión.",
      perfil: "Diagnostica fallas y realiza el mantenimiento y la reparación de motocicletas y mototaxis.",
      campoLaboral: ["Talleres de mecánica", "Taller propio", "Venta de repuestos y accesorios", "Mantenimiento de flotas de mototaxis"],
      certificacion: "Certificado por cada módulo aprobado.", duracion: "", horario: "Turno tarde", modulos: []
    },
    {
      nombre: "Cosmetología",
      resumen: "Aprende el oficio de la belleza y emprende tu propio salón.",
      descripcion: "Formación en corte, peinado, tratamientos capilares, maquillaje y cuidado de manos y pies, con atención al cliente y gestión de un salón.",
      perfil: "Brinda servicios de corte, peinado, coloración, maquillaje y cuidado personal con higiene y buena atención.",
      campoLaboral: ["Salones de belleza y barberías", "Salón propio", "Servicio a domicilio para eventos", "Centros de estética"],
      certificacion: "Certificado por cada módulo aprobado.", duracion: "", horario: "Turno tarde", modulos: []
    },
    {
      nombre: "Confección Textil",
      resumen: "Diseña y confecciona prendas con máquinas industriales.",
      descripcion: "Formación en trazo, corte y confección de prendas de vestir, uso y mantenimiento de máquinas industriales y acabados.",
      perfil: "Traza, corta y confecciona prendas de vestir con acabados de calidad usando máquinas industriales.",
      campoLaboral: ["Talleres de confección", "Taller propio de costura y arreglos", "Uniformes escolares y prendas típicas", "Empresas textiles"],
      certificacion: "Certificado por cada módulo aprobado.", duracion: "", horario: "Turno tarde", modulos: []
    }
  ],

  // ---------- Pagos ----------
  // monto: escriba el número (ej. 50) o déjelo vacío "" para mostrar "Consultar".
  tarifas: [
    { concepto: "Matrícula (por módulo)", monto: 30 },
    { concepto: "Constancia de estudios", monto: 10 },
    { concepto: "Certificado de estudios (por módulo)", monto: 40 }
  ],
  yape: { numero: "983 319 569", titular: "Víctor Raúl Huamán Aguilar", qr: "" },   // qr: ej. "assets/img/qr-yape.png"
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

  // Respaldo de publicaciones (las actividades se publican desde el panel)
  noticias: [
    {
      fecha: "2026-10-25", categoria: "Comunicado",
      titulo: "Matrícula 2027-I en línea",
      texto: "Ya puede matricularse desde su celular en cualquiera de nuestras cinco especialidades, en el turno tarde. Elija sus módulos, pague S/ 30 por módulo por Yape y adjunte la captura en el formulario."
    }
  ]
};
