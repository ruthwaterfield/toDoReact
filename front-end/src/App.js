import React, {Component} from 'react';
import logo from './logo.svg';
import NewTask from "./NewTask";
import UncompletedTasks from "./UncompletedTasks";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Get Stuff Done</h1>
                </header>
                <NewTask/>
                <UncompletedTasks/>
                <footer className="navbar-fixed-bottom">
                    <p>What have you done today to make me feel proud?</p>
                </footer>
            </div>
        );
    }
}

export default App;
