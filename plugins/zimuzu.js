
module.exports = function (steward) {
    const version = 3;
    const author = 'solobat';
    const name = 'zimuzu movie';
    const key = 'zm';
    const type = 'keyword';
    const icon = 'http://static.oksteward.com/icon-movie.png';
    const title = '在 zimuzu.io 查找电影';
    const subtitle = '按 Enter / Return 跳转到 zimuzu 网页';
    const commands = [{
        key,
        type,
        title,
        subtitle,
        icon,
        shiftKey: true
    }];

    function searchKeyword(keyword) {
        return steward.axios.get('http://www.zimuzu.io/search/api', {
            params: {
                keyword
            }
        });
    }

    function dataFormat(list) {
        return list.map(item => {
            const url = `http://www.zimuzu.io/resource/${item.itemid}`;

            return {
                key: 'url',
                universal: true,
                icon: item.poster || icon,
                title: item.title,
                desc: url,
                url
            };
        });
    }

    function onInput(query, command) {
        if (query) {
            return searchKeyword(query).then(results => {
                const resp = results.data;

                if (resp.status === 1 && results.data) {
                    return dataFormat(resp.data);
                } else {
                    return steward.util.getDefaultResult(command);
                }
            }).catch(() => {
                return steward.util.getDefaultResult(command);
            });
        } else {
            return steward.util.getDefaultResult(command);
        }
    }

    function onEnter(item, command, query, shiftKey, list) {

    }

    return {
        author,
        version,
        name,
        category: 'other',
        icon,
        title,
        commands,
        onInput,
        onEnter
    };
}
