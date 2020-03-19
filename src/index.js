import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/app';

class App extends React.Component{
    render(){
        return(
            <div>Hello World</div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('app'));
