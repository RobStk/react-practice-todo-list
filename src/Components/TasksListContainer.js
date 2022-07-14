import React from "react";
import TasksRowsContainerStyle from "./Styles/TasksRowsContainerStyle";
import Task from "./Task";

class TasksListContainer extends React.Component {
    render() {
        const tasksList = this.props.tasksArr.map((task) =>
            task = (
                <Task
                    title={task.title}
                    done={task.done}
                    key={task.id}
                />
            )
        );

        return (
            <TasksRowsContainerStyle>
                {tasksList}
            </TasksRowsContainerStyle>
        );
    }
}

export default TasksListContainer;