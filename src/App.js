import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'
import Main from './components/Main/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import CreateOrder from './components/CreateOrder/CreateOrder'
import Orders from './components/Orders/Orders'
import Order from './components/Order/Order'

const App = () => {
  const { currentUser } = useAuth()

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/signup'>
          {currentUser?.email ? <Redirect to='/' /> : <Signup />}
        </Route>
        <Route path='/login'>
          {currentUser?.email ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/create-order'>
          {currentUser?.email ? <CreateOrder /> : <Redirect to='/' />}
        </Route>
        <Route path='/orders'>
          {currentUser?.email ? <Orders /> : <Redirect to='/' />}
        </Route>
        <Route path='/order/:id'>
          {currentUser?.email ? <Order /> : <Redirect to='/' />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
