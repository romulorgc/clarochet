// Gera o site público do Clarochet (GitHub Pages): início, privacidade, termos e suporte, em 3 línguas.
// Uso: node build.mjs  → escreve index.html e */index.html nesta pasta.
import { mkdirSync, writeFileSync } from 'node:fs';

const EMAIL = 'romulorgc@gmail.com';
const UPDATED = { pt: '28 de setembro de 2026', en: 'September 28, 2026', es: '28 de septiembre de 2026' };

const css = `
:root{--bg:#FAF9F7;--surface:#fff;--ink:#1F2A30;--soft:#5C696F;--line:#EAE7E0;--primary:#9C5208;--primarySoft:#FDE9D2}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 Poppins,system-ui,-apple-system,Segoe UI,sans-serif}
main{max-width:760px;margin:0 auto;padding:32px 20px 64px}
h1,h2{font-family:Poppins,system-ui,sans-serif;font-weight:700;line-height:1.2;letter-spacing:-.02em}
h1{font-size:40px;margin:.2em 0 .4em}h2{font-size:24px;margin:1.6em 0 .4em}
a{color:var(--primary)}p,li{color:var(--ink)}.soft{color:var(--soft)}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;text-decoration:none;color:var(--ink);font-size:20px}
.brand img{width:40px;height:40px;border-radius:10px}
nav.lang a{margin-left:10px;font-weight:700;text-decoration:none;padding:4px 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font-size:15px}
nav.lang a.on{background:var(--ink);color:var(--surface);border-color:var(--ink)}
.card{background:var(--surface);border-radius:22px;padding:22px 24px;box-shadow:0 6px 18px rgba(90,58,40,.08);margin:16px 0}
.hero{text-align:center}.hero p{font-size:20px}
.btn{display:inline-block;background:var(--primary);color:#fff;text-decoration:none;font-weight:800;padding:14px 22px;border-radius:16px}
footer{margin-top:40px;font-size:15px;color:var(--soft)}footer a{margin-right:14px}
[data-lang]{display:none}[data-lang].show{display:block}
`;

const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">';

const script = `<script>
(function(){var q=new URLSearchParams(location.search).get('lang');var n=(navigator.language||'en').slice(0,2);
var l=q||(n==='pt'?'pt':n==='es'?'es':'en');document.querySelectorAll('[data-lang="'+l+'"]').forEach(function(e){e.classList.add('show')});
document.querySelectorAll('nav.lang a').forEach(function(a){if(a.dataset.l===l)a.classList.add('on')});document.documentElement.lang=l==='pt'?'pt-BR':l;})();
</script>`;

function page({ title, depth, body }) {
  const up = depth ? '../' : './';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="Clarochet explains your crochet pattern row by row, in plain words.">
<link rel="icon" href="${up}icon-180.png">${fonts}<style>${css}</style></head>
<body><main>
<header><a class="brand" href="${up}"><img src="${up}icon-180.png" alt="">Clarochet</a>
<nav class="lang"><a data-l="pt" href="?lang=pt">PT</a><a data-l="en" href="?lang=en">EN</a><a data-l="es" href="?lang=es">ES</a></nav></header>
${body}
<footer><a href="${up}privacy/">Privacy · Privacidade</a><a href="${up}terms/">Terms · Termos</a><a href="${up}support/">Support · Suporte</a><br>© 2026 Rômulo Carvalho</footer>
</main>${script}</body></html>`;
}

const L = (lang, html) => `<section data-lang="${lang}">${html}</section>`;

// ---------- início ----------
const home = [
  L('pt', `<div class="hero"><h1>Travou na receita de crochê?</h1><p class="soft">Mande a foto, o PDF ou o texto. O Clarochet explica carreira por carreira, em palavras simples, confere a conta dos pontos e lembra onde você parou.</p><p><a class="btn" href="#">Em breve na App Store</a></p></div>
<div class="card"><h2>O que ele faz</h2><ul><li>Explica cada carreira em passos simples, com as repetições.</li><li>Confere a conta dos pontos e avisa quando não bate.</li><li>Receitas em inglês, espanhol ou português, com nomes americanos e britânicos.</li><li>Contador de pontos, glossário e progresso salvo.</li><li>Fotos e PDFs lidos no seu iPhone. A IA só entra quando você pede.</li></ul></div>`),
  L('en', `<div class="hero"><h1>Stuck on a crochet pattern?</h1><p class="soft">Send a photo, PDF or the text. Clarochet explains it row by row in plain words, checks your stitch counts and remembers where you stopped.</p><p><a class="btn" href="#">Coming soon to the App Store</a></p></div>
<div class="card"><h2>What it does</h2><ul><li>Explains every row in simple steps, repeats included.</li><li>Checks the stitch count and tells you when it doesn't add up.</li><li>Patterns in English, Spanish or Portuguese, US and UK terms.</li><li>Stitch counter, glossary and saved progress.</li><li>Photos and PDFs are read on your iPhone. AI is only used when you ask.</li></ul></div>`),
  L('es', `<div class="hero"><h1>¿Te atascaste con el patrón de crochet?</h1><p class="soft">Envía la foto, el PDF o el texto. Clarochet lo explica vuelta por vuelta con palabras sencillas, revisa la cuenta de puntos y recuerda dónde te quedaste.</p><p><a class="btn" href="#">Muy pronto en el App Store</a></p></div>
<div class="card"><h2>Qué hace</h2><ul><li>Explica cada vuelta en pasos sencillos, con las repeticiones.</li><li>Revisa la cuenta de puntos y avisa cuando no cuadra.</li><li>Patrones en inglés, español o portugués, con nombres americanos y británicos.</li><li>Contador de puntos, glosario y progreso guardado.</li><li>Las fotos y los PDF se leen en tu iPhone. La IA solo entra cuando la pides.</li></ul></div>`),
].join('\n');

