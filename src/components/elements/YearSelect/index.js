import React, { Component, Fragment } from 'react';


export default class YearSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSelector: this.props.showSelector
        };
    }

    
    render() {
       
        const { showSelector } = this.state;
        console.log(this.state);
        let style = (showSelector) ? {display:"block"} : {display:"none"};
    
        return (
            <Fragment>
                {
                    (showSelector)
                    ?
                        <div className="year-picker"  >
                            Select Year
                         </div> 
                    :
                        null
                }
            </Fragment>

        );
    }
}
