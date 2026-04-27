// ========================
// EDINBURG LAWYER — RGV IMMIGRATION HUB
// Bilingual EN/ES
// ========================

// ---- LANGUAGE SYSTEM ----
let currentLang = 'es';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
  });
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
  document.documentElement.lang = lang;
  // Re-render dynamic content
  renderDocs();
  renderGuides();
  renderRights();
  renderFilters();
  renderLawyers(currentCity);
}

// ---- DOCUMENT GUIDE DATA ----
const documents = [
  {
    name: { en: 'Notice to Appear (NTA)', es: 'Aviso de Comparecencia (NTA)' },
    form: 'Form I-862',
    severity: 'critical',
    what: {
      en: 'This is a charging document that starts removal (deportation) proceedings against you in immigration court.',
      es: 'Es un documento de cargos que inicia procedimientos de deportación en tu contra en la corte de inmigración.'
    },
    do: {
      en: 'Contact an immigration attorney IMMEDIATELY. Check your hearing date — missing it can result in automatic deportation.',
      es: 'Contacta a un abogado de inmigración DE INMEDIATO. Verifica la fecha de tu audiencia — faltar puede resultar en deportación automática.'
    }
  },
  {
    name: { en: 'Order of Removal / Deportation Order', es: 'Orden de Deportación' },
    form: 'Form I-296 / I-205',
    severity: 'critical',
    what: {
      en: 'A final order from an immigration judge ordering you to leave the United States.',
      es: 'Una orden final de un juez de inmigración ordenándote salir de los Estados Unidos.'
    },
    do: {
      en: 'You may have the right to appeal. Contact a lawyer immediately — you may have only 30 days to appeal.',
      es: 'Puede que tengas derecho a apelar. Contacta a un abogado de inmediato — puede que solo tengas 30 días para apelar.'
    }
  },
  {
    name: { en: 'Voluntary Departure', es: 'Salida Voluntaria' },
    form: 'Form I-210',
    severity: 'warning',
    what: {
      en: 'Permission to leave the US voluntarily instead of being formally deported. Leaving voluntarily avoids a formal deportation record.',
      es: 'Permiso para salir de EE.UU. voluntariamente en lugar de ser deportado formalmente. Salir voluntariamente evita un registro formal de deportación.'
    },
    do: {
      en: 'You must leave by the deadline on the order. Consult a lawyer — voluntary departure may or may not be the best option for your case.',
      es: 'Debes salir antes de la fecha límite en la orden. Consulta a un abogado — la salida voluntaria puede o no ser la mejor opción para tu caso.'
    }
  },
  {
    name: { en: 'I-94 Arrival/Departure Record', es: 'Registro de Llegada/Salida I-94' },
    form: 'Form I-94',
    severity: 'info',
    what: {
      en: 'Records the date you entered the US and how long you are authorized to stay. Check yours at i94.cbp.dhs.gov.',
      es: 'Registra la fecha en que entraste a EE.UU. y cuánto tiempo estás autorizado a quedarte. Verifica el tuyo en i94.cbp.dhs.gov.'
    },
    do: {
      en: 'Do NOT overstay your authorized period — it can result in bars from re-entry ranging from 3 to 10 years.',
      es: 'NO te quedes más tiempo del autorizado — puede resultar en prohibiciones de reingreso de 3 a 10 años.'
    }
  },
  {
    name: { en: 'Work Permit / Employment Authorization', es: 'Permiso de Trabajo / Autorización de Empleo' },
    form: 'Form I-766 (EAD)',
    severity: 'info',
    what: {
      en: 'An Employment Authorization Document (EAD) allows you to legally work in the United States.',
      es: 'Un Documento de Autorización de Empleo (EAD) te permite trabajar legalmente en los Estados Unidos.'
    },
    do: {
      en: 'Apply for renewal 6 months before expiration. Working without authorization is a serious immigration violation.',
      es: 'Solicita la renovación 6 meses antes del vencimiento. Trabajar sin autorización es una violación migratoria grave.'
    }
  },
  {
    name: { en: 'Green Card (Permanent Residence)', es: 'Tarjeta Verde (Residencia Permanente)' },
    form: 'Form I-551',
    severity: 'info',
    what: {
      en: 'Proof of lawful permanent residence in the United States. Must be renewed every 10 years.',
      es: 'Prueba de residencia permanente legal en los Estados Unidos. Debe renovarse cada 10 años.'
    },
    do: {
      en: 'Renew at least 6 months before expiration using Form I-90. Carry it with you at all times.',
      es: 'Renueva al menos 6 meses antes del vencimiento usando el Formulario I-90. Llévala contigo en todo momento.'
    }
  },
  {
    name: { en: 'Notice of Immigration Hearing', es: 'Aviso de Audiencia de Inmigración' },
    form: 'EOIR-33 / Hearing Notice',
    severity: 'critical',
    what: {
      en: 'Notifies you of a scheduled hearing date before an immigration judge. This is mandatory.',
      es: 'Te notifica de una fecha de audiencia programada ante un juez de inmigración. Es obligatoria.'
    },
    do: {
      en: 'NEVER miss your hearing. If you cannot attend, contact your attorney immediately to request a continuance.',
      es: 'NUNCA faltes a tu audiencia. Si no puedes asistir, contacta a tu abogado de inmediato para solicitar una prórroga.'
    }
  },
  {
    name: { en: 'Asylum Application', es: 'Solicitud de Asilo' },
    form: 'Form I-589',
    severity: 'warning',
    what: {
      en: 'A request for protection if you have been persecuted or fear persecution due to race, religion, nationality, political opinion, or social group.',
      es: 'Una solicitud de protección si has sido perseguido o temes persecución por raza, religión, nacionalidad, opinión política o grupo social.'
    },
    do: {
      en: 'Must be filed within 1 year of arriving in the US. An attorney is strongly recommended — asylum cases are complex.',
      es: 'Debe presentarse dentro de 1 año de llegar a EE.UU. Se recomienda encarecidamente un abogado — los casos de asilo son complejos.'
    }
  }
];

