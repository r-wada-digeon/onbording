const form = document.getElementById('contactForm');
form.addEventListener('submit', handleSubmit);

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