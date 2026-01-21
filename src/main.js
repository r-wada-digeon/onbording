const contactForm = document.getElementById('contact');
contactForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const name = f.name.value || '匿名';
    const email = f.email.value || '';
    const message = f.message.value || '';
    const subject = encodeURIComponent('お問い合わせ: ' + name);
    const body = encodeURIComponent(message + '\n\n返信先: ' + email);
    window.location.href = 'mailto:r-wada@digeon.co?subject=' + subject + '&body=' + body;
}

//1. 変数に要素を代入(const)
const container = document.querySelector('.profile-container');

// 2. イベントを待機
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // デフォルト動作停止

    // 3. 入力値を取得
    const name = document.getElementById('name').value;

    // 4. テンプレートリテラルで画面を書き換え (SPAの基礎)
    container.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h2>Thanks, ${name}!</h2>
            <p>メッセージを受け取りました。</p>
            <button onclick="location.reload()">戻る</button>
        </div>
    `;
});