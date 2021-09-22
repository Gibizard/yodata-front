import * as React from 'react';
import {CssBaseline, styled} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppHeader from "./AppHeader";
import AppHeaderDivider from "./AppHeaderDivider";
import {Route, Switch} from "react-router";
import Landing from "./pages/landing/Landing";
import Users from "./pages/users/Users";
import NotFound from "./pages/not-found/NotFound";
import Pages from "./pages/pages/Pages";
import Subscriptions from "./pages/subscriptions/Subscriptions";
import ParsingHistory from "./pages/parsing-history/ParsingHistory";

function App() {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppHeader/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <AppHeaderDivider/>
                <Switch>
                    <Route path="/login" exact/>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/users" exact component={Users}/>
                    <Route path="/pages" exact component={Pages}/>
                    <Route path="/subscriptions" exact component={Subscriptions}/>
                    <Route path="/parsing-history" exact component={ParsingHistory}/>
                    <Route path="/" component={NotFound}/>
                </Switch>
            </Box>
        </Box>
    )
}

export default App;
