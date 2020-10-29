import React, { useEffect, useState } from 'react';

import FormContainer from './components/containers/FormContainer';
import TextInput from './components/formElements/TextInput';
import Checkbox from './components/formElements/Checkbox';

import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [words, setWords] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("/pre-populated-intake-forms-app-backend/api/hello")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              setWords(result.words);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
  }, [])

  return (
        <div className="app-container">
          {/** we may want some sort of nav bar at the top of the screen that shows the user's 
           * current progress through the form - ie "12/16 required fields completed" - and 
           * displays their name
           */}
          <FormContainer title="Patient Info"  key="form-group-0" renderFormComponents={() => {
            return <div className="flex">
                      <div className="flex flex-col" style={{flex: 1}}>
                        <div className="flex">
                          <TextInput placeholder="name" title="First" isRequired />
                          <TextInput placeholder="name" title="Last" isRequired />
                          <TextInput placeholder="initial" title="Middle" isRequired />
                        </div>
                        <div className="flex">
                        <TextInput title="Address" isRequired grow/>
                        </div>
                      </div>
                      <div className="flex flex-col" style={{ flex: 1 }}>
                        {/** other fields here */}
                      </div>
                  </div>
            }}
          />
          <FormContainer title="Medical History" key="form-group-1" renderFormComponents={() => {
            return <div className="flex flex-col">
              <Checkbox title="Are you sick?"/>
            <Checkbox title="Were you ever sick?"/></div>
            }}
          />
        </div>
    );
  
}

export default App;
