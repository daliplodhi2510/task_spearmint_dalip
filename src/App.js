import React, {useState} from 'react';
import './style.css';
import {InputField} from './InputField';

function App() {
  const formFields = [
    {
      id: 1,
      name: 'name',
      label: 'Name',
      placeholder: 'Enter your name',
      type: 'text',
      autoComplete: 'off'
    },
    {
      id: 2,
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      type: 'email',
      autoComplete: 'off'
    },
    {
      id: 3,
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter your phone',
      type: 'number',
      autoComplete: 'off'
    },
    {
      id: 4,
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
      autoComplete: 'off'
    },
    {
      id: 5,
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Enter your Confirm Password',
      type: 'password',
      autoComplete: 'off'
    }
  ];

  const initalValues = {
    name:'',
    email:'',
    phone:'',
    password:'',
    confirmPassword:'',
    errors:{
      name:'',
      email:'',
      phone:'',
      password:'',
      confirmPassword:'',
    }
  }
  const [values, setValues] = useState(initalValues);
  const [submitData, setSubmitData] = useState(initalValues);

  const [formValid, setFormValid] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const changeValue = (e) => {
    setValues({...values, [e.target.name]:e.target.value});
    setSubmitData({...submitData, [e.target.name]:e.target.value});
  }

  const errorOccur = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    formFieldCheck(fieldName,fieldValue);
  }

  const formFieldCheck = (fieldName,val) => {
    const emailValue = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
    const phoneValue = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const passwordValue = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    val = val.trim();
    if(val === ''){
      values.errors[fieldName] = `${fieldName} is required!`;
      setFormValid(false);
    } else if(fieldName === 'email' && !emailValue.test(val)){
      values.errors.email = 'Email is not a valid!';
      setFormValid(false);
    } else if(fieldName === 'phone' && !phoneValue.test(val)){
      values.errors.phone = 'Phone number is not a vaild number!';
      setFormValid(false);
    } else if(fieldName === 'password' && !passwordValue.test(val)){
      values.errors.password = 'Password is not a secure password!';
      setFormValid(false);
    } else if(fieldName === 'confirmPassword' && values.password !== values.confirmPassword){
      values.errors.confirmPassword = 'Password not matched!';
      setFormValid(false);
    } else {
      values.errors[fieldName] = '';
      if(values.errors.name === '' && values.errors.email === '' && values.errors.phone === '' && values.errors.password === '' && values.errors.confirmPassword === '' &&
      values.name !== '' && values.email !== '' && values.phone !== '' && values.password !== '' && values.confirmPassword !== ''){
        setFormValid(true);
      }
    }
  }

  const formData = () => {
    setFormSubmit(true);
    setFormValid(false);
    setValues(initalValues);
    console.log('values',values);
    console.log('submitData',submitData);
  }

  const closeModel = () => {
    setSubmitData(initalValues);
    setFormSubmit(false);
  }

  return (
    <>
    <div className="container mt-md-5 mt-3">
      <h1 className="text-center">Registration</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="row">
            {
              formFields.map( (item) => (
                <InputField key={item.id} {...item} error={values.errors} changeValue={changeValue} value={values[item.name]} errorOccur={errorOccur} />
              ))
            }
            <div className="col-md-12 text-center">
              <button className="btn btn-success w-50" disabled={!formValid}  onClick={formData}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={formSubmit ? 'formContainer show': 'formContainer' }>
      <div className="formBox">
        <button className="btn btn-secondary closeBtn" onClick={closeModel}>&times;</button>
        <div className="row">
          <div className="col-md-12">
            <h4>Name: {submitData.name}</h4>
          </div>
          <div className="col-md-6">
            <p>Phone: {submitData.phone}</p>
          </div>
          <div className="col-md-6">
            <p>Email: {submitData.email}</p>
          </div>
          <div className="col-md-6">
            <p>Password: {submitData.password}</p>
          </div>
          <div className="col-md-6">
            <p>Confirm Password: {submitData.confirmPassword}</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
