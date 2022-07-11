/** Remove line-breaks and truncate the text*/
export const truncate = (text: string, length: number) => {
    let result = text.trim().split('\n')[0].slice(0, length);

    if (length < text.length) result += '...'

    return result;
}