// ---------- privacidade ----------
const privacy = [
  L('pt', `<h1>Política de privacidade</h1><p class="soft">Atualizada em ${UPDATED.pt}. Responsável: Rômulo Carvalho (pessoa física), <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
<div class="card"><h2>O que fica só no seu iPhone</h2><p>O texto das suas receitas, as fotos, os PDFs, o progresso, o contador e as respostas que você recebeu. As fotos e os PDFs são lidos no próprio aparelho (Apple Vision e PDFKit) e <strong>não são enviados</strong> a lugar nenhum.</p></div>
<div class="card"><h2>O que vai para o nosso servidor</h2><ul>
<li><strong>Um identificador anônimo</strong> criado pelo app na primeira vez (um número aleatório, guardado no chaveiro do iPhone), usado para contar suas receitas. Não pedimos nome, e-mail, telefone ou localização.</li>
<li><strong>Contadores</strong>: quantas receitas você enviou (sem o conteúdo) e quantos pedidos à IA fez por dia.</li>
<li><strong>Compras</strong>: quando você compra, o app envia o comprovante assinado pela Apple (número da transação, produto e validade) para creditarmos suas receitas. Não recebemos dados do seu cartão.</li>
<li><strong>Endereço IP</strong>, transformado em código (hash) e usado só para limitar abusos por dia.</li></ul></div>
<div class="card"><h2>Quando você usa a IA</h2><p>Só quando você toca em “Explicar com IA” ou “Tenho uma dúvida”. Enviamos o texto daquela carreira (e o da anterior, para contexto) e a sua pergunta ao serviço de IA (OpenRouter, que encaminha ao modelo Gemini, do Google), pedindo apenas provedores que não guardam nem usam o texto para treinamento. Nós não guardamos esse texto nem a resposta.</p></div>
<div class="card"><h2>O que não fazemos</h2><p>Não temos anúncios, não rastreamos você entre apps e sites, não vendemos dados e não usamos ferramentas de análise de terceiros.</p></div>
<div class="card"><h2>Apagar seus dados</h2><p>Em Ajustes &gt; “Apagar todos os meus dados”, o app apaga as receitas e o progresso do iPhone. Para apagar também os contadores anônimos do servidor, escreva para <a href="mailto:${EMAIL}">${EMAIL}</a>. Compras continuam registradas na sua conta Apple.</p></div>
<div class="card"><h2>Crianças</h2><p>O app não é dirigido a menores de 13 anos e não coleta dados de identificação de ninguém.</p></div>`),
  L('en', `<h1>Privacy Policy</h1><p class="soft">Updated ${UPDATED.en}. Controller: Rômulo Carvalho (individual), <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
<div class="card"><h2>What stays on your iPhone</h2><p>Your pattern text, photos, PDFs, progress, counter and the answers you received. Photos and PDFs are read on the device (Apple Vision and PDFKit) and are <strong>never uploaded</strong>.</p></div>
<div class="card"><h2>What reaches our server</h2><ul>
<li><strong>An anonymous identifier</strong> created by the app on first use (a random number stored in your iPhone keychain), used to count your patterns. We never ask for your name, email, phone or location.</li>
<li><strong>Usage counters</strong>: how many patterns you sent (not their content) and how many AI requests you made per day.</li>
<li><strong>Purchases</strong>: when you buy, the app sends Apple's signed receipt (transaction number, product and expiry) so we can credit your patterns. We never receive your card details.</li>
<li><strong>IP address</strong>, converted to a hash and used only for daily abuse limits.</li></ul></div>
<div class="card"><h2>When you use AI</h2><p>Only when you tap “Explain with AI” or “I have a question”. We send the text of that row (and the previous one, for context) and your question to the AI service (OpenRouter, which forwards it to Google's Gemini model), requesting only providers that do not store or train on it. We do not keep that text or the answer.</p></div>
<div class="card"><h2>What we don't do</h2><p>No ads, no tracking across apps and websites, no selling of data, no third-party analytics.</p></div>
<div class="card"><h2>Deleting your data</h2><p>Settings &gt; “Delete all my data” removes your patterns and progress from the iPhone. To also delete the anonymous counters on our server, email <a href="mailto:${EMAIL}">${EMAIL}</a>. Purchases remain recorded in your Apple account.</p></div>
<div class="card"><h2>Children</h2><p>The app is not directed to children under 13 and does not collect identifying data from anyone.</p></div>`),
  L('es', `<h1>Política de privacidad</h1><p class="soft">Actualizada el ${UPDATED.es}. Responsable: Rômulo Carvalho (persona física), <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
<div class="card"><h2>Lo que se queda en tu iPhone</h2><p>El texto de tus patrones, las fotos, los PDF, el progreso, el contador y las respuestas recibidas. Las fotos y los PDF se leen en el propio dispositivo (Apple Vision y PDFKit) y <strong>nunca se envían</strong>.</p></div>
<div class="card"><h2>Lo que llega a nuestro servidor</h2><ul>
<li><strong>Un identificador anónimo</strong> creado por la app la primera vez (un número aleatorio guardado en el llavero del iPhone), para contar tus patrones. No pedimos nombre, correo, teléfono ni ubicación.</li>
<li><strong>Contadores</strong>: cuántos patrones enviaste (sin el contenido) y cuántas solicitudes a la IA hiciste por día.</li>
<li><strong>Compras</strong>: al comprar, la app envía el comprobante firmado por Apple (número de transacción, producto y vencimiento) para acreditar tus patrones. Nunca recibimos datos de tu tarjeta.</li>
<li><strong>Dirección IP</strong>, convertida en un código (hash) y usada solo para limitar abusos por día.</li></ul></div>
<div class="card"><h2>Cuando usas la IA</h2><p>Solo cuando tocas “Explicar con IA” o “Tengo una duda”. Enviamos el texto de esa vuelta (y el de la anterior, como contexto) y tu pregunta al servicio de IA (OpenRouter, que lo envía al modelo Gemini de Google), pidiendo solo proveedores que no lo guardan ni lo usan para entrenar. Nosotros no guardamos ese texto ni la respuesta.</p></div>
<div class="card"><h2>Lo que no hacemos</h2><p>Sin anuncios, sin rastreo entre apps y sitios, sin venta de datos, sin herramientas de análisis de terceros.</p></div>
<div class="card"><h2>Borrar tus datos</h2><p>En Ajustes &gt; “Borrar todos mis datos” la app borra tus patrones y tu progreso del iPhone. Para borrar también los contadores anónimos del servidor, escribe a <a href="mailto:${EMAIL}">${EMAIL}</a>. Las compras siguen registradas en tu cuenta de Apple.</p></div>
<div class="card"><h2>Menores</h2><p>La app no está dirigida a menores de 13 años y no recoge datos de identificación de nadie.</p></div>`),
].join('\n');

