import React from 'react';
import './shared.css'
import Loader from 'react-loader-spinner'

export default class ReactLoader extends React.Component {
    render() {
        const { loading } = this.props
        return (
            <div className="loader">
                <Loader
                    visible={loading}
                    type="TailSpin"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        );
    }
}