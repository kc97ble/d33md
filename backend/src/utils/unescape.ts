// copied from marked/src/helpers.js

const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

export default function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon") return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x"
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    if (n === "lt") return "<";
    if (n === "gt") return ">";
    if (n === "amp") return "&";
    if (n === "quot") return '"';
    return "";
  });
}
