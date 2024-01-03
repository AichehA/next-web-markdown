import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import appConfig from "./app.config";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      return doc._raw.flattenedPath.includes("home")
        ? `/${doc._raw.sourceFileDir}`
        : `/${doc._raw.flattenedPath}`;
    },
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => {
      const path = doc._raw.flattenedPath;
      const pathArray = path.split("/");
      return pathArray.slice(2).join("/");
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
  lang: {
    type: "string",
    resolve: (doc) => {
      const path = doc._raw.sourceFilePath;
      const pathArray = path.split("/");
      return appConfig.langs.includes(pathArray.at(0)) ? pathArray.at(0) : "fr";
    },
  },
};

export const Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `**/docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    cover: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export const Homes = defineDocumentType(() => ({
  name: "Homes",
  filePathPattern: `**/home.mdx`,
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
  documentTypes: [Docs, Homes],
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
