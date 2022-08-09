import React from "react";
import TaskContentStyle from "./Styles/TaskContentStyle";

class TaskContent extends React.Component {
    constructor(props) {
        super(props);
        this.DOM = React.createRef();
    }

    getSnapshotBeforeUpdate() {
        const scrollHeight = this.DOM.current.scrollHeight;
        return { scrollHeight: scrollHeight };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.DOM.current.style.height = null
        const currentScrollHeight = this.DOM.current.scrollHeight;
        this.DOM.current.style.height = snapshot.scrollHeight + 'px';
        requestAnimationFrame(() => {
            this.DOM.current.style.height = currentScrollHeight + 'px';
        });
        const height = this.DOM.current.scrollHeight + 'px';
        this.props.onUpdate(height);
    }

    render() {
        return (
            <TaskContentStyle
                ref={this.DOM}
                isExpanded={this.props.isExpanded}
            >
                {this.props.content}
            </TaskContentStyle>
        )
    }


}

export default TaskContent;