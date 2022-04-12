import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Frame from "./components/frame";
import Login from "./components/login";
import {Findpwd} from "./components/findpwd";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path={"/home"} component={Frame}></Route>
                <Route exact path={"/"} component={Login}></Route>
                <Route path={"/findPwd"} component={Findpwd}></Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
