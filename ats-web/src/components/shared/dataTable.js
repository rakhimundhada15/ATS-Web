import React from 'react';
import { Table, Button, Form, Input, Icon } from 'antd';
import PropTypes from "prop-types";

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource
        };
    }
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }
    onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let filterArrayData = [];
                this.state.dataSource.filter((obj) => {
                    if ( value.searchString && Object.values(obj).toString().toLocaleLowerCase().includes(value.searchString.toLocaleLowerCase())) {
                        filterArrayData.push(obj);
                    }

                });

                this.setState({
                    dataSource: filterArrayData 
                });

            }
        });
    };
    render() {
        const {
            getFieldDecorator
        } = this.props.form;

        return (
            <div className='dataTable'>
                <Form   layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item name="searchString">
                       {getFieldDecorator("searchString")(
                            <Input
                                prefix={<Icon type="search" />}
                                placeholder="search"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled=''>
                            Go
                    </Button>
                    </Form.Item>
                </Form>
                <Table columns={this.props.columns} dataSource ={this.state.dataSource} onChange={this.onChange} pagination={{ pageSize: 2 }} />
            </div>
        )
    }
}

export default Form.create()(DataTable)

// DataTable.prototype={
//     columns:PropTypes.objectOf(ColumnProps)
// }


// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button,Icon ,Table } from 'antd';

// function DataTable(props) {
//   const [form] = Form.useForm();
//   const [, forceUpdate] = useState(); // To disable submit button at the beginning.

//   useEffect(() => {
//     forceUpdate({});
//   }, []);

//   const onSubmit = values => {
//     console.log('Finish:', values);
//   };

//   return (
//       <div>
//     <Form form={form} className='dataTable' name="horizontal_login" layout="inline" onSubmit={onSubmit}>
//       <Form.Item
//         name="searchString"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your search String!',
//           },
//         ]}
//       >
//         <Input prefix={<Icon type="search" />} placeholder="search" />
//       </Form.Item> 
//       <Form.Item shouldUpdate>
//         {() => (
//           <Button
//             type="primary"
//             htmlType="submit"
//             disabled={
//               !form.isFieldsTouched(true) ||
//               form.getFieldsError().filter(({ errors }) => errors.length).length
//             }
//           >
//            Go
//           </Button>
//         )}
//       </Form.Item>
//     </Form>
//      <Table columns={props.columns} dataSource={props.dataSource}  pagination={{ pageSize: 2 }} />
//      </div>
//   );
// };

// //export default DataTable;
// export default Form.create()(DataTable)