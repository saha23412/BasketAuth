import * as locales from './locales.js';
export default function translate(lang, text, plural) {
  const result = locales[lang] && typeof locales[lang][text] !== 'undefined' ? locales[lang][text] : text;

  if (typeof plural !== 'undefined'){
    const key = new Intl.PluralRules(lang).select(plural);
    return result[key] || result;
  }

  return result;
}
