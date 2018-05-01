import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css'
import Header from './components/common/Header'
import List from './components/list/List'
import NotFound from './components/notFound/NotFound'
import Detail from './components/detail/Detail'



const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>

                <Switch>
                    <Route path="/" component={List} exact/>
                    <Route path="/currency/:id" component={Detail}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>

        </BrowserRouter>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);
