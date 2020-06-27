import marked from "marked";
import * as utils from "../utils";
import Advisor from "./Advisor";

export default class CustomRenderer extends marked.Renderer {
  advisor: Advisor;

  constructor(advisor: Advisor) {
    super();
    this.advisor = advisor;
  }
  // need to sanitize code
  // TODO
  code(
    code: string,
    language: string | undefined,
    isEscaped: boolean
  ): string {
    // return `\\texttt{${utils.sanitizeTextMode(code)}}`; // TODO
    const id = code;
    const actualCode = utils.sanitizeCodeMode(
      this.advisor.getCode(id)
    );
    if (this.advisor.isFirstInput(id)) {
      return `\\begin{example}\n  \\exmp{%\n${actualCode}\n  }`;
    }
    if (this.advisor.isInput(id)) {
      return `\\exmp{%\n${actualCode}\n  }`;
    }
    if (this.advisor.isLastOutput(id)) {
      return `{%\n${actualCode}\n  }%\n\\end{example}\n\n`;
    }
    if (this.advisor.isOutput(id)) {
      return `{%\n${actualCode}\n  }`;
    }
    return `\\texttt{${utils.sanitizeTextMode(actualCode)}}`;
  }

  blockquote(quote: string): string {
    return `\\begin{quote}${quote}\\end{quote}`;
  }

  html(html: string): string {
    return "?? :D ??";
  }

  heading(
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: marked.Slugger
  ): string {
    if (level === 1) {
      return `\\problemtitle{${text}}\n\n`;
    } else if (level === 2) {
      return `\\heading{${text}}\n\n`;
    } else {
      return "?? :D ??";
    }
  }

  // use hr as page break
  hr(): string {
    return "\\pagebreak";
  }

  list(body: string, ordered: boolean, start: number): string {
    return ordered
      ? `\\begin{enumerate}\n${body}\n\\end{enumerate}\n\n`
      : `\\begin{itemize}\n${body}\n\\end{itemize}\n\n`;
  }

  listitem(text: string): string {
    return `\\item ${text}\n`;
  }

  // checkbox is not supported
  checkbox(checked: boolean): string {
    return "?? :D ??";
  }

  paragraph(text: string): string {
    return `${text}\n\n`;
  }

  // table are not supported
  table(header: string, body: string): string {
    return "?? :D ??";
  }
  tablerow(content: string): string {
    return "?? :D ??";
  }
  tablecell(
    content: string,
    flags: {
      header: boolean;
      align: "center" | "left" | "right" | null;
    }
  ): string {
    return "?? :D ??";
  }

  strong(text: string): string {
    return `\\textbf{${text}}`;
  }

  em(text: string): string {
    return `\\emph{${text}}`;
  }

  // TODO: probably use token.raw
  codespan(code: string): string {
    const unescaped = utils.unescape(code);
    const matched = unescaped.match(/^\$(.*)\$$/);
    if (matched) {
      return `$${matched[1]}$`;
    } else {
      return `$${utils.latexize(unescaped)}$`;
    }
  }

  br(): string {
    return "\n\n";
  }

  // \usepackage[normalem]{ulem}
  del(text: string): string {
    return `\\sout{${text}}`;
  }

  // \usepackage{hyperref}
  link(
    href: string | null,
    title: string | null,
    text: string
  ): string {
    return `\\href{${href}}{${text}}`;
  }

  // image is not supported
  image(
    href: string | null,
    title: string | null,
    text: string
  ): string {
    return "?? :D ??";
  }

  // text has to sanitized
  text(text: string): string {
    return `${utils.sanitizeTextMode(text)}`;
  }
}
