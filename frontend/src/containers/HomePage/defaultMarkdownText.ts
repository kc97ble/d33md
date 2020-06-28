export default `
# D33MD

\`'D33MD'\` là trang web cho phép viết đề bài bằng Markdown.

Bạn có thể **cuộn xuống trang bên dưới** để xem một số ví dụ thực tế.

## Tính năng

\`'D33MD'\` hỗ trợ hầu hết các tính năng của Markdown. Ngoài ra, \`'D33MD'\` còn cung cấp một số tính năng khác như cho phép chèn công thức toán học.

### Định dạng chữ

Giống như Markdown, bạn có thể **in đậm**, *in nghiêng*, ~~gạch ngang~~.

Tham khảo: [_tài liệu hướng dẫn Markdown_](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Code, công thức

Bạn có thể chèn code hoặc công thức toán học:

- Code trong chữ:
  - Dùng backtick + nháy đơn: \`'#include <bits/stdc++.h>'\`,
  - Hoặc backtick + ngoặc kép: \`"uses system"\`
- Chế độ \`\`thông minh'': \`(1 <= a_i <= 10^9+7)\`, \`O((N^2) log N)\`
- Chế độ \`$\\textrm{\\LaTeX}$\` toán học: \`$L' = {L}{\\sqrt{1-\\frac{v^2}{c^2}}}$\`

## Xem trước, xuất bản

1. Nhấn nút \`"Refresh"\` để xem trước.
2. Nhấn nút \`"Export"\` để tải về.

## Tác giả

Nguyễn Tiến Trung Kiên - 29/06/2020

\`'#36hAppChallenge'\` \`'#Kc97bleAppChallenges'\`

---

# 511

Fox Ciel và Toastman chơi một trò chơi có tên là \`\`511''. Trò chơi gồm có \`N\` quân bài, mỗi quân
bài chứa một số nguyên trong đoạn từ 0 đến 511, cùng một bảng điện tử ban đầu chứa số 0. Trò
chơi diễn ra như sau:
- Hai người chơi luân phiên nhau. Fox Ciel chơi trước.
- Ở lượt chơi của mình, người chơi sẽ chọn một quân bài chưa được dùng. Nếu không còn
quân bài nào, người chơi đó thua.
- Nếu như quân bài mà người chơi chọn là \`x\`, và số đang hiện trên bảng điện tử là \`y\`, thì sau
lượt chơi, bảng điện tử sẽ hiện số \`y\` \`"OR"\` \`x\`. Nếu sau lượt này, bảng điện tử hiện số 511, người
chơi đó thua.
- Nếu bảng điện tử chưa hiện số 511, quân bài được chọn sẽ bị bỏ đi và người kia tiếp tục
lượt chơi.

Hãy viết chương trình xác định người thắng, nếu Fox Ciel và Toastman đều chơi tối ưu.

## Dữ liệu

- Dòng đầu tiên chứa số nguyên dương \`N\` (\`1 <= N <= 50\`) là số quân bài.
- Dòng tiếp theo chứa \`N\` số nguyên nằm trong khoảng từ 0 đến 511, là giá trị của các quân bài.

## Kết quả

- In ra \`"FoxCiel"\` (không có dấu cách) hoặc \`"Toastman"\` tương ứng với người chiến thắng.

Ví dụ

\`\`\`
5
3 5 7 9 510
\`\`\`

\`\`\`
FoxCiel
\`\`\`

\`\`\`
4
0 0 0 0
\`\`\`

\`\`\`
Toastman
\`\`\`

\`\`\`
4
5 58 192 256
\`\`\`

\`\`\`
FoxCiel
\`\`\`

Ở ví dụ thứ nhất, Fox Ciel chọn số 510, và bất kể Toastman chọn ra sao ở lượt tiếp theo, bảng
điện tử vẫn hiện 511.

Ở ví dụ thứ hai, bảng điện tử luôn hiện số 0. Sau hai lượt của mỗi người, Fox Ciel không còn bài
và thua.
`.trim();
