import React from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Alumnos} from './component/Alumnos'
import {Navbar} from './component/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-3">
        <Switch>
          <Route path="/" component={Alumnos} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
