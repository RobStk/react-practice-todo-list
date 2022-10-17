import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoList from './Components/ToDoList/ToDoList';
import ArraySynchronizer from './Modules/arrays-synchronizer';
import EventsManager from './Modules/events-manager';
import LocalStorageService from './Modules/local-storage-service';
import RemoteStorageService from './Modules/remote-storage-service';
import StorageManager from './Modules/storage-manager';
import TasksManager from "./Modules/tasks-manager";
import TimeService from './Modules/client-time-service';

const dbPath = "http://localhost:5000/tasks";

const storageEventsManager = new EventsManager();
const localService = new LocalStorageService("tasks");
const remoteService = new RemoteStorageService(dbPath);
const arraySynchronizer = new ArraySynchronizer();
const timeService = new TimeService();
const storageManager = new StorageManager(localService, remoteService, arraySynchronizer, timeService, storageEventsManager);
const tasksManager = new TasksManager(storageManager);

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);

root.render(<React.StrictMode>
    <ToDoList
        tasksManager={tasksManager}
        dataEventsManager={storageEventsManager}
        timeProvider={timeService}
    />
</React.StrictMode>);
