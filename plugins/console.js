
module.exports = function (steward) {
    const version = 1;
    const author = 'solobat';
    const name = 'console';
    const key = '>';
    const type = 'keyword';
    const icon = 'https://i.imgur.com/Z2qwSNT.png';
    const title = 'console';
    const subtitle = 'execute javascript code';
    const commands = [{
        key,
        type,
        title,
        subtitle,
        icon
    }];

    const results = [];

    function dataFormat(list) {
        return list.map(item => {
            return {
                title: item,
                icon
            }
        }); 
    }

    function onInput(query, command) {
        if (results.length) {
            return Promise.resolve(dataFormat(results));
        } else {
            return steward.util.getDefaultResult(command);
        }
    }

    function onEnter(item, command, query, shiftKey, list) {
        if (query) {
            let result;

            try {
                result = eval(query);

                if (result === null) {
                    result = 'null';
                }

                if (result === undefined) {
                    result = 'undefined';
                }
            } catch (error) {
                result = error.message;
            } finally {
                results.unshift(result.toString());

                window.stewardApp.applyCommand('> ');
            }
        } else {
            steward.util.copyToClipboard(item.title, true);
        }

        return Promise.resolve(true);
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
