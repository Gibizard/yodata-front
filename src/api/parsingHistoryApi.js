export const getAllParsingResults = () => fetch("/yodata/admin/parsingResults", {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
    .then(response => response.json())

export const clearParsingHistory = () => fetch("/yodata/admin/parsingResults/clear", {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
    .then(response => response.text())