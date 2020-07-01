import React from "react";
import { message, Radio, InputNumber, Button, Form, DatePicker } from "antd";

const options = ['Richmond', 'Columbus', 'Philadelphia'];
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 8 },
    },
};

class Logger extends React.Component {
    formRef = React.createRef();
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
              return;
            }
            const values = {
                ...fieldsValue,
                'Date': fieldsValue['Date'].format('MM/DD/YYYY')
            }
            console.log("Received values of form: ", values);
            this.props.handleSubmit(values);
            message.success('Your shipment has been logged!');
        });
        
    };

    render() {
        return(
            <Form ref={this.formRef} {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Location"  rules={[{ required: true, message: "Please select a location!"}]}>
                    <Radio.Group options={options} />
                </Form.Item>
                <Form.Item label="Number of orders" rule={[{ required: true, type: 'number', message: "Please enter a number!"}]}>
                    <InputNumber min={0} max={240}></InputNumber>
                </Form.Item>
                <Form.Item label="Date" rules={[{ required: true, type: 'object', message: "Please enter a date!"}]}>
                    <DatePicker />
                </Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        );
    }
}


export default Logger;