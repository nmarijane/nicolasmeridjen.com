export const languages = {
	fr: 'Français',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const translations: Record<Lang, Record<string, string>> = {
	fr: {
		'site.title': 'Nicolas Meridjen',
		'site.description': "Articles sur l'intelligence artificielle, la recherche en IA et l'impact sur les métiers.",
		'nav.articles': 'Articles',
		'nav.about': 'À propos',
		'home.title': 'IA, recherche & impact sur les métiers',
		'home.subtitle': "Analyses accessibles sur l'intelligence artificielle, les dernières avancées et ce que ça change concrètement.",
		'home.empty': 'Les premiers articles arrivent bientôt.',
		'audio.badge': 'Audio',
		'audio.listen': 'Écouter cet article',
		'article.updated': 'Mis à jour le',
		'share.twitter': 'Partager',
		'share.linkedin': 'Partager',
		'share.copy': 'Copier le lien',
		'share.copied': 'Copié !',
		'related.title': 'Articles similaires',
		'about.title': 'À propos',
		'about.meta.title': 'À propos — Nicolas Meridjen',
		'about.meta.description': "Ingénieur logiciel et IA, passionné par l'intelligence artificielle et son impact sur nos métiers.",
		'about.bio.1': "Je suis Nicolas, ingénieur logiciel avec plus de 14 ans d'expérience, spécialisé dans les écosystèmes TypeScript modernes et l'ingénierie IA.",
		'about.bio.2': "Au quotidien, j'intègre des workflows de développement assistés par IA — du coding agentique à l'orchestration multi-agents — pour accélérer la livraison et résoudre des problèmes complexes plus rapidement.",
		'about.bio.3': "Ce blog est mon espace pour explorer et vulgariser l'intelligence artificielle : les dernières avancées, les outils qui changent la donne, et l'impact concret sur nos façons de travailler.",
	},
	en: {
		'site.title': 'Nicolas Meridjen',
		'site.description': 'Articles on artificial intelligence, AI research, and its impact on the industry.',
		'nav.articles': 'Articles',
		'nav.about': 'About',
		'home.title': 'AI, Research & Industry Impact',
		'home.subtitle': 'Accessible analyses on artificial intelligence, the latest advances, and what it concretely changes.',
		'home.empty': 'First articles coming soon.',
		'audio.badge': 'Audio',
		'audio.listen': 'Listen to this article',
		'article.updated': 'Updated on',
		'share.twitter': 'Share',
		'share.linkedin': 'Share',
		'share.copy': 'Copy link',
		'share.copied': 'Copied!',
		'related.title': 'Related articles',
		'about.title': 'About',
		'about.meta.title': 'About — Nicolas Meridjen',
		'about.meta.description': 'Software and AI engineer, passionate about artificial intelligence and its impact on the industry.',
		'about.bio.1': "I'm Nicolas, a software engineer with 14+ years of experience, specialized in modern TypeScript ecosystems and AI engineering.",
		'about.bio.2': 'I integrate AI-assisted development workflows daily — from agentic coding to multi-agent orchestration — to accelerate delivery and solve complex problems faster.',
		'about.bio.3': 'This blog is my space to explore and explain artificial intelligence: the latest advances, game-changing tools, and the concrete impact on how we work.',
	},
};

export function t(lang: Lang, key: string): string {
	return translations[lang]?.[key] ?? translations[defaultLang]?.[key] ?? key;
}
