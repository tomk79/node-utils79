/**
 * 文字列を指定された桁数になるように埋める
 */
module.exports = function(input, pad_length, pad_string = ' ', pad_type = 'right'){
    if (input === undefined) {
        return null;
    }
    if (input === null) {
        return null;
    }
    if (typeof(input) !== 'string') {
        input = String(input);
    }

    let output = input;

    if (input.length >= pad_length) {
        return input;
    }

    const padding = Array(pad_length + 1).join(pad_string).substr(0, pad_length - input.length);

    switch (pad_type) {
        case 'left':
            output = padding + input;
            break;
        case 'both':
            const halfLength = Math.floor(padding.length / 2);
            output = padding.substr(0, halfLength) + input + padding.substr(halfLength);
            break;
        case 'right':
        default:
            output = input + padding;
            break;
    }

    return output;
}