// ---------- termos ----------
const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
const terms = [
  L('pt', `<h1>Termos de uso</h1><p class="soft">Atualizados em ${UPDATED.pt}.</p>
<div class="card"><p>O uso do Clarochet segue o <a href="${EULA}">Contrato de Licença de Usuário Final padrão da Apple (EULA)</a>, com as regras abaixo.</p></div>
<div class="card"><h2>Receitas</h2><ul><li>Cada receita que você manda para explicação conta 1, inteira ou só um trecho. Dentro dela, as explicações, as dúvidas e o contador são livres, com limite razoável de pedidos à IA por receita e por dia para evitar abuso.</li><li>Suas 5 primeiras receitas são grátis.</li><li>Plano Mensal: até 100 receitas por mês, renovação automática pela App Store até você cancelar (pelo menos 24 horas antes do fim do período, em Ajustes &gt; seu nome &gt; Assinaturas).</li><li>Pacote de 30: 30 receitas, sem prazo para usar.</li><li>Pagamentos, cancelamentos e reembolsos são feitos pela Apple.</li></ul></div>
<div class="card"><h2>Confira sempre com a receita</h2><p>As explicações são geradas por regras de crochê e, quando você pede, por IA. Elas podem errar, principalmente se a foto estiver ruim ou a receita for ambígua. O original fica sempre visível ao lado. Confira antes de desmanchar trabalho.</p></div>
<div class="card"><h2>Suas receitas</h2><p>Importe só receitas suas, compradas, escritas por você ou que você tenha permissão para usar. O Clarochet é para uso pessoal e não publica nem compartilha receitas.</p></div>`),
  L('en', `<h1>Terms of Use</h1><p class="soft">Updated ${UPDATED.en}.</p>
<div class="card"><p>Your use of Clarochet is governed by Apple's <a href="${EULA}">standard Licensed Application End User License Agreement (EULA)</a>, plus the rules below.</p></div>
<div class="card"><h2>Patterns</h2><ul><li>Each pattern you send for explanation counts as 1, whole or just a section. Inside it, explanations, questions and the counter are free, within a reasonable limit of AI requests per pattern and per day to prevent abuse.</li><li>Your first 5 patterns are free.</li><li>Monthly plan: up to 100 patterns a month, renewing automatically through the App Store until you cancel (at least 24 hours before the end of the period, in Settings &gt; your name &gt; Subscriptions).</li><li>Pack of 30: 30 patterns with no expiry.</li><li>Payments, cancellations and refunds are handled by Apple.</li></ul></div>
<div class="card"><h2>Always check against the pattern</h2><p>Explanations come from crochet rules and, when you ask, from AI. They can be wrong, especially with a poor photo or an ambiguous pattern. The original always stays visible next to it. Check before you rip out your work.</p></div>
<div class="card"><h2>Your patterns</h2><p>Only import patterns you own, bought, wrote yourself or have permission to use. Clarochet is for personal use and never publishes or shares patterns.</p></div>`),
  L('es', `<h1>Términos de uso</h1><p class="soft">Actualizados el ${UPDATED.es}.</p>
<div class="card"><p>El uso de Clarochet se rige por el <a href="${EULA}">Contrato de Licencia de Usuario Final estándar de Apple (EULA)</a>, con las reglas siguientes.</p></div>
<div class="card"><h2>Patrones</h2><ul><li>Cada patrón que envías para explicar cuenta 1, entero o solo una parte. Dentro de él, las explicaciones, dudas y el contador son libres, con un límite razonable de solicitudes a la IA por patrón y por día para evitar abusos.</li><li>Tus 5 primeros patrones son gratis.</li><li>Plan Mensual: hasta 100 patrones al mes, con renovación automática en el App Store hasta que canceles (al menos 24 horas antes del final del período, en Ajustes &gt; tu nombre &gt; Suscripciones).</li><li>Paquete de 30: 30 patrones sin fecha de vencimiento.</li><li>Los pagos, cancelaciones y reembolsos los gestiona Apple.</li></ul></div>
<div class="card"><h2>Revisa siempre con el patrón</h2><p>Las explicaciones salen de reglas de crochet y, cuando lo pides, de la IA. Pueden equivocarse, sobre todo con una foto mala o un patrón ambiguo. El original siempre queda visible al lado. Revisa antes de deshacer tu trabajo.</p></div>
<div class="card"><h2>Tus patrones</h2><p>Importa solo patrones tuyos, comprados, escritos por ti o que tengas permiso para usar. Clarochet es de uso personal y no publica ni comparte patrones.</p></div>`),
].join('\n');

