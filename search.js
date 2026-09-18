function main(doc) {
    // 搜尋結果的 HTML 結構通常與分類列表類似
    const items = doc.querySelectorAll('.manga-list-2 li, .search-list li, .book-list li');
    const list = [];

    items.forEach(item => {
        const titleEl = item.querySelector('.title a, a.name, .manga-list-2-title a');
        const imgEl = item.querySelector('img');
        const updateEl = item.querySelector('.tip, .manga-list-2-tip');

        if (titleEl) {
            let cover = imgEl ? (imgEl.getAttribute('data-original') || imgEl.getAttribute('src')) : '';
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
