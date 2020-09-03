const fileFilter = (mimetype: string, ...allowed_types: string[]) => {
    return mimetype.match(new RegExp(allowed_types.join('|')))
};