// ---- GUIDES DATA ----
const guides = [
  {
    title: { en: 'Voluntary Departure — Step by Step', es: 'Salida Voluntaria — Paso a Paso' },
    icon: '✈️',
    steps: {
      en: ['Request voluntary departure from the immigration judge or ICE officer', 'You will receive a specific deadline to leave (usually 60-120 days)', 'Purchase your travel documents and make arrangements', 'Leave the US before the deadline — get proof of departure', 'Voluntary departure avoids a formal removal order on your record', 'Consult an attorney — voluntary departure may affect future visa eligibility'],
      es: ['Solicita la salida voluntaria al juez de inmigración o al oficial de ICE', 'Recibirás una fecha límite específica para salir (generalmente 60-120 días)', 'Compra tus documentos de viaje y haz arreglos', 'Sal de EE.UU. antes de la fecha límite — obtén prueba de salida', 'La salida voluntaria evita una orden formal de deportación en tu expediente', 'Consulta a un abogado — la salida voluntaria puede afectar la elegibilidad futura para visa']
    }
  },
  {
    title: { en: 'What to Do If ICE Comes to Your Door', es: 'Qué Hacer Si ICE Llega a Tu Puerta' },
    icon: '🚪',
    steps: {
      en: ['Do NOT open the door — ask them to slide their warrant under the door', 'If they have a judicial warrant signed by a judge, they can enter', 'An administrative warrant (I-200 or I-205) does NOT give them the right to enter your home', 'You have the right to remain silent — say "I am exercising my right to remain silent"', 'You have the right to speak to a lawyer before answering questions', 'Do not sign any documents without speaking to an attorney first'],
      es: ['NO abras la puerta — pídeles que deslicen la orden bajo la puerta', 'Si tienen una orden judicial firmada por un juez, pueden entrar', 'Una orden administrativa (I-200 o I-205) NO les da derecho a entrar a tu hogar', 'Tienes derecho a guardar silencio — di "Estoy ejerciendo mi derecho a guardar silencio"', 'Tienes derecho a hablar con un abogado antes de responder preguntas', 'No firmes ningún documento sin hablar primero con un abogado']
    }
  },
  {
    title: { en: 'How to Apply for Asylum', es: 'Cómo Solicitar Asilo' },
    icon: '🛡️',
    steps: {
      en: ['File Form I-589 within 1 year of arriving in the United States', 'Gather evidence of persecution: police reports, medical records, witness statements', 'Submit your application to USCIS or present your case in immigration court', 'Attend your asylum interview or court hearing', 'If approved, you can apply for a Green Card after 1 year', 'An attorney significantly increases your chances of approval'],
      es: ['Presenta el Formulario I-589 dentro de 1 año de llegar a los Estados Unidos', 'Reúne evidencia de persecución: informes policiales, registros médicos, declaraciones de testigos', 'Envía tu solicitud a USCIS o presenta tu caso en la corte de inmigración', 'Asiste a tu entrevista de asilo o audiencia en la corte', 'Si es aprobado, puedes solicitar una Tarjeta Verde después de 1 año', 'Un abogado aumenta significativamente tus posibilidades de aprobación']
    }
  },
  {
    title: { en: 'DACA — What You Need to Know', es: 'DACA — Lo Que Necesitas Saber' },
    icon: '📄',
    steps: {
      en: ['DACA (Deferred Action for Childhood Arrivals) protects eligible individuals from deportation', 'Must have arrived in the US before age 16 and before June 15, 2007', 'Must have continuous residence since June 15, 2007', 'File Form I-821D and I-765 to apply or renew', 'DACA must be renewed every 2 years — do not let it expire', 'Consult an attorney as DACA policies may change'],
      es: ['DACA (Acción Diferida para los Llegados en la Infancia) protege a personas elegibles de la deportación', 'Debes haber llegado a EE.UU. antes de los 16 años y antes del 15 de junio de 2007', 'Debes tener residencia continua desde el 15 de junio de 2007', 'Presenta el Formulario I-821D e I-765 para solicitar o renovar', 'DACA debe renovarse cada 2 años — no dejes que expire', 'Consulta a un abogado ya que las políticas de DACA pueden cambiar']
    }
  }
];

