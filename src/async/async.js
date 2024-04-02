export function query(path, queryData) {
    return fetch(path, {
        method: 'post',
        body: queryData,
    })
}