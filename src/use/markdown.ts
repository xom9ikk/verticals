import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';
import MarkdownIt from 'markdown-it';
// @ts-ignore
import EmojiIt from 'markdown-it-emoji';
// @ts-ignore
import MarkdownItSub from 'markdown-it-sub';
// @ts-ignore
import MarkdownItSup from 'markdown-it-sup';
// @ts-ignore
import MarkdownItIns from 'markdown-it-ins';
// @ts-ignore
import MarkdownItMark from 'markdown-it-mark';
// @ts-ignore
import MarkdownItFootnote from 'markdown-it-footnote';
// @ts-ignore
import MarkdownItDeflist from 'markdown-it-deflist';

// @ts-ignore
const md = new MarkdownIt({
  typographer: true,
  linkify: true,
  xhtmlOut: true,
  breaks: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      } catch (e) { console.error(e); }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

md.use(EmojiIt)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItIns)
  .use(MarkdownItMark)
  .use(MarkdownItFootnote)
  .use(MarkdownItDeflist);

export const useMarkdown = () => {
  const renderMarkdown = (data: string) => md.render(data);

  return {
    renderMarkdown,
  };
};
