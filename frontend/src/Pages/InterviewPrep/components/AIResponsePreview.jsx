import React, { useState, useMemo } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

/* ---------- CONTENT NORMALIZER (BETTER STUDY READABILITY) ---------- */
function normalizeContent(raw) {
  if (!raw) return "";

  let text = String(raw);

  // normalize spacing
  text = text.replace(/\r\n/g, "\n");
  text = text.replace(/\n{3,}/g, "\n\n");

  // fix accidental broken fences from AI responses
  const fences = (text.match(/```/g) || []).length;
  if (fences % 2 !== 0) text += "\n```";

  return text.trim();
}

/* ---------- MAIN COMPONENT ---------- */
function AIResponsePreview({ content }) {
  const processed = useMemo(() => normalizeContent(content), [content]);

  if (!processed) return null;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div
        className="
        prose prose-slate
        dark:prose-invert
        max-w-none
        text-[15px]
        leading-7
        selection:bg-blue-100
      "
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const lang = match?.[1] || "text";

              if (!inline) {
                return (
                  <Codeblock
                    code={String(children).replace(/\n$/, "")}
                    lang={lang}
                  />
                );
              }

              return (
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[13px]">
                  {children}
                </code>
              );
            },

            p: ({ children }) => (
              <p className="mb-5 leading-7 text-gray-800 dark:text-gray-200">
                {children}
              </p>
            ),

            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-10 mb-5 tracking-tight">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-6 mb-3">
                {children}
              </h3>
            ),

            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 my-5">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 my-5">
                {children}
              </ol>
            ),

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-300 bg-blue-50 dark:bg-gray-800 pl-4 py-2 rounded-r-md italic my-6">
                {children}
              </blockquote>
            ),

            table: ({ children }) => (
              <div className="overflow-x-auto my-6 rounded-lg border">
                <table className="min-w-full text-sm">{children}</table>
              </div>
            ),

            th: ({ children }) => (
              <th className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="px-4 py-2 border-t">{children}</td>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                {children}
              </a>
            ),

            hr: () => <hr className="my-10 border-gray-200 dark:border-gray-700" />,

            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="rounded-lg my-6 shadow-sm"
              />
            ),
          }}
        >
          {processed}
        </ReactMarkdown>
      </div>
    </div>
  );
}

/* ---------- CODE BLOCK ---------- */
function Codeblock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="my-7 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <LuCode size={15} />
          <span className="text-xs uppercase tracking-wide">
            {lang || "code"}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-black dark:hover:text-white transition"
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
        </button>
      </div>

      <SyntaxHighlighter
        language={lang}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: "1.2rem",
          fontSize: 13.5,
          lineHeight: 1.6,
          background: "transparent",
        }}
        showLineNumbers
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;