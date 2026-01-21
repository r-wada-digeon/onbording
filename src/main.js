const contactForm = document.getElementById('contact');
const container = document.querySelector('.profile-container');
// フォームの元の内容を保存しておく（戻るボタン用）
const originalContent = container.innerHTML;

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const message = formData.get('message');

    // --- 1. 追加：バリデーション ---
    if (!name || !message) {
        alert('名前とメッセージを入力してくださいにゃ！');
        return; // ここで処理を終了（メールも送らないし画面も変えない）
    }

    // --- 2. 既存：メール送信 ---
    sendMail(name, formData.get('email'), message);

    // --- 3. 既存：完了画面表示 ---
    showSuccessMessage(name);
};

const sendMail = (name, email, message) => {
    const subject = encodeURIComponent(`お問い合わせ: ${name}`);
    const body = encodeURIComponent(`${message}\n\n返信先: ${email}`);
    window.location.href = `mailto:r-wada@digeon.co?subject=${subject}&body=${body}`;
};

const showSuccessMessage = (name) => {
    container.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 50px;">
            <h2>Thanks, ${name}!</h2>
            <p>メッセージを受け取りました。</p>
            <button id="backBtn">戻る</button>
        </div>
    `;

    // 戻るボタンにイベントを登録
    document.getElementById('backBtn').addEventListener('click', backToForm);
};

// --- 4. 追加：リロードしない「戻る」処理 ---
const backToForm = () => {
    container.innerHTML = originalContent;
    // 画面を書き換えるとイベントリスナーが消えるので、再度登録が必要
    const newForm = document.getElementById('contact');
    newForm.addEventListener('submit', handleSubmit);
};

contactForm.addEventListener('submit', handleSubmit);