import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import NotFound from '../pages/NotFound'

const Routes = props => (
  <div className="routes">
    <Switch>
      {routes.map(({exact, path, component}, i) => (
        <Route exact={exact} path={path} component={component} key={i} />
      ))}
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </div>
)

export default Routes