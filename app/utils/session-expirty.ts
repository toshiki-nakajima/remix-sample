export function getSessionExpirationDate(): Date {
    // 現在の日本時間を取得
    const jstNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

    // 今日の日本時間24時（= 翌日の0時）に設定
    const midnightJST = new Date(jstNow);
    midnightJST.setHours(24, 0, 0, 0); // 24時に設定すると自動的に翌日になる

    return midnightJST;
}