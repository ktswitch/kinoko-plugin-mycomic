function main(doc) {
    // 找出網頁中所有的漫畫清單節點（通常在 ul 或特定的 class 區塊內）
    const items = doc.querySelectorAll('.manga-list-2 li, .manga-list li, .book-list li');
    const list = [];

    items.forEach(item => {
        const titleEl = item.querySelector('.title a, a.name, .manga-list-2-title a');
        const imgEl = item.querySelector('img');
        const updateEl = item.querySelector('.tip, .manga-list-2-tip, .latest-chapter');

        if (titleEl) {
            let cover = imgEl ? (imgEl.getAttribute('data-original') || imgEl.getAttribute('src')) : '';
            // 補全相對路徑網址
            if (cover && cover.startsWith('//')) cover = 'https:' + cover;

            let url = titleEl.getAttribute('href');
            if (url && url.startsWith('/')) url = 'https://manhuaren.com' + url;

            list.push({
                title: titleEl.textContent.trim(),
                cover: cover,
                url: url,
                subtitle: updateEl ? updateEl.textContent.trim() : ''
            });
        }
    });

    return {
        list: list
    };
}
