import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {field: "id", headerName: "ID", flex: 1},
    {field: "name", headerName: "Имя страницы", flex: 1},
    {field: "url", headerName: "URL", flex: 1},
    {field: "parsingXPath", headerName: "XPath", flex: 1}
];
const rows = [
    {
        id: "1",
        name: "Важная страница",
        url: "google.com",
        parsingXPath: "here"
    }
];

export default function Pages() {
    return <DataGrid columns={columns} rows={rows} autoHeight="true" getRowId={row => row.id}/>
}