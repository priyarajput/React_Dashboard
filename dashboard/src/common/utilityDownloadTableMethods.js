export function joinAll(data) {
    if (data === null) {
                data = [];
            } else if (data.length) {
                var arr = data.length > 0 ? data : null;
                var str = arr.join();
                str = replaceAll(str, " ")
            }
    return str;
}

export function replaceAll(str, replacement) {
    return str.replace((/([\/\,\;\n\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g), replacement);
}