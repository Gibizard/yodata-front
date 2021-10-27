import * as React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {createUser, deleteUser, getAllUsers, updateUser} from "../../../api/userApi";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";

const columns = [
    {field: "login", headerName: "Логин", flex: 1},
    {field: "firstName", headerName: "Имя", flex: 1},
    {field: "lastName", headerName: "Фамилия", flex: 1},
    {field: "password", headerName: "Пароль", flex: 1, editable: true},
    {field: "telegramId", headerName: "Телеграм ID", flex: 1},
    {field: "role", headerName: "Роль", flex: 1, editable: true}
];

const validationScheme = yup.object({
    login: yup.string("Введите строку").required("Логин обязателен"),
    firstName: yup.string("Введите строку").required("Имя обязательно"),
    lastName: yup.string("Введите строку").required("Фамилия обязательна"),
    password: yup.string("Введите строку").required("Пароль обязателен"),
    telegramId: yup.string("Введите строку").required("Telegram ID обязателен"),
    role: yup.string("Введите строку").required("Роль обязательна").matches(/(USER|ADMIN)/)
})

const deleteUserValidationScheme = yup.object({
    login: yup.string("Введите строку").required("Логин обязателен")
})

export default function Users() {
    const [users, setUsers] = useState([]);
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const [deleteDialogOpened, setDeleteDialogOpened] = React.useState(false);
    const [usersChangedToggle, setUsersChangedToggle] = React.useState(false);
    const createUserFormik = useFormik({
        initialValues: {
            login: "",
            firstName: "",
            lastName: "",
            telegramId: "",
            password: "",
            role: ""
        },
        validationSchema: validationScheme,
        onSubmit: value => {
            createUser(value)
                .then(() => {
                    setDialogOpened(false);
                    setUsersChangedToggle(!usersChangedToggle);
                })
                .catch(err => console.error(err))
        }
    })
    const deleteUserFormik = useFormik({
        initialValues: {
            login: ""
        },
        validationSchema: deleteUserValidationScheme,
        onSubmit: values => {
            deleteUser(values.login)
                .then(() => {
                    setDeleteDialogOpened(false);
                    setUsersChangedToggle(!usersChangedToggle);
                })
                .catch(err => console.error(err))
        }
    })

    const handleDialogOpen = () => {
        setDialogOpened(true);
    };

    const handleDialogClose = () => {
        setDialogOpened(false);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpened(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpened(false);
    };

    useEffect(() => {
        getAllUsers()
            .then(users => {
                if (Array.isArray(users)) {
                    setUsers(users)
                } else {
                    return Promise.reject("Users are not received. " + JSON.stringify(users))
                }
            })
            .catch(err => console.error(err))
    }, [usersChangedToggle])

    function handleRowsModelChange() {
        this.validationSchema = validationScheme;
    }

    function handleRowUpdate(row) {
         updateUser(row);
        //updateUser(super.state.users.find(user => user.login === row));
        setUsersChangedToggle(!usersChangedToggle);
    }

    return (
        <>
            <DataGrid editMode="row" columns={columns} rows={users} autoHeight={true} getRowId={row => row.login}
                      onEditRowsModelChange={handleRowsModelChange} onRowEditCommit={handleRowUpdate}/>
            <br/>
            <Button variant="contained" color="secondary" onClick={handleDialogOpen}>Создать пользователя</Button>
            <Button variant="contained" color="primary" onClick={handleDeleteDialogOpen}>Удалить пользователя</Button>
            <Dialog
                open={dialogOpened}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={createUserFormik.handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {"Добавление пользователя"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            name="login"
                            label="Логин"
                            value={createUserFormik.values.login}
                            onChange={createUserFormik.handleChange}
                            error={createUserFormik.touched.login && Boolean(createUserFormik.errors.login)}
                            helperText={createUserFormik.touched.login && createUserFormik.errors.login}
                        />
                        <TextField
                            fullWidth
                            name="firstName"
                            label="Имя"
                            value={createUserFormik.values.firstName}
                            onChange={createUserFormik.handleChange}
                            error={createUserFormik.touched.firstName && Boolean(createUserFormik.errors.firstName)}
                            helperText={createUserFormik.touched.firstName && createUserFormik.errors.firstName}
                        />
                        <TextField
                            fullWidth
                            name="lastName"
                            label="Фамилия"
                            value={createUserFormik.values.lastName}
                            onChange={createUserFormik.handleChange}
                            error={createUserFormik.touched.lastName && Boolean(createUserFormik.errors.lastName)}
                            helperText={createUserFormik.touched.lastName && createUserFormik.errors.lastName}
                        />
                        <TextField
                            fullWidth
                            name="password"
                            label="Пароль"
                            value={createUserFormik.values.password}
                            onChange={createUserFormik.handleChange}
                            error={createUserFormik.touched.password && Boolean(createUserFormik.errors.password)}
                            helperText={createUserFormik.touched.password && createUserFormik.errors.password}
                        />
                        <TextField
                            fullWidth
                            name="telegramId"
                            label="Telegram ID"
                            value={createUserFormik.values.telegramId}
                            onChange={createUserFormik.handleChange}
                            error={createUserFormik.touched.telegramId && Boolean(createUserFormik.errors.telegramId)}
                            helperText={createUserFormik.touched.telegramId && createUserFormik.errors.telegramId}
                        />
                        <TextField
                            fullWidth
                            name="role"
                            label="Роль пользователя"
                            placeholder="USER/ADMIN"
                            value={createUserFormik.values.role}
                            onChange={createUserFormik.handleChange}
                            error={createUserFormik.touched.role && Boolean(createUserFormik.errors.role)}
                            helperText={createUserFormik.touched.role && createUserFormik.errors.role}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Отмена</Button>
                        <Button type="submit" variant="contained" color="secondary" autoFocus>
                            Создать
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog
                open={deleteDialogOpened}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={deleteUserFormik.handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {"Удаление пользователя"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            name="login"
                            label="Логин"
                            value={deleteUserFormik.values.login}
                            onChange={deleteUserFormik.handleChange}
                            error={deleteUserFormik.touched.login && Boolean(deleteUserFormik.errors.login)}
                            helperText={deleteUserFormik.touched.login && deleteUserFormik.errors.login}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Отмена</Button>
                        <Button type="submit" variant="contained" color="secondary" autoFocus>
                            Удалить
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}