import React from 'react';
import { Table, Button, Form, Input, Icon } from 'antd/lib';
import PropTypes from "prop-types";

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource
        };
    }
    onChange = (pagination, filters, sorter, extra) => {
        this.props.onChange(pagination, filters, sorter, extra);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err && value.searchString) {
                let filterArrayData = [];
                this.props.dataSource.filter((obj) => {
                    if (Object.values(obj).toString().toLocaleLowerCase().includes(value.searchString.toLocaleLowerCase())) {
                        filterArrayData.push(obj);
                    }
                });
                this.setState({
                    dataSource: filterArrayData
                });
            }
            else {
                this.setState({
                    dataSource: this.props.dataSource
                });
            }
        });
    };

    showModal = () => {
        this.props.showModal(true)

    };
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='dataTable'>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="ant-row">
                        <div className="ant-col-12">
                            <Form.Item name="modelButton" hidden={!this.props.modelButtonLabel}>
                                <Button
                                    htmlType="button"
                                    onClick={this.showModal}
                                >
                                    {this.props.modelButtonLabel}
                                </Button>
                            </Form.Item>
                        </div>
                        <div className="ant-col-12 pull-right">
                            <Form.Item name="searchString">
                                {getFieldDecorator("searchString")(
                                    <Input
                                        prefix={<Icon type="search" />}
                                        placeholder="search"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Go
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
                <Table rowKey={this.props.rowKey} columns={this.props.columns} dataSource={this.state.dataSource} onChange={this.onChange} pagination={{ pageSize: 10 }} />

            </div>
        )
    }

}


export default Form.create()(DataTable)