import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login'
import Table from './components/table'
import AddUser from './components/addUser'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/allUsers" component={Table}></Route>
          <Route exact path="/addUser" component={AddUser}></Route>
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;
