import React from 'react';
import { Spin, Icon } from 'antd';
import PropTypes from "prop-types";

export default function Loader(props) {
    const antIcon = <Icon type="loading" className="loader-icon" spin />;
    return (props.loading === 'true' && <div className="loader">
        <Spin indicator={antIcon} />
    </div>);
}

Loader.prototype = {
    loading: PropTypes.bool.isRequired
}

Loader.defaultProps = {
    loading: false
}




