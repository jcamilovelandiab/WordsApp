import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Room from "./routes/Room/Room";
import Game from "./routes/Game/Game";
import SignIn from "./routes/SignIn/SignIn";
import SignUp from "./routes/SignUp/SignUp";
import Home from "./routes/Home/Home";
import {Component} from 'react';

class App extends Component {
  render() {

    const HomeView = () => (
      <React.Fragment>
        {localStorage.getItem('loggedUser') ? <Home/>: <SignIn />}
      </React.Fragment>
    );

    const RoomView = () => (
      <React.Fragment>
        {localStorage.getItem('loggedUser') ? <Room /> : <SignIn />}
      </React.Fragment>
    );

    const SignInView = () => (
      <React.Fragment>
        {localStorage.getItem('loggedUser') ?<HomeView /> : <SignIn />}
      </React.Fragment>
    );

    const SignUpView = () => (
      <React.Fragment>
        {localStorage.getItem('loggedUser') ? <HomeView /> : <SignUp />}
      </React.Fragment>
    );

    const GameView = () => (
      <React.Fragment>
        {localStorage.getItem('loggedUser')? <Game /> : <SignInView />}
      </React.Fragment>
    );

    return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInView}/>
          <Route path="/signin" exact component={SignInView}/>
          <Route path="/signup" exact component={SignUpView}/>
          <Route path="/home" exact component={HomeView} />
          <Route path="/room/:roomID" component={RoomView} />
          <Route path="/game/:gameID" component={GameView} />
        </Switch>
      </BrowserRouter>
    </div>);
  }
}

export default App;
