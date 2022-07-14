import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToDoList } from './Components/ToDoList';

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode><ToDoList /></React.StrictMode>);