// ---- RIGHTS DATA ----
const rights = [
  {
    title: { en: 'Right to Remain Silent', es: 'Derecho a Guardar Silencio' },
    icon: '🤐',
    desc: {
      en: 'You do not have to answer questions from immigration officers or police. Say: "I am exercising my right to remain silent."',
      es: 'No tienes que responder preguntas de oficiales de inmigración o policía. Di: "Estoy ejerciendo mi derecho a guardar silencio."'
    }
  },
  {
    title: { en: 'Right to an Attorney', es: 'Derecho a un Abogado' },
    icon: '⚖️',
    desc: {
      en: 'You have the right to be represented by an attorney in immigration court. Unlike criminal court, the government does not have to provide one — but you can hire your own or seek free legal aid.',
      es: 'Tienes derecho a ser representado por un abogado en la corte de inmigración. A diferencia del tribunal penal, el gobierno no tiene que proporcionarte uno, pero puedes contratar el tuyo o buscar ayuda legal gratuita.'
    }
  },
  {
    title: { en: 'Right to a Hearing', es: 'Derecho a una Audiencia' },
    icon: '🏛️',
    desc: {
      en: 'You have the right to a hearing before an immigration judge before being ordered removed. Do not sign anything waiving this right without speaking to a lawyer.',
      es: 'Tienes derecho a una audiencia ante un juez de inmigración antes de ser ordenado a salir. No firmes nada que renuncie a este derecho sin hablar con un abogado.'
    }
  },
  {
    title: { en: 'Right Against Illegal Search', es: 'Derecho Contra Registros Ilegales' },
    icon: '🚫',
    desc: {
      en: 'Officers cannot enter your home without a judicial warrant signed by a judge. An administrative ICE warrant does NOT authorize home entry.',
      es: 'Los oficiales no pueden entrar a tu hogar sin una orden judicial firmada por un juez. Una orden administrativa de ICE NO autoriza la entrada al hogar.'
    }
  },
  {
    title: { en: 'Right to Contact Your Consulate', es: 'Derecho a Contactar tu Consulado' },
    icon: '🌍',
    desc: {
      en: 'If detained, you have the right to contact your country\'s consulate. Mexican nationals: contact the Mexican Consulate in McAllen at (956) 686-0243.',
      es: 'Si eres detenido, tienes derecho a contactar el consulado de tu país. Ciudadanos mexicanos: contacta el Consulado Mexicano en McAllen al (956) 686-0243.'
    }
  },
  {
    title: { en: 'Do NOT Sign Without a Lawyer', es: 'NO Firmes Sin un Abogado' },
    icon: '✍️',
    desc: {
      en: 'Never sign any immigration document — especially a "voluntary departure" or "stipulated removal" — without first speaking to an attorney. Signing may waive important rights.',
      es: 'Nunca firmes ningún documento de inmigración — especialmente una "salida voluntaria" o "remoción estipulada" — sin hablar primero con un abogado. Firmar puede renunciar a derechos importantes.'
    }
  }
];

