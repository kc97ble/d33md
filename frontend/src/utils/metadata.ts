type Lines = Array<string>;

function textToLines(text: string): Lines {
  return text.split("\n");
}

function linesToText(lines: Lines): string {
  return lines.join("\n");
}

const REGEX = /^\s*\[\/\/\]\s*:\s*\#\s*\(\s*(\S*)\s*=\s*(\S*)\s*\)$/; // matches [//]: # (key=value)

function isComment(line: string) {
  return REGEX.test(line);
}

function splitComments(lines: Lines): [Lines, Lines] {
  let contents: Lines = [],
    comments: Lines = [];
  lines.forEach((item) => {
    (isComment(item) ? comments : contents).push(item);
  });
  return [contents, comments];
}

function mergeComments(contents: Lines, comments: Lines): Lines {
  return [...contents, ...comments];
}

function decodeComment(comment: string): [string, string] {
  const m = comment.match(REGEX);
  return !!m ? [decodeURIComponent(m[1]), decodeURIComponent(m[2])] : null;
}

function encodeComment(key: string, value: string): string {
  return "[//]: # (" + encodeURIComponent(key) + "=" + encodeURIComponent(value) + ")";
}

function decodeCommentList(comments: Lines) {
  return comments.map(decodeComment);
}

function encodeCommentList(keyValueList: Array<[string, string]>) {
  return keyValueList.map(([k, v]) => encodeComment(k, v));
}

export type Metadata = Map<string, string>;

export function getMetadata(text: string): Metadata {
  const lines = textToLines(text);
  const [_, comments] = splitComments(lines);
  const kv = decodeCommentList(comments);
  return new Map(kv);
}

export function setMetadata(text: string, metadata: Metadata): string {
  const lines = textToLines(text);
  const [contents, _] = splitComments(lines);
  const kv = Array.from(metadata);
  const comments = encodeCommentList(kv);
  const newLines = mergeComments(contents, comments);
  return linesToText(newLines);
}
