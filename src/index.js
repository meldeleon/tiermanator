import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card } from "react-bulma-components";
import { useDrag } from 'react-dnd';
import { Viewer } from './Viewer'



ReactDOM.render(
  <App />, document.getElementById('root')
);

serviceWorker.unregister();
