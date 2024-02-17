import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const config = defineConfig({
  // Specify the file extensions that MDsveX should process
  extensions: ['.svelte.md', '.md', '.svx'],

  // Layouts allow you to wrap your Markdown content in a Svelte component
  // This is useful for applying consistent styling or structure
  layout: {
    _: './src/layouts/DefaultLayout.svelte', // Default layout
    blog: './src/layouts/BlogLayout.svelte', // Specific layout for blog posts
  },

  // remarkPlugins and rehypePlugins allow you to use remark and rehype plugins
  // to transform the content of your Markdown files
  remarkPlugins: [
    remarkGfm, // GitHub Flavored Markdown
  ],
  rehypePlugins: [
    rehypeSlug, // Add IDs to headings
    [rehypeAutolinkHeadings, { behavior: 'wrap' }], // Add links to headings
  ],

  // smartypants converts straight quotes into curly quotes, dashes into en/em-dashes, etc.
  smartypants: true,
});

export default config;