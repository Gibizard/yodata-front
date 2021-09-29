import {DataGrid} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import * as React from "react";
import {clearParsingHistory, getAllParsingResults} from "../../../api/parsingHistoryApi";
import {useEffect, useState} from "react";

const columns = [
    {field: "id", headerName: "ID", flex: 1},
    {field: "pageId", headerName: "ID страницы", flex: 1},
    {field: "parsingDateTime", headerName: "Время парсинга", flex: 1},
    {field: "result", headerName: "Результат парсинга", flex: 1},
    {field: "sent", headerName: "Статус отправки", flex: 1}
];

export default function ParsingHistory() {
    const [history, setHistory] = useState([]);
    const [parsingResultsChangedToggle, setParsingResultsChangedToggle] = React.useState(false);

    useEffect(() => {
        getAllParsingResults()
            .then(history => {
                if (Array.isArray(history)) {
                    setHistory(history)
                } else {
                    return Promise.reject("History is not received. " + JSON.stringify(history))
                }
            })
            .catch(err => console.error(err))
    }, [parsingResultsChangedToggle])

    function clear() {
        clearParsingHistory()
            .then(() => {
                setParsingResultsChangedToggle(!parsingResultsChangedToggle);
            });
    }

    return (
        <>
            <DataGrid columns={columns} rows={history} autoHeight="true" getRowId={row => row.id}/>
            <br/>
            <Button variant="contained" color="primary" onClick={clear}>Очистить историю парсинга</Button>
        </>
    )
}