// ---------- suporte ----------
const support = [
  L('pt', `<h1>Ajuda e contato</h1><div class="card"><p>Escreva para <a href="mailto:${EMAIL}?subject=Clarochet">${EMAIL}</a>. Conte o que aconteceu e, se puder, mande a carreira que deu problema (só o texto dela).</p></div>
<div class="card"><h2>Perguntas frequentes</h2><p><strong>O que conta como uma receita?</strong> Cada receita que você manda, inteira ou só um trecho, conta 1. Dentro dela, explicações, dúvidas e contador são livres.</p><p><strong>O app não achou carreiras.</strong> O Clarochet lê receitas escritas em que cada carreira começa com o número, como “Rnd 1: 6 sc in MR (6)”, “Row 1” ou “Carreira 1”. Gráficos (o desenho dos pontos) ele ainda não lê. Fotos de perto, com boa luz e a página reta funcionam melhor.</p><p><strong>A foto saiu com um erro.</strong> Depois da foto, o app mostra quantas carreiras achou. Toque em “Corrigir o texto” e ajuste o número ou a letra antes de explicar.</p><p><strong>Americano ou britânico?</strong> Se a receita usa “sc”, é americana. Se usa “dc” para o ponto baixo, é britânica. Na dúvida, veja se o começo da receita diz “US terms” ou “UK terms”.</p><p><strong>Comprei e não apareceu.</strong> Toque em Ajustes &gt; Restaurar compras.</p><p><strong>Como cancelo a assinatura?</strong> Ajustes do iPhone &gt; seu nome &gt; Assinaturas &gt; Clarochet.</p></div>`),
  L('en', `<h1>Help and contact</h1><div class="card"><p>Email <a href="mailto:${EMAIL}?subject=Clarochet">${EMAIL}</a>. Tell us what happened and, if you can, include the row that caused trouble (just its text).</p></div>
<div class="card"><h2>FAQ</h2><p><strong>What counts as a pattern?</strong> Each pattern you send counts as 1, whole or just a section. Inside it, explanations, questions and the counter are free.</p><p><strong>The app found no rows.</strong> Clarochet reads written patterns where each row starts with its number, like “Rnd 1: 6 sc in MR (6)” or “Row 1”. It can't read charts (stitch diagrams) yet. Close-up photos, in good light, with the page flat work best.</p><p><strong>The photo came out with a mistake.</strong> After the photo, the app shows how many rows it found. Tap “Fix the text” and correct the number or letter before you explain it.</p><p><strong>US or UK terms?</strong> If the pattern uses “sc”, it's US. If it uses “dc” for the basic stitch, it's UK. When in doubt, look for “US terms” or “UK terms” near the start.</p><p><strong>I bought but don't see my patterns.</strong> Tap Settings &gt; Restore purchases.</p><p><strong>How do I cancel?</strong> iPhone Settings &gt; your name &gt; Subscriptions &gt; Clarochet.</p></div>`),
  L('es', `<h1>Ayuda y contacto</h1><div class="card"><p>Escribe a <a href="mailto:${EMAIL}?subject=Clarochet">${EMAIL}</a>. Cuéntanos qué pasó y, si puedes, incluye la vuelta que dio problemas (solo su texto).</p></div>
<div class="card"><h2>Preguntas frecuentes</h2><p><strong>¿Qué cuenta como un patrón?</strong> Cada patrón que envías cuenta 1, entero o solo una parte. Dentro de él, explicaciones, dudas y contador son libres.</p><p><strong>La app no encontró vueltas.</strong> Clarochet lee patrones escritos en los que cada vuelta empieza con su número, como «Rnd 1: 6 sc in MR (6)» o «Vuelta 1». Los gráficos (dibujos de puntos) todavía no los lee. Las fotos de cerca, con buena luz y la página recta funcionan mejor.</p><p><strong>La foto salió con un error.</strong> Después de la foto, la app muestra cuántas vueltas encontró. Toca «Corregir el texto» y arregla el número o la letra antes de explicarlo.</p><p><strong>¿Americano o británico?</strong> Si el patrón usa “sc”, es americano. Si usa “dc” para el punto bajo, es británico. Si dudas, mira si al principio dice “US terms” o “UK terms”.</p><p><strong>Compré y no veo mis patrones.</strong> Toca Ajustes &gt; Restaurar compras.</p><p><strong>¿Cómo cancelo?</strong> Ajustes del iPhone &gt; tu nombre &gt; Suscripciones &gt; Clarochet.</p></div>`),
].join('\n');

writeFileSync('index.html', page({ title: 'Clarochet — crochet patterns explained row by row', depth: 0, body: home }));
for (const [dir, title, body] of [
  ['privacy', 'Clarochet — Privacy Policy', privacy],
  ['terms', 'Clarochet — Terms of Use', terms],
  ['support', 'Clarochet — Support', support],
]) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, page({ title, depth: 1, body }));
}
console.log('site gerado');
