export const getAllUsers = () => fetch("/yodata/admin/users", {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
    .then(response => response.json())

export const createUser = (user) => fetch("yodata/admin/users/add", {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(user)
})
    .then(response => response.text())

export const deleteUser = (login) => {
    return fetch("yodata/admin/users/delete/" + login, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(response => response.text())
}

export const updateUser = (user) => {
    fetch("yodata/admin/users/update/", {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.text())
}