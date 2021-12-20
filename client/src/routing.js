import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'
import LoginPage from './Pages/Login/login';
// import RegisterPage from './Pages/Register';
import HomePage from './Pages/Home/home';
import EditPage from './Pages/Edit/edit';
import AddPage from './Pages/Add/add';
// import Page404 from './Pages/404/404';

export default function Routing(props) {
  return (
    <Switch>
      {/* <Route path="/coba" exact component={CobaPage} /> */}
      <Route path="/" exact component={() => {
        if (sessionStorage.getItem('token'))
          return <Redirect to={{
            pathname: '/home',
            state: {
              from: props.location
            }
          }}/>
        else 
          return <Redirect to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }}/>
      }} />
      <Route path="/login" exact component={LoginPage} />
      {/* <Route path="/register" exact component={RegisterPage} /> */}
      
      <ProtectedRoute path="/home" exact component={HomePage} />
      <ProtectedRoute path="/edit/:id" exact component={EditPage} />
      <ProtectedRoute path="/add" exact component={AddPage} />

      {/* <Route path="*" component={Page404} /> */}
    </Switch>
  )
}
