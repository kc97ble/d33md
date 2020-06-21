import marked from "marked";
import * as utils from "./utils";

class CustomRenderer extends marked.Renderer {
  code(
    code: string,
    language: string | undefined,
    isEscaped: boolean
  ): string {
    return "?? :D ??";
  }
  blockquote(quote: string): string {
    return "?? :D ??";
  }
  html(html: string): string {
    return "?? :D ??";
  }
  heading = (
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: marked.Slugger
  ): string => {
    if (level === 1) {
      return `\n\\problemtitle{${utils.sanitizeTextMode(text)}}\n`;
    } else if (level === 2) {
      return `\n\\heading{${utils.sanitizeTextMode(text)}}\n`;
    } else {
      return " ?? :D ?? ";
    }
  };
  hr(): string {
    return " \\pagebreak ";
  }
  // list(body: string, ordered: boolean, start: number): string {
  //   return "?? :D ??";
  // }
  // listitem(text: string): string {
  //   return "?? :D ??";
  // }
  // checkbox(checked: boolean): string {
  //   return "?? :D ??";
  // }
  paragraph(text: string): string {
    return `\n${utils.sanitizeTextMode(text)}\n`;
  }
  // table(header: string, body: string): string {
  //   return "?? :D ??";
  // }
  // tablerow(content: string): string {
  //   return "?? :D ??";
  // }
  // tablecell(
  //   content: string,
  //   flags: {
  //     header: boolean;
  //     align: "center" | "left" | "right" | null;
  //   }
  // ): string {
  //   return "?? :D ??";
  // }
  strong(text: string): string {
    return ` \\textbf{${utils.sanitizeTextMode(text)}} `;
  }
  em(text: string): string {
    return ` \\emph{${utils.sanitizeTextMode(text)}} `;
  }
  codespan(code: string): string {
    const unescaped = utils.unescape(code);
    console.log(code, unescaped);
    return ` $ ${utils.latexize(unescaped)} $ `;
  }
  br(): string {
    return "\n\n";
  }
  del(text: string): string {
    return ` \\sout{${utils.sanitizeTextMode(text)}} `;
  }
  // link(
  //   href: string | null,
  //   title: string | null,
  //   text: string
  // ): string {
  //   return "?? :D ??";
  // }
  // image(
  //   href: string | null,
  //   title: string | null,
  //   text: string
  // ): string {
  //   return "?? :D ??";
  // }
  text(text: string): string {
    return ` ${utils.sanitizeTextMode(text)} `;
  }
}

const renderer = new CustomRenderer();

const walker = (token) => {
  console.log(token.raw);
  console.log(token.text);
};

export function mdToLatex(text: string) {
  const tokens = marked.lexer(text);
  (marked as any).walkTokens(tokens, walker);
  const result = marked.parser(tokens, {
    renderer: new CustomRenderer(),
  });
  return result;
}

console.log(
  mdToLatex(`
  # ACCEPTED
  Tí và Sửu mới tập code. Vì vậy, code để biên dịch được đã khó, code để bài nộp đạt yêu cầu còn khó hơn. Hôm nay, thầy Dần cho Tí và Sửu \`N\` bài tập. Bài tập thứ \`i\` có giá trị điểm bằng \`a[i]\`. Điểm số của mỗi người sẽ bằng tổng giá trị điểm của các bài tập mà người đó làm được. Vì không muốn bị phạt, Tí và Sửu tìm đến Mão nhờ sự trợ giúp.
  
  Mão đặt vào một chiếc hộp đen \`N\` lá thăm, ghi các số từ \`1\` đến \`N\` và không có hai lá thăm nào ghi cùng số. Tí và Sửu sẽ lần lượt bốc ngẫu nhiên một lá thăm trong chiếc hộp đen. Sau khi bốc được một lá thăm ghi số \`X\`, Mão sẽ code cho người rút được lá thăm này bài tập \`X\`. Tí và Sửu sẽ thay phiên nhau bốc các lá thăm cho đến khi chiếc hộp đen không còn lá thăm nào.
  Hãy tìm chênh lệch điểm tối đa giữa Tí và Sửu.
  
  ## Dữ liệu
  
  - Dòng đầu tiên chứa số nguyên \`N\` , là số lượng bài tập \`(1 <= N <= 50)\`.
  - Dòng thứ hai chứa \`N\` số nguyên \`a[1], a[2], ..., a[N] (1 <= a[i] <= 50)\`, là điểm số của các bài tập.
  
  ## Kết quả
  
  In ra chênh lệch điểm tối đa giữa Tí và Sửu.
  
  ## Ví dụ
  
  \`\`\`
  3
  1 2 3
  \`\`\`
  \`\`\`
  4
  \`\`\`
  
`)
);
