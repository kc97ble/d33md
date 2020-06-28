import marked from "marked";
import * as utils from "../utils";
import Advisor from "./Advisor";

enum LatexMode {
  None,
  Text,
  Math,
  Code,
}

type SandwichOptions = {
  unescape?: boolean;
  latexMode?: LatexMode;
};

const DEFAULT_SANDWICH_OPTIONS: SandwichOptions = {
  unescape: true,
  latexMode: LatexMode.Text,
};

function sandwich(
  leftText: string,
  text: string,
  rightText: string,
  options: SandwichOptions = {}
) {
  const { unescape, latexMode } = {
    ...DEFAULT_SANDWICH_OPTIONS,
    ...options,
  };
  const unescapedText = unescape ? utils.unescape(text) : text;
  const latexCode =
    latexMode === LatexMode.Text
      ? utils.sanitizeTextMode(unescapedText)
      : latexMode === LatexMode.Math
      ? utils.sanitizeMathMode(unescapedText)
      : latexMode === LatexMode.Code
      ? utils.sanitizeCodeMode(unescapedText)
      : unescapedText;
  return leftText + latexCode + rightText;
}

// similar to sandwich, but simpler
function taco(leftText, text, rightText) {
  return leftText + text + rightText;
}

function unimplemented(message: string) {
  return "\n?? :D ?? " + message + " ?? :D ??\n";
}

export default class CustomRenderer extends marked.Renderer {
  advisor: Advisor;

  constructor(advisor: Advisor) {
    super();
    this.advisor = advisor;
  }

  code(code: string, _language: string | undefined, _isEscaped: boolean): string {
    const id = code;
    const actualCode = this.advisor.getCode(id);
    const OPTIONS = { unescape: false, latexMode: LatexMode.Code };

    if (this.advisor.isFirstInput(id)) {
      return sandwich("\\begin{example}\n  \\exmp{%\n", actualCode, "\n  }", OPTIONS);
    } else if (this.advisor.isInput(id)) {
      return sandwich("\\exmp{%\n", actualCode, "\n  }", OPTIONS);
    } else if (this.advisor.isLastOutput(id)) {
      return sandwich("{%\n", actualCode, "\n  }%\n\\end{example}\n\n", OPTIONS);
    } else if (this.advisor.isOutput(id)) {
      return sandwich("{%\n", actualCode, "\n  }", OPTIONS);
    } else {
      return taco("\\begin{verbatim}\n", actualCode, "\n\\end{verbatim}\n\n");
    }
  }

  blockquote(quote: string): string {
    return taco("\\begin{quote}", quote, "\\end{quote}");
  }

  html(_html: string): string {
    return unimplemented("HTML is not supported.");
  }

  heading(
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    _raw: string,
    _slugger: marked.Slugger
  ): string {
    const OPTIONS: SandwichOptions = { unescape: false, latexMode: LatexMode.None };
    if (level === 1) {
      return taco("\\problemtitle{", text, "}\n\n");
    } else if (level === 2) {
      return taco("\\heading{", text, "}\n\n");
    } else if (level === 3) {
      return taco("\\subsubsection*{", text, "}\n\n"); // TODO: for future use
    } else if (level === 4) {
      return taco("\\paragraph*{", text, "}\n\n"); // TODO: for future use
    } else if (level === 5) {
      return taco("\\subparagraph*{", text, "}\n\n"); // TODO: for future use
    } else {
      return unimplemented("H6 is not supported.");
    }
  }

  // use hr as page break
  hr(): string {
    return "\\pagebreak\n\n";
  }

  list(body: string, ordered: boolean, _start: number): string {
    const tag = ordered ? "enumerate" : "itemize";
    return taco("\\begin{" + tag + "}\n", body, "\n\\end{" + tag + "}\n\n");
  }

  listitem(text: string): string {
    return taco("\\item ", text, "\n");
  }

  // \usepackage{amssymb}
  checkbox(checked: boolean): string {
    return !checked ? "$\\square$" : "$\\boxtimes$";
  }

  paragraph(text: string): string {
    return taco("", text, "\n\n");
  }

  table(_header: string, _body: string): string {
    return unimplemented(
      "Table is not supported. Please use `$ ... latex code ... $` instead."
    );
  }

  tablerow(_content: string): string {
    return unimplemented(
      "Table is not supported. Please use `$ ... latex code ... $` instead."
    );
  }

  tablecell(
    _content: string,
    _flags: {
      header: boolean;
      align: "center" | "left" | "right" | null;
    }
  ): string {
    return unimplemented(
      "Table is not supported. Please use `$ ... latex code ... $` instead."
    );
  }

  strong(text: string): string {
    return taco("\\textbf{", text, "}");
  }

  em(text: string): string {
    return taco("\\emph{", text, "}");
  }

  codespan(code: string): string {
    const unescaped = utils.unescape(code);
    let m = null;
    if ((m = unescaped.match(/^\$(.*)\$$/))) {
      return `$${m[1]}$`;
    } else if ((m = unescaped.match(/^\"(.*)\"$/))) {
      return taco("\\texttt{", utils.sanitizeTextMode(m[1]), "}");
    } else if ((m = unescaped.match(/^\'(.*)\'$/))) {
      return taco("\\texttt{", utils.sanitizeTextMode(m[1]), "}");
    } else {
      return taco("$", utils.latexize(unescaped), "$");
    }
  }

  br(): string {
    return "\n\n";
  }

  // \usepackage[normalem]{ulem}
  del(text: string): string {
    return taco("\\sout{", text, "}");
  }

  // \usepackage{hyperref}
  link(href: string | null, _title: string | null, text: string): string {
    return `\\href{${href}}{${text}}`;
  }

  // image is not supported
  image(href: string | null, title: string | null, text: string): string {
    return unimplemented("Image is not supported. There is no workaround yet.");
  }

  text(text: string): string {
    return sandwich("", text, "");
  }
}
