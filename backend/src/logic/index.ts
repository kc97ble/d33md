import marked from "marked";
import CustomRenderer from "./CustomRenderer";
import Advisor from "./Advisor";
import * as uuid from "uuid";

class Preprocessor implements Advisor {
  types = new Set();
  codes = {};
  lastCodeToken = null;

  walker = (token) => {
    this.types.add(token.type);
    if (token.type === "code") {
      const id = uuid.v1();
      this.codes[id] = {
        ...token,
        hasNext: false,
        index: !!this.lastCodeToken ? this.lastCodeToken.index + 1 : 0,
      };
      if (!!this.lastCodeToken) {
        this.lastCodeToken.hasNext = true;
      }
      token.text = id;
      this.lastCodeToken = this.codes[id];
    } else {
      this.lastCodeToken = null;
    }
  };

  getUsePackageList() {
    const result = [];
    if (this.types.has("del")) {
      result.push("\\usepackage[normalem]{ulem}");
    }
    if (this.types.has("link")) {
      result.push("\\usepackage{hyperref}");
    }
    if (this.types.has("checkbox")) {
      result.push("\\usepackage{amssymb}");
    }
    return result;
  }

  isFirstInput(id: string): boolean {
    if (!this.codes.hasOwnProperty(id)) return false;
    const info = this.codes[id];
    return !!info.hasNext && info.index === 0;
  }

  isInput(id: string): boolean {
    if (!this.codes.hasOwnProperty(id)) return false;
    const info = this.codes[id];
    return !!info.hasNext && info.index % 2 === 0;
  }

  isOutput(id: string): boolean {
    if (!this.codes.hasOwnProperty(id)) return false;
    const info = this.codes[id];
    return info.index % 2 === 1;
  }

  isLastOutput(id: string): boolean {
    if (!this.codes.hasOwnProperty(id)) return false;
    const info = this.codes[id];
    return !info.hasNext && info.index !== 0; // ensure that block always closes
  }

  getCode(id: string): string {
    if (!this.codes.hasOwnProperty(id)) return "?? :D ??";
    const info = this.codes[id];
    return info.text;
  }
}

export function mdToLatex(text: string) {
  const preprocessor = new Preprocessor();
  const renderer = new CustomRenderer(preprocessor);

  const tokens = marked.lexer(text);
  (marked as any).walkTokens(tokens, preprocessor.walker);
  const body = marked.parser(tokens, { renderer });

  return `
\\documentclass[12pt,a4paper,oneside]{article}

\\usepackage[utf8]{vietnam}
\\usepackage[english]{babel}
\\usepackage{freecontest}

${preprocessor.getUsePackageList().join("\n")}

\\begin{document}

${body}

\\end{document}
`;
}

const TEST1 = `


Heading 1
======

Heading 2
------

### H3  #include <stdio.h>
#### H4  #include <stdio.h>
##### H5  #include <stdio.h>
###### H6  #include <stdio.h>

Emphasis, aka italics, with *#include <stdio.h>* or _#include <stdio.h>_.

Strong emphasis, aka bold, with **#include <stdio.h>** or __#include <stdio.h>__.

Combined emphasis with **asterisks and _#include <stdio.h>_**.

Strikethrough uses two tildes. ~~#include <stdio.h>~~

1. #include <stdio.h>
2. Another item
  * #include <stdio.h>. 
1. Actual numbers don't matter, just that it's a number
  1. #include <stdio.h>
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)  
   #include <stdio.h>

* Unordered list can use asterisks #include <stdio.h>
- Or minuses #include <stdio.h>
+ Or pluses #include <stdio.h>

[I'm an inline-style link#](https://www.google.com/%22)

[I'm an inline-style link with title#](https://www.google.com# "Google's Homepage#")

[I'm a reference-style link#][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file#](../blob/master/LICENSE#)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

Inline \`$\\texttt{code}$\` has \`back-ticks #include <stdio.h> around\` it.

\`\`\`javascript
var s = "JavaScript syntax highlighting";
#include <stdio.h>
alert(s);
\`\`\`

hmm
 
\`\`\`python
s = "Python syntax highlighting"
#include <stdio.h>
print s
\`\`\`

hmm
 
\`\`\`
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
\`\`\`

> Blockquotes are very handy in email to emulate reply text. #include <stdio.h>
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.  #include <stdio.h>

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate #include <stdio.h> paragraph*.

This line is also a separate paragraph, but... #include <stdio.h>
This line is only separated by a single newline, so it's a separate line in the *same #include <stdio.h> paragraph*.

`;

console.log(mdToLatex(TEST1));
import * as utils from "../utils";
console.log(utils.sanitizeTextMode("####"));