// ---- LAWYERS DATA ----
const lawyers = [
  { name: 'Richard R. Alamia', city: 'Edinburg', phone: '(956) 381-5766', address: '206 W. Stubbs, Edinburg TX 78539', specialty: 'Immigration, Criminal, Family', free_consult: true, years: 49 },
  { name: 'Dora Alicia Garza', city: 'Edinburg', phone: '(956) 329-1304', address: '720 N 12th Ave, Edinburg TX 78541', specialty: 'Immigration, Family, Criminal', free_consult: false, years: 15 },
  { name: 'De La Garza & Ramirez', city: 'Edinburg', phone: '(956) 825-2030', address: '4943 S Jackson Rd, Edinburg TX 78539', specialty: 'Immigration, Criminal, Business', free_consult: true, years: 20 },
  { name: 'J. Francisco Tinoco', city: 'McAllen', phone: '(956) 683-8300', address: '200 S 10th St Ste 802, McAllen TX 78501', specialty: 'Immigration, Business, Criminal', free_consult: true, years: 25 },
  { name: 'Miriam A. Ayala', city: 'McAllen', phone: '(956) 627-4051', address: '721 E. Esperanza Ave, McAllen TX 78501', specialty: 'Immigration (Complex Cases)', free_consult: false, years: 14 },
  { name: 'HKC Law Firm', city: 'McAllen', phone: '(956) 452-2222', address: 'McAllen, TX 78504', specialty: 'Immigration, Family', free_consult: true, years: 10 },
  { name: 'Law Office of Christian Y. Álvarez', city: 'McAllen', phone: '(956) 587-0708', address: '5400 N Ware Rd Ste 40, McAllen TX 78504', specialty: 'Immigration Nationwide', free_consult: false, years: 12 },
  { name: 'Alonso & Alonso Law Firm', city: 'McAllen', phone: '1-855-688-7756', address: '1005 W Nolana Ave, McAllen TX 78504', specialty: 'Immigration, Family', free_consult: true, years: 15 },
  { name: 'R. Ramirez Attorneys', city: 'Edinburg', phone: '(956) 383-9000', address: '106 S 12th Ave, Edinburg TX 78539', specialty: 'Immigration, Criminal, Family', free_consult: true, years: 18 },
  { name: 'Texas Rio Grande Legal Aid', city: 'Edinburg', phone: '(956) 393-6200', address: '316 S Closner Blvd, Edinburg TX 78539', specialty: 'Free Legal Aid — All Immigration', free_consult: true, years: 30, free_service: true },
];

const cities = ['All', 'Edinburg', 'McAllen', 'Mission', 'Pharr'];
let currentCity = 'All';

function renderDocs() {
  const lang = currentLang;
  const grid = document.getElementById('docs-grid');
  grid.innerHTML = documents.map(doc => `
    <div class="doc-card severity-${doc.severity}">
      <div class="doc-header">
        <div class="doc-severity-badge severity-badge-${doc.severity}">
          ${doc.severity === 'critical' ? (lang === 'es' ? 'URGENTE' : 'URGENT') : doc.severity === 'warning' ? (lang === 'es' ? 'IMPORTANTE' : 'IMPORTANT') : 'INFO'}
        </div>
        <div class="doc-form">${doc.form}</div>
      </div>
      <h3 class="doc-name">${doc.name[lang]}</h3>
      <div class="doc-section">
        <div class="doc-label">${lang === 'es' ? '¿Qué es?' : 'What is it?'}</div>
        <p>${doc.what[lang]}</p>
      </div>
      <div class="doc-section doc-action">
        <div class="doc-label">${lang === 'es' ? '¿Qué hacer?' : 'What to do?'}</div>
        <p>${doc.do[lang]}</p>
      </div>
    </div>
  `).join('');
}

function renderGuides() {
  const lang = currentLang;
  const grid = document.getElementById('guides-grid');
  grid.innerHTML = guides.map(g => `
    <div class="guide-card">
      <div class="guide-icon">${g.icon}</div>
      <h3>${g.title[lang]}</h3>
      <ol class="guide-steps">
        ${g.steps[lang].map(step => `<li>${step}</li>`).join('')}
      </ol>
    </div>
  `).join('');
}

function renderRights() {
  const lang = currentLang;
  const grid = document.getElementById('rights-grid');
  grid.innerHTML = rights.map(r => `
    <div class="right-card">
      <div class="right-icon">${r.icon}</div>
      <h3>${r.title[lang]}</h3>
      <p>${r.desc[lang]}</p>
    </div>
  `).join('');
}

