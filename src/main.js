// HTMLに追加した 'profile-container' をここで探します
const container = document.querySelector('.profile-container'); 
const originalContent = container.innerHTML;

// 注意: 初期化時に container が見つからないとエラーになるのでチェック
if (!container) {
    console.error("エラー: .profile-container が見つかりません！HTMLを確認してください。");
}

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const message = formData.get('message');

    // バリデーション
    if (!name || !message) {
        alert('名前とメッセージを入力してくださいにゃ！');
        return;
    }

    sendMail(name, formData.get('email'), message);
    showSuccessMessage(name);
};

const sendMail = (name, email, message) => {
    const subject = encodeURIComponent(`お問い合わせ: ${name}`);
    const body = encodeURIComponent(`${message}\n\n返信先: ${email}`);
    window.location.href = `mailto:r-wada@digeon.co?subject=${subject}&body=${body}`;
};

const showSuccessMessage = (name) => {
    // 修正: Tailwind CSS のクラスを使ってデザイン
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center animate-pulse">
            <h2 class="text-2xl font-bold text-[#28a745] mb-4">Thanks, ${name}!</h2>
            <p class="text-gray-600 mb-8">メッセージを受け取りました。</p>
            <button id="backBtn" class="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors">
                戻る
            </button>
        </div>
    `;

    document.getElementById('backBtn').addEventListener('click', backToForm);
};

const backToForm = () => {
    container.innerHTML = originalContent;
    // フォームが復活したので、イベントリスナーを再登録
    const newForm = document.getElementById('contact');
    newForm.addEventListener('submit', handleSubmit);
};

// 初回のイベント登録
const contactForm = document.getElementById('contact');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}