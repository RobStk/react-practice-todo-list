import React from "react";
import Button from "../Button/Button";
import ColumnSectionStyle from "../../Styles/ColumnSectionStyle";
import DropDownOptions from "../DropDownOptions/DropDownOptions";

class SortByPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpansion = this.handleExpansion.bind(this);
        this.selectOption = this.selectOption.bind(this);

        this.handleDocumentClick = this.handleDocumentClick.bind(this);

        this.state = {
            isMenuExpanded: false
        }

        this.sortByButtonDOM = React.createRef();
        this.menuDOM = React.createRef();
        this.DOM = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("click", this.handleDocumentClick);
    }

    render() {
        const menuDisplay = this.state.isMenuExpanded ? "" : "none";
        return (
            <ColumnSectionStyle
                alignItems="left"
                gap="0"
                width="max-content"
                ref={this.DOM}
            >
                <Button
                    txt={this.props.sortingProp}
                    fontSize={"small"}
                    onClick={this.handleExpansion}
                    display={this.props.display}
                    width="max-content"
                    ref={this.sortByButtonDOM}
                    backgroundColor="background-stage1"
                />
                <DropDownOptions
                    display={menuDisplay}
                    options={this.props.sortOptions}
                    onClick={this.selectOption}
                    ref={this.menuDOM}
                />
            </ColumnSectionStyle>
        )
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    handleExpansion() {
        const isMenuExpanded = this.state.isMenuExpanded;
        this.setState({
            isMenuExpanded: !isMenuExpanded
        });
    }

    selectOption(option) {
        this.setState({
            isMenuExpanded: false
        });
        this.props.onOptionSelect && this.props.onOptionSelect(option);
    }

    handleDocumentClick(event) {
        this.DOM.current && !this.DOM.current.contains(event.target) && this.setState({ isMenuExpanded: false });
    }
}

export default SortByPanel;