import marked from "marked";

class CustomRenderer extends marked.Renderer {
  heading = (text, level) => {
    return text;
  };
}

const renderer = new CustomRenderer();

// @ts-ignore
marked.use({ renderer: renderer });

export function mdToLatex(text: string) {
  return marked(text);
}

console.log(mdToLatex("# Heading"));
