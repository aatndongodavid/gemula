// Validation des formulaires et protection anti-spam, côté navigateur.
// Les réponses partent vers Google Forms, qui ne permet pas de vérification serveur :
// on combine donc plusieurs filtres légers qui arrêtent la grande majorité des robots
// sans gêner les visiteurs (pas de captcha à résoudre).
//  1. Champ piège invisible : un humain ne le remplit jamais.
//  2. Délai minimal : un envoi moins de 3 secondes après l'ouverture de la page est rejeté.
//  3. Limite de fréquence : un envoi par minute et par navigateur.
//  4. Filtre de contenu : trop de liens dans le message = rejet.

export const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScOGnCs2MCGc4-_r-FKENVnrGF__dOD55k_xgT65DO-wHl1gA/formResponse';

export const FIELD_IDS = {
  nom: 'entry.1483131274',
  email: 'entry.672292509',
  organisation: 'entry.1220739448',
  type: 'entry.1070537805',
  message: 'entry.485062477'
} as const;

const MIN_DELAY_MS = 3000;
const RATE_LIMIT_MS = 60_000;
const MAX_LINKS = 2;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const messages = {
  required: 'Ce champ est obligatoire.',
  email: 'Indiquez une adresse email valide, par exemple nom@entreprise.cm.',
  tooShort: (n: number) => `Écrivez au moins ${n} caractères.`,
  tooLong: (n: number) => `${n} caractères au maximum.`,
  consent: 'Cochez cette case pour que nous puissions vous répondre.'
};

function errorFor(field: Field): string {
  const value = field.type === 'checkbox' ? '' : field.value.trim();
  if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    return field.required && !field.checked ? messages.consent : '';
  }
  if (field.required && !value) return messages.required;
  if (!value) return '';
  if (field instanceof HTMLInputElement && field.type === 'email' && !EMAIL_RE.test(value)) return messages.email;
  const min = Number(field.getAttribute('minlength') || 0);
  const max = Number(field.getAttribute('maxlength') || 0);
  if (min && value.length < min) return messages.tooShort(min);
  if (max && value.length > max) return messages.tooLong(max);
  return '';
}

function showError(field: Field, msg: string) {
  const id = `${field.id}-error`;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('p');
    el.id = id;
    el.className = 'field-error';
    const anchor = field.closest('[data-field]') ?? field;
    anchor.appendChild(el);
  }
  el.textContent = msg;
  el.hidden = !msg;
  field.setAttribute('aria-invalid', msg ? 'true' : 'false');
  const described = new Set((field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
  if (msg) described.add(id); else described.delete(id);
  if (described.size) field.setAttribute('aria-describedby', [...described].join(' '));
  else field.removeAttribute('aria-describedby');
}

function validate(form: HTMLFormElement): Field | null {
  let first: Field | null = null;
  form.querySelectorAll<Field>('input:not([data-hp]), textarea, select').forEach((f) => {
    if (!f.id) return;
    const msg = errorFor(f);
    showError(f, msg);
    if (msg && !first) first = f;
  });
  return first;
}

function isSpam(form: HTMLFormElement, text: string): boolean {
  const hp = form.querySelector<HTMLInputElement>('[data-hp]');
  if (hp && hp.value) return true;
  const started = Number(form.dataset.startedAt || 0);
  if (Date.now() - started < MIN_DELAY_MS) return true;
  const links = (text.match(/https?:\/\/|www\./gi) || []).length;
  return links > MAX_LINKS;
}

function rateLimited(key: string): boolean {
  try {
    const last = Number(localStorage.getItem(key) || 0);
    return Date.now() - last < RATE_LIMIT_MS;
  } catch { return false; }
}

interface Options {
  status: HTMLElement;
  /** Construit les valeurs à envoyer au formulaire Google à partir des données saisies. */
  payload: (data: FormData) => Record<keyof typeof FIELD_IDS, string>;
  success: string;
  fallbackEmail: string;
}

export function setupForm(form: HTMLFormElement, opts: Options) {
  form.dataset.startedAt = String(Date.now());
  const rateKey = `gemula-form-${form.id}`;

  // Validation au fil de la saisie, une fois le champ quitté une première fois
  form.querySelectorAll<Field>('input:not([data-hp]), textarea, select').forEach((f) => {
    if (!f.id) return;
    f.addEventListener('blur', () => { f.dataset.touched = '1'; showError(f, errorFor(f)); });
    f.addEventListener('input', () => { if (f.dataset.touched) showError(f, errorFor(f)); });
    f.addEventListener('change', () => { if (f.dataset.touched || f.type === 'checkbox') showError(f, errorFor(f)); });
  });

  const setStatus = (text: string, tone: 'info' | 'ok' | 'error') => {
    opts.status.textContent = text;
    opts.status.hidden = false;
    opts.status.className = `text-sm ${tone === 'ok' ? 'text-success' : tone === 'error' ? 'text-danger' : 'text-muted'}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = validate(form);
    if (invalid) {
      setStatus('Certains champs sont à corriger.', 'error');
      invalid.focus();
      return;
    }

    const data = new FormData(form);
    const values = opts.payload(data);

    if (isSpam(form, values.message)) {
      // Réponse volontairement neutre pour ne pas renseigner les robots
      setStatus(opts.success, 'ok');
      form.reset();
      return;
    }
    if (rateLimited(rateKey)) {
      setStatus('Votre message a déjà été envoyé. Patientez une minute avant un nouvel envoi.', 'error');
      return;
    }

    const body = new URLSearchParams();
    (Object.keys(FIELD_IDS) as (keyof typeof FIELD_IDS)[]).forEach((k) => body.append(FIELD_IDS[k], values[k] ?? ''));

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    setStatus('Envoi en cours…', 'info');

    try {
      // Google Forms ne renvoie pas d'en-têtes CORS : « no-cors » envoie la requête sans lire la réponse.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      try { localStorage.setItem(rateKey, String(Date.now())); } catch {}
      setStatus(opts.success, 'ok');
      form.reset();
      form.querySelectorAll<Field>('[aria-invalid]').forEach((f) => { f.removeAttribute('aria-invalid'); delete f.dataset.touched; });
      (window as any).gtag?.('event', 'generate_lead', { form_id: form.id });
    } catch {
      setStatus(`L'envoi a échoué. Écrivez-nous à ${opts.fallbackEmail} ou par WhatsApp.`, 'error');
    } finally {
      if (button) button.disabled = false;
    }
  });
}
