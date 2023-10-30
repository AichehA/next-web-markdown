import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const locates = ["fr", "en"];

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => {
      const path = doc._raw.flattenedPath;
      const pathArray = path.split("/");
      const locale = locates.includes(pathArray.at(0)) ? pathArray.at(0) : "fr";
      return locale === "fr"
        ? pathArray.slice(1).join("/")
        : pathArray.slice(2).join("/");
    },
  },
  readTime: {
    type: "string",
    resolve: (post) => {
      const wordsPerMinute = 200;
      const noOfWords = post.body.raw.split(/\s/g).length;
      const minutes = noOfWords / wordsPerMinute;
      const readTime = Math.ceil(minutes);
      return readTime;
    },
  },
  locale: {
    type: "string",
    resolve: (doc) => {
      const path = doc._raw.sourceFilePath;
      const pathArray = path.split("/");
      return locates.includes(pathArray.at(0)) ? pathArray.at(0) : "fr";
    },
  },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export const EnDoc = defineDocumentType(() => ({
  name: "EnDoc",
  filePathPattern: `en/docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export const Home = defineDocumentType(() => ({
  name: "Home",
  filePathPattern: `home/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export const EnHome = defineDocumentType(() => ({
  name: "EnHome",
  filePathPattern: `en/home/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Doc, EnDoc, Home, EnHome],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      rehypeKatex,
    ],
  },
});
