import React from 'react';
import Select from 'react-select';

function Dropdown(props) {
    return (
        <div style={{width:"200px"}}>
            <Select 
                options = {props.arr}
                isSearchable
            >
            </Select>
        </div>
    )
}

export default Dropdown;