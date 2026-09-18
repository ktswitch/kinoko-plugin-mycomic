function main(doc) {
    // 1. 抓取基本書籍資訊
    const titleEl = doc.querySelector('.manga-detail-title, .detail-main-title');
    const authorEl = doc.querySelector('.manga-detail-author a, .detail-main-author');
    const introEl = doc.querySelector('.manga-detail-description, .detail-selector-content p');
    const coverEl = doc.querySelector('.manga-detail-cover img, .detail-main-cover img');

    let cover = coverEl ? (coverEl.getAttribute('data-original') || coverEl.getAttribute('src')) : '';
    if (cover && cover.startsWith('//')) cover = 'https:' + cover;

    // 2. 抓取章列表
    const chapterLinks = doc.querySelectorAll('.detail-list-form-con a, .manga-detail-chapter-list a');
    const chapters = [];

    chapterLinks.forEach(link => {
        let url = link.getAttribute('href');
        if (url && url.startsWith('/')) url = 'https://manhuaren.com' + url;

        chapters.push({
            title: link.textContent.trim(),
            url: url
        });
    });

    // 漫畫人網頁的章節通常是倒序（最新在上面），我們需要把它反轉讓 App 從第一話開始讀
    chapters.reverse();

    return {
        title: titleEl ? titleEl.textContent.trim() : '',
        cover: cover,
        author: authorEl ? authorEl.textContent.trim() : '未知',
        intro: introEl ? introEl.textContent.trim() : '',
        chapters: chapters
    };
}