function renderLawyers(city = 'All') {
  const lang = currentLang;
  currentCity = city;
  document.querySelectorAll('.city-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.city === city);
  });

  const filtered = city === 'All' ? lawyers : lawyers.filter(l => l.city === city);
  const grid = document.getElementById('lawyers-grid');
  grid.innerHTML = filtered.map(l => `
    <div class="lawyer-card ${l.free_service ? 'lawyer-free-service' : ''}">
      ${l.free_service ? `<div class="free-service-badge">${lang === 'es' ? 'SERVICIO GRATUITO' : 'FREE SERVICE'}</div>` : ''}
      <div class="lawyer-header">
        <div class="lawyer-avatar">${l.name.charAt(0)}</div>
        <div>
          <div class="lawyer-name">${l.name}</div>
          <div class="lawyer-city">${l.city}, TX · ${l.years} ${lang === 'es' ? 'años exp.' : 'yrs exp.'}</div>
        </div>
      </div>
      <div class="lawyer-specialty">${l.specialty}</div>
      <div class="lawyer-address">📍 ${l.address}</div>
      ${l.free_consult ? `<div class="free-consult-badge">${lang === 'es' ? '✓ Consulta Gratuita' : '✓ Free Consultation'}</div>` : ''}
      <a href="tel:${l.phone.replace(/\D/g,'')}" class="btn btn-primary lawyer-call">
        📞 ${l.phone}
      </a>
    </div>
  `).join('');
}

function renderFilters() {
  const el = document.getElementById('lawyer-filters');
  el.innerHTML = cities.map(city => `
    <button class="city-filter-btn ${city === currentCity ? 'active' : ''}" data-city="${city}" onclick="renderLawyers('${city}')">
      ${city === 'All' ? (currentLang === 'es' ? 'Todo RGV' : 'All RGV') : city}
    </button>
  `).join('');
}

// ---- WEATHER ----
async function loadWeather() {
  try {
    // Use Open-Meteo free API — no key needed, works on live sites
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=26.3017&longitude=-98.1633&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&temperature_unit=fahrenheit&windspeed_unit=mph');
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const wind = Math.round(data.current.windspeed_10m);
    const humidity = data.current.relativehumidity_2m;
    const code = data.current.weathercode;

    const weatherDesc = {
      en: getWeatherDesc(code, 'en'),
      es: getWeatherDesc(code, 'es')
    };

    document.getElementById('weather-temp').textContent = `${temp}°F`;
    document.getElementById('weather-desc').textContent = weatherDesc[currentLang];
    document.getElementById('weather-sub').textContent = currentLang === 'es'
      ? `Viento: ${wind} mph · Humedad: ${humidity}%`
      : `Wind: ${wind} mph · Humidity: ${humidity}%`;

    // Update on lang change
    window._weatherData = { temp, wind, humidity, code, weatherDesc };

  } catch(e) {
    document.getElementById('weather-temp').textContent = '—°F';
    document.getElementById('weather-desc').textContent = currentLang === 'es' ? 'No disponible' : 'Unavailable';
  }
}

function getWeatherDesc(code, lang) {
  const desc = {
    en: { 0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast', 45:'Foggy', 48:'Icy fog', 51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle', 61:'Light rain', 63:'Rain', 65:'Heavy rain', 71:'Light snow', 73:'Snow', 75:'Heavy snow', 80:'Light showers', 81:'Showers', 82:'Heavy showers', 95:'Thunderstorm', 96:'Thunderstorm w/ hail', 99:'Severe thunderstorm' },
    es: { 0:'Cielo despejado', 1:'Mayormente despejado', 2:'Parcialmente nublado', 3:'Nublado', 45:'Neblina', 48:'Niebla helada', 51:'Llovizna ligera', 53:'Llovizna', 55:'Llovizna intensa', 61:'Lluvia ligera', 63:'Lluvia', 65:'Lluvia intensa', 71:'Nieve ligera', 73:'Nieve', 75:'Nieve intensa', 80:'Chubascos ligeros', 81:'Chubascos', 82:'Chubascos fuertes', 95:'Tormenta eléctrica', 96:'Tormenta con granizo', 99:'Tormenta severa' }
  };
  return desc[lang][code] || (lang === 'es' ? 'Condiciones variables' : 'Variable conditions');
}

// ---- INIT ----
// Set language first so all render functions use correct lang immediately
currentLang = 'es';
renderDocs();
renderGuides();
renderRights();
renderFilters();
renderLawyers('All');
loadWeather();
// Now apply to all static data-en/data-es elements in HTML
document.querySelectorAll('[data-en]').forEach(el => {
  el.innerHTML = el.getAttribute('data-es') || el.getAttribute('data-en');
});
document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
document.querySelector('.lang-btn[onclick="setLang(\'es\')"]').classList.add('active');
document.documentElement.lang = 'es';
