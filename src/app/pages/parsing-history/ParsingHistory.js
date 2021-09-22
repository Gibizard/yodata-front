import {DataGrid} from "@mui/x-data-grid";

const columns = [
    {field: "id", headerName: "ID", flex: 1},
    {field: "pageId", headerName: "ID страницы", flex: 1},
    {field: "parsingDateTime", headerName: "Время парсинга", flex: 1},
    {field: "result", headerName: "Результат парсинга", flex: 1},
    {field: "sent", headerName: "Статус отправки", flex: 1}
];
const rows = [
    {
        id: "1",
        pageId: "1",
        parsingDateTime: "вчера",
        result: "хороший",
        sent: "да уже сто раз отправили",
    }
];

export default function ParsingHistory() {
    return <DataGrid columns={columns} rows={rows} autoHeight="true" getRowId={row => row.id}/>
}