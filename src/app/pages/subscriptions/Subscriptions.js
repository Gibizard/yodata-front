import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {field: "id", headerName: "ID", flex: 1},
    {field: "userId", headerName: "ID пользователя", flex: 1},
    {field: "pageId", headerName: "ID страницы", flex: 1}
];
const rows = [
    {
        id: "1",
        userId: "1",
        pageId: "1"
    }
];

export default function Subscriptions() {
    return <DataGrid columns={columns} rows={rows} autoHeight="true" getRowId={row => row.id}/>
}