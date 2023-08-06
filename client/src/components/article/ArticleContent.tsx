import { h } from "hastscript";
import { omit } from "lodash";
import { Directives } from "mdast-util-directive";
import Link from "next/link";
import { FC, Fragment } from "react";
import { Alert, Checkbox, CodeMockup } from "react-daisyui";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkGemogi from "remark-gemoji";
import remarkGFM from "remark-gfm";
import { Plugin } from "unified";
import { Node } from "unist"; // eslint-disable-line import/no-unresolved
import { visit } from "unist-util-visit";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      info: undefined;
      success: undefined;
      warning: undefined;
      error: undefined;
    }
  }
}

type ComponentsMap = Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>;

const components: ComponentsMap = {
  // HTML
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ node, href, rel, target, ...props }) => {
    if (href && !rel && !target) {
      return <Link href={href} {...props} />;
    }

    return <a href={href} rel={rel} target={target} {...props} />;
  },
  code: ({ children, className }) => {
    return (
      <CodeMockup className={"not-prose mb-4 bg-dark text-white"}>
        <pre className={className}>
          <code>{children}</code>
        </pre>
      </CodeMockup>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input: ({ node, type, ...props }) => {
    if (type === "checkbox") {
      return (
        <Checkbox
          className={"mr-2 align-middle"}
          color={"primary"}
          {...omit(props, ["color", "size", "checked"])}
          defaultChecked={props.checked}
          disabled={false}
          readOnly={true}
        />
      );
    }

    return <input type={type} {...props} />;
  },
  pre: Fragment,
  // Custom
  info: ({ children }) => {
    return (
      <Alert className={"not-prose mb-4"} status={"info"}>
        {children}
      </Alert>
    );
  },
  success: ({ children }) => {
    return (
      <Alert className={"not-prose mb-4"} status={"success"}>
        {children}
      </Alert>
    );
  },
  warning: ({ children }) => {
    return (
      <Alert className={"not-prose mb-4"} status={"warning"}>
        {children}
      </Alert>
    );
  },
  error: ({ children }) => {
    return (
      <Alert className={"not-prose mb-4"} status={"error"}>
        {children}
      </Alert>
    );
  },
};

const isDirectiveNode = (node: Node): node is Directives => {
  const { type } = node;

  return (
    type === "textDirective" ||
    type === "leafDirective" ||
    type === "containerDirective"
  );
};

const reactDirectivePlus: Plugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (!isDirectiveNode(node)) return;

      const data = node.data || (node.data = {});
      const { tagName, properties } = h(node.name, node.attributes);

      data.hName = tagName;
      data.hProperties = properties;
    });
  };
};

type Props = {
  content: string;
};

export const ArticleContent: FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      className={"prose prose-xl max-w-none"}
      components={components}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: "no-underline" } },
        ],
        [rehypeExternalLinks, { target: "_blank" }],
        rehypeHighlight,
      ]}
      remarkPlugins={[
        remarkDirective,
        reactDirectivePlus,
        remarkGemogi,
        remarkGFM,
      ]}
    >
      {content}
    </ReactMarkdown>
  );
};
