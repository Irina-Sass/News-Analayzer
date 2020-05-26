//  фукция возвращает количество упоминания ключевого слова в одном из полей (например, заголовок)  
function getNumberResultsArticle(query, arr, key) {
    const regexp = new RegExp(query, 'gi');
    if (!arr) return;
    return arr.reduce((count, item) => {
        const str = item[key];
        if (str) {
            const matchArr = str.match(regexp);
            if (matchArr) {
                count += matchArr.length;
            }
        }
        return count;
    }, 0);
}

export {getNumberResultsArticle};