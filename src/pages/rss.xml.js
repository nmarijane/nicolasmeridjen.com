import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { defaultLang, t } from '../i18n/translations';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: t(defaultLang, 'site.title'),
		description: t(defaultLang, 'site.description'),
		site: context.site,
		items: posts.map((post) => {
			const lang = post.id.split('/')[0];
			const slug = post.id.replace(`${lang}/`, '');
			return {
				...post.data,
				link: `/${lang}/blog/${slug}/`,
			};
		}),
	});
}
