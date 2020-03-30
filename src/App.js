import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import CountryList from "./components/country/CountryList";
import CountryDetail from "./components/country/CountryDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={CountryList}/>
          <Route path="/details/:country_slug" component={CountryDetail}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
