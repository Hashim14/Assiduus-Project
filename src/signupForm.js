import React, { useState, useMemo } from "react";
import { Form, Input, Select, Checkbox, Button, Col, Row } from "antd";
import countryList from 'react-select-country-list'
import SignUpSuccessfull from "./signUpSuccessfull";

const { Option } = Select;

const SignUpForm = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const countryOptions = useMemo(() => countryList().getData(), [])

  const handleSubmit = (values) => {
    if (!error) {
      return 
    } else {
      setConfirmed(true);
    }
   console.log(form.getFieldsValue())
  };

  return (

    <>
    {!confirmed ?
    <div className="signup-form" style={{
      margin: '0vh 35vw',
    background: 'white',
    borderRadius: '18px',
    boxShadow: '0px 0px 20px #aaaaaa',
    padding: '3vh'
      }}>
     <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{ marketplaces: [] }}
      className="width-50"
    >
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: "Please enter your email address" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input placeholder="example@email.com" />
      </Form.Item>
      <Form.Item label="Phone Number">
        <Form.Item
          name="countryCode"
          noStyle
          rules={[
            { required: true, message: "Please enter your country code" },
          ]}
        >
          <Input placeholder="+95" style={{ width: "25%" }} />
        </Form.Item>
        <Form.Item
          name="phone"
          noStyle
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="555-555-5555" style={{ width: "75%" }} />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="company"
        rules={[{ required: true, message: "Please enter your company name" }]}
      >
        <Input placeholder="ACME Inc." />
      </Form.Item>
      <Form.Item label="Country Name" name="country">
        <Select placeholder="Select a country" options={countryOptions} />
      </Form.Item>
      <Form.Item name="marketPlaces"  label="Market Places Covered" >
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="amazon" style={{ lineHeight: '32px' }}>
                Amazon
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="flipkart" style={{ lineHeight: '32px' }}>
              Flipkart
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="shopify" style={{ lineHeight: '32px' }}>
              Shopify
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="ebay" style={{ lineHeight: '32px' }}>
              Ebay
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="noon" style={{ lineHeight: '32px' }}>
              Noon
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="walmart" style={{ lineHeight: '32px' }}>
              Walmart
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name='termsAndCondition' valuePropName="checked" >
         <Checkbox defaultChecked={false} onChange={()=> setError(!error)} value='agreed'>Terms and Conditions</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!error}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div> :
    <SignUpSuccessfull />
  }
   

    </>
    
  );
};
export default SignUpForm;
