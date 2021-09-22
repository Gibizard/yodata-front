export const getAllUsers = () => fetch("/yodata/admin/users", {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
    .then(response => response.json())

export const createUser = (users) => fetch("yodata/admin/users/add", {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(users)
})
    .then(response => response.text())