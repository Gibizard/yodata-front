import * as React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {createUser, getAllUsers} from "../../../api/userApi";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";

const columns = [
    {field: "login", headerName: "Логин", flex: 1},
    {field: "firstName", headerName: "Имя", flex: 1},
    {field: "lastName", headerName: "Фамилия", flex: 1},
    {field: "telegramId", headerName: "Телеграм ID", flex: 1}
];

const validationScheme = yup.object({
    login: yup.string("Введите строку").required("Логин обязателен"),
    firstName: null, // TODO правила остальные
    lastName: null,
    password: null,
    telegramId: null
})

export default function Users() {
    const [users, setUsers] = useState([]);
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const [usersChangedToggle, setUsersChangedToggle] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            login: "",
            firstName: "",
            lastName: "",
            telegramId: "",
            password: ""
        },
        validationSchema: validationScheme,
        onSubmit: values => {
            createUser(values)
                .then(() => {
                    setDialogOpened(false);
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

    return (
        <>
            <DataGrid columns={columns} rows={users} autoHeight="true" getRowId={row => row.login}/>
            <br/>
            <Button variant="contained" color="secondary" onClick={handleDialogOpen}>Создать пользователя</Button>
            <Dialog
                open={dialogOpened}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {"Добавление пользователя"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            name="login"
                            label="Логин"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            error={formik.touched.login && Boolean(formik.errors.login)}
                            helperText={formik.touched.login && formik.errors.login}
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
        </>
    )
}