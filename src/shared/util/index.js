export const tagFormatter = tag => {
    const map = {
        ask: '问答',
        share: '分享',
        job: '招聘',
        good: '精华',
    };
    if (map[tag]) return map[tag];
    else return '其他';
};
