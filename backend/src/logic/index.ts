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
        index: !!this.lastCodeToken
          ? this.lastCodeToken.index + 1
          : 0,
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
    if (this.types.has("href")) {
      result.push("\\usepackage{hyperref}");
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

// console.log(
//   mdToLatex(`
// # ACCEPTED
// **Tí** và *Sửu* mới tập code. ~Vì vậy~, code để biên dịch được đã khó, code để bài nộp đạt yêu cầu còn khó hơn. Hôm nay, thầy Dần cho Tí và Sửu \`N\` bài tập. Bài tập thứ \`i\` có giá trị điểm bằng \`a[i]\`. Điểm số của mỗi người sẽ bằng tổng giá trị điểm của các bài tập mà người đó làm được. Vì không muốn bị phạt, Tí và Sửu tìm đến Mão nhờ sự trợ giúp.

// Mão đặt vào một chiếc hộp đen \`N\` lá thăm, ghi các số từ \`1\` đến \`N\` và không có hai lá thăm nào ghi cùng số. Tí và Sửu sẽ lần lượt bốc ngẫu nhiên một lá thăm trong chiếc hộp đen. Sau khi bốc được một lá thăm ghi số \`X\`, Mão sẽ code cho người rút được lá thăm này bài tập \`X\`. Tí và Sửu sẽ thay phiên nhau bốc các lá thăm cho đến khi chiếc hộp đen không còn lá thăm nào.
// Hãy tìm chênh lệch điểm tối đa giữa Tí và Sửu.

// ## Dữ liệu

// - Dòng đầu tiên chứa số nguyên \`N\`, là số lượng bài tập \`(1 <= N <= 50)\`.
// - Dòng thứ hai chứa \`N\` số nguyên \`a_1, a_2, ..., a_N (1 <= a_i <= 50)\`, là điểm số của các bài tập.

// ## Kết quả

// In ra chênh lệch điểm tối đa giữa Tí và Sửu.

// ## Ví dụ

// \`\`\`
// 1 2
// \`\`\`
// \`\`\`
// 3 4
// \`\`\`
// \`\`\`
// 5 6
// \`\`\`
// \`\`\`
// 7 8
// \`\`\`

// hmm

// hmm

// \`\`\`
// 9 0
// \`\`\`
// `)
// );
