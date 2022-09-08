import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToDoList } from './Components/ToDoList/ToDoList';

const dbPath = "http://localhost:5000/tasks";

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode><ToDoList dbPath={dbPath} /></React.StrictMode>);
