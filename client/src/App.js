import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";

import StateProject from "./context/projectsContext/StateProject";
import TasksContext from "./context/tasksContext/StateTasks";
import AlertContext from "./context/alertsContext/alertState";

function App() {
  return (
    <StateProject>
      <TasksContext>
        <AlertContext>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/new-account" component={NewAccount} />
              <Route exact path="/projects" component={Projects} />
            </Switch>
          </Router>
        </AlertContext>
      </TasksContext>
    </StateProject>
  );
}

export default App;
