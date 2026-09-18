function main(doc) {
    const pages = [];
    const htmlText = doc.documentElement.innerHTML;

    // 嘗試從漫畫人特有的網頁加密變數中提取圖片陣列
    // 漫畫人網頁常將資料存放在 `newImgs` 或 `chapterImages` 變數中
    const match = htmlText.match(/var\s+(?:newImgs|chapterImages|mangaPages)\s*=\s*(\[[^\]]+\])/) 
               || htmlText.match(/imgFiles\s*=\s*(\[[^\]]+\])/);

    if (match && match[1]) {
        try {
            // 解析出網址陣列
            const imgArray = JSON.parse(match[1].replace(/'/g, '"'));
            imgArray.forEach(img => {
                let imgUrl = img;
                if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
                pages.push({
                    url: imgUrl,
                    // 填入漫畫人的 Headers，防止被阻擋圖片
                    headers: {
                        "Referer": "https://manhuaren.com",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                    }
                });
            });
        } catch (e) {
            // 解析失敗時的備用機制：嘗試直接抓取網頁上的 img 標籤
            const imgs = doc.querySelectorAll('#chapterImages img, .manga-image');
            imgs.forEach(img => {
                let imgUrl = img.getAttribute('data-original') || img.getAttribute('src');
                if (imgUrl) {
                    if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
                    pages.push({ url: imgUrl, headers: { "Referer": "https://manhuaren.com" } });
                }
            });
        }
    }

    return {
        pages: pages
    };
}
