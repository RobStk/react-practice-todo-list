import React from "react";
import Button from "./Button";
import ColumnSectionStyle from "./Styles/ColumnSectionStyle";
import DropDownOptions from "./DropDownOptions";

class SortByPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.selectOption = this.selectOption.bind(this);

        this.state = {
            isMenuExpanded: false
        }
    }

    render() {
        const menuDisplay = this.state.isMenuExpanded ? "" : "none";
        return (
            <ColumnSectionStyle
                alignItems="left"
                gap="0"
                width="max-content"
            >
                <Button
                    txt={this.props.sortingProp}
                    fontSize={"medium"}
                    onClick={this.handleClick}
                    display={this.props.display}
                    width="max-content"
                />
                <DropDownOptions
                    display={menuDisplay}
                    options={this.props.sortOptions}
                    onClick={this.selectOption}
                />
            </ColumnSectionStyle>
        )
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    handleClick() {
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
}

export default SortByPanel;