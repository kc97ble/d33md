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

---

# CARDRM

\`N\` quân bài được đặt trên mặt bàn thành một dãy từ trái qua phải. Mỗi quân bài chứa ba chữ
cái in hoa đôi một phân biệt.

Ta gọi độ tương thích của hai lá bài là số lượng chữ cái cùng xuất hiện trong cả hai lá. Ví dụ:

- \`'ABC'\` và \`'ACD'\` có độ tương thích là 2
- \`'ABC'\` và \`'DFE'\` có độ tương thích là 0

Bạn muốn lấy đi một số lá bài. Điều kiện để lấy đi một lá bài \`X\` là như sau:

- \`X\` không phải lá bài đầu tiên hay lá bài cuối cùng.
- Độ tương thích của lá bài kề trái \`X\` và lá bài kề phải \`X\` phải lớn hơn hoặc bằng 2.

Sau khi lấy đi lá bài \`X\`, hai lá bài kề \`X\` trước đó trở thành kề với nhau.

Xác định số lượng lá bài tối đa bạn có thể lấy ra. Lưu ý: các lá bài được xếp thành một dãy, nên
lá bài đầu tiên và cuối cùng không được tính là kề nhau.

## Dữ liệu

- Dòng đầu tiên chứa số nguyên dương \`N\`, là độ dài của dãy bài (\`1 <= N <= 50\`).
- \`N\` dòng tiếp theo, mỗi dòng chứa một xâu gồm ba chữ cái in hoa phân biệt, mô tả một lá
bài.

## Kết quả
- In ra số lá bài lớn nhất có thể được lấy ra.

## Ví dụ

\`\`\`
5
ABC
CDE
ABC
CDE
ABC
\`\`\`

\`\`\`
3
\`\`\`

\`\`\`
5
ADR
FDB
ABC
CDE
ABD
\`\`\`

\`\`\`
3
\`\`\`

Cách lấy tối ưu trong ví dụ đầu tiên: lấy lá bài số 2, lấy lá bài số 4 (theo đánh số ban đầu), lấy
lá bài số 3.

`.trim();
