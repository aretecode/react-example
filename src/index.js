import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

function decorator(target) {
  return class Canada extends target {}
}

@decorator
class Eh extends React.Component {
  state = {}
}

ReactDOM.render(<App />, document.getElementById('root'));
