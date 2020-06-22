import marked from "marked";
import CustomRenderer from "./CustomRenderer";

class Preprocessor {
  types = new Set();

  walker = (token) => {
    this.types.add(token.type);
    if (token.type === "code") {
      console.log(token);
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
}

export function mdToLatex(text: string) {
  const renderer = new CustomRenderer();
  const preprocessor = new Preprocessor();

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

console.log(
  mdToLatex(`
# ACCEPTED
**Tí** và *Sửu* mới tập code. ~Vì vậy~, code để biên dịch được đã khó, code để bài nộp đạt yêu cầu còn khó hơn. Hôm nay, thầy Dần cho Tí và Sửu \`N\` bài tập. Bài tập thứ \`i\` có giá trị điểm bằng \`a[i]\`. Điểm số của mỗi người sẽ bằng tổng giá trị điểm của các bài tập mà người đó làm được. Vì không muốn bị phạt, Tí và Sửu tìm đến Mão nhờ sự trợ giúp.

Mão đặt vào một chiếc hộp đen \`N\` lá thăm, ghi các số từ \`1\` đến \`N\` và không có hai lá thăm nào ghi cùng số. Tí và Sửu sẽ lần lượt bốc ngẫu nhiên một lá thăm trong chiếc hộp đen. Sau khi bốc được một lá thăm ghi số \`X\`, Mão sẽ code cho người rút được lá thăm này bài tập \`X\`. Tí và Sửu sẽ thay phiên nhau bốc các lá thăm cho đến khi chiếc hộp đen không còn lá thăm nào.
Hãy tìm chênh lệch điểm tối đa giữa Tí và Sửu.

## Dữ liệu

- Dòng đầu tiên chứa số nguyên \`N\`, là số lượng bài tập \`(1 <= N <= 50)\`.
- Dòng thứ hai chứa \`N\` số nguyên \`a[1], a[2], ..., a[N] (1 <= a[i] <= 50)\`, là điểm số của các bài tập.

## Kết quả

In ra chênh lệch điểm tối đa giữa Tí và Sửu.

## Ví dụ

\`\`\`
3$
1 > 2 > 3
\`\`\`
\`\`\`
4
\`\`\`
  
`)
);
