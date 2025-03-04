const timestamp = 1559303056;
const date = new Date(timestamp * 1000); // 乘 1000 轉換為毫秒
console.log(date.toLocaleString()); // 根據時區顯示日期時間
