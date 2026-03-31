import { languages, defaultLang, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in languages) return lang as Lang;
	return defaultLang;
}

export function getLocaleDateFormat(lang: Lang): string {
	return lang === 'fr' ? 'fr-FR' : 'en-US';
}

export function getLangPrefix(lang: Lang): string {
	return `/${lang}`;
}

export function getAlternateLang(lang: Lang): Lang {
	return lang === 'fr' ? 'en' : 'fr';
}
