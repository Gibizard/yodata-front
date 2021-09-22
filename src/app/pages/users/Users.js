import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {field: "login", headerName: "Логин", flex: 1},
    {field: "firstName", headerName: "Имя", flex: 1},
    {field: "lastName", headerName: "Фамилия", flex: 1},
    {field: "telegramId", headerName: "Телеграм ID", flex: 1}
];
const rows = [
    {
        login: "user",
        firstName: "Дмитрий",
        lastName: "Гиба",
        telegramId: "test"
    }
];

export default function Users() {
    return <DataGrid columns={columns} rows={rows} autoHeight="true" getRowId={row => row.login}/>
}