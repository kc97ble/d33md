type Tree = {
  type: string;
  children: string | Array<Tree>;
};

const SANITIZE_TEXT_MODE = {
  "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  $: "\\$",
  "&": "\\&",
  "#": "\\#",
  "^": "\\^{}",
  _: "\\_",
  "~": "\\textasciitilde{}",
  "%": "\\%",
  "<": "\\textless{}",
  ">": "\\textgreater{}",
  "|": "\\textbar{}",
  // '"': "``",
  // "'": "\textquotesingle{}",
  // "`": "\textasciigrave{}",
};

const SANITIZE_MATH_MODE = {
  // "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  $: "\\$",
  "&": "\\&",
  "#": "\\#",
  // "^": "\\^{}",
  // _: "\\_",
  // "~": "\\textasciitilde{}",
  "%": "\\%",
  // "<": "\\textless{}",
  // ">": "\\textgreater{}",
  // "|": "\\textbar{}",
  // '"': "``",
  // "'": "\textquotesingle{}",
  // "`": "\textasciigrave{}",
};

export function sanitizeTextMode(s: string): string {
  // TODO: test
  return s.replace(/[\\{}$&#^_~%<>|"'`]/g, (char) => SANITIZE_TEXT_MODE[char] || char);
}

export function sanitizeMathMode(s: string): string {
  // TODO: test
  return s.replace(/[\\{}$&#^_~%<>|"'`]/g, (char) => SANITIZE_MATH_MODE[char] || char);
}

export function sanitizeCodeMode(s: string): string {
  // TODO: test
  return s;
}

function getRole(text: string) {
  let h = 0;
  let result = "";
  let c = 65;
  for (let i = 0; i < text.length; i++) {
    if (/\(\[\{/.test(text[i])) {
      h += 1;
    }
    result += h == 0 ? "." : String.fromCharCode(c);
    if (/\)\]\}/.test(text[i])) {
      h -= 1;
      c += 1;
    }
  }
  return result;
}

function rule1(text: string): Tree {
  const role = getRole(text);
  for (let i = 0; i < text.length; i++) {
    if (!/[A-Z]/.test(role[i])) {
      if (!/[a-z0-9A-Z_^+\-*\/<=>! ]/.test(text[i])) {
        return {
          type: "concat",
          children: [
            rule2(text.substring(0, i)),
            { type: "literal", children: text[i] },
            rule1(text.substring(i + 1)),
          ],
        };
      }
    }
  }
  return rule2(text);
}

function rule2(text: string): Tree {
  const role = getRole(text);
  for (let i = 0; i < text.length; i++) {
    if (!/[A-Z]/.test(role[i])) {
      if (/[<>=!]/.test(text[i])) {
        let j = i;
        while (/[<>=!]/.test(text[j])) j += 1;
        return {
          type: "relation",
          children: [
            rule3(text.substring(0, i)),
            { type: "literal", children: text.substring(i, j) },
            rule2(text.substring(j)),
          ],
        };
      }
    }
  }
  return rule3(text);
}

function rule3(text: string): Tree {
  const role = getRole(text);
  for (let i = 0; i < text.length; i++) {
    if (!/[A-Z]/.test(role[i])) {
      if (/[+\-*\/]/.test(text[i])) {
        let j = i + 1;
        return {
          type: "arithmetic",
          children: [
            rule4(text.substring(0, i)),
            { type: "literal", children: text.substring(i, j) },
            rule3(text.substring(j)),
          ],
        };
      }
    }
  }
  return rule4(text);
}

function rule4(text: string): Tree {
  const role = getRole(text);
  for (let i = 0; i < text.length; i++) {
    if (!/[A-Z]/.test(role[i])) {
      if (/[_^]/.test(text[i])) {
        let j = i + 1;
        return {
          type: "script",
          children: [
            rule5(text.substring(0, i)),
            { type: "literal", children: text.substring(i, j) },
            rule4(text.substring(j)),
          ],
        };
      }
    }
  }
  return rule5(text);
}

function rule5(text: string): Tree {
  const role = getRole(text);
  for (let i = 0; i + 1 < text.length; i++) {
    if (role[i] != role[i + 1]) {
      return {
        type: "concat",
        children: [rule6(text.substring(0, i + 1)), rule5(text.substring(i + 1))],
      };
    }
  }
  return rule6(text);
}

function rule6(text) {
  if (text === "") return { type: "literal", children: "" };
  if (text[0] === "(" && text[text.length - 1] === ")") {
    return {
      type: "concat",
      children: [
        { type: "literal", children: "(" },
        rule1(text.substring(1, text.length - 1)),
        { type: "literal", children: ")" },
      ],
    };
  }
  if (text[0] === "[" && text[text.length - 1] === "]") {
    return {
      type: "concat",
      children: [
        { type: "literal", children: "[" },
        rule1(text.substring(1, text.length - 1)),
        { type: "literal", children: "]" },
      ],
    };
  }
  if (text[0] === "{" && text[text.length - 1] === "}") {
    return {
      type: "concat",
      children: [rule1(text.substring(1, text.length - 1))],
    };
  }
  return {
    type: "literal",
    children: text,
  };
}

function opToLatex(text: string): string {
  const MAP = {
    "<=": "\\le",
    ">=": "\\ge",
    "==": "=",
    "!=": "\\ne",
    "===": "\\equiv",
    "*": "\\times",
    "<": "<",
    ">": ">",
  };
  return MAP[text] || sanitizeMathMode(text);
}

function treeToLatex(node: Tree): string {
  if (node.type === "literal") {
    return opToLatex(node.children as string);
  } else if (node.type === "concat") {
    return (node.children as Array<Tree>).map((child) => treeToLatex(child)).join(" ");
  } else if (node.type === "relation") {
    return [
      treeToLatex((node.children as Array<Tree>)[0]),
      treeToLatex((node.children as Array<Tree>)[1]),
      treeToLatex((node.children as Array<Tree>)[2]),
    ].join(" ");
  } else if (node.type === "arithmetic") {
    return [
      treeToLatex((node.children as Array<Tree>)[0]),
      treeToLatex((node.children as Array<Tree>)[1]),
      treeToLatex((node.children as Array<Tree>)[2]),
    ].join(" ");
  } else if (node.type === "script") {
    return [
      "{" + treeToLatex((node.children as Array<Tree>)[0]) + "}",
      treeToLatex((node.children as Array<Tree>)[1]),
      "{" + treeToLatex((node.children as Array<Tree>)[2]) + "}",
    ].join(" ");
  } else {
    throw Error("invalid");
  }
}

export default function latexize(text: string): string {
  const node = rule1(text);
  return treeToLatex(node);
}
