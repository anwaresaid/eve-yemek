import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import PrimeReact from 'primereact/api';

const Index = () => {
  const [text, setText] = useState('');
  const toastRef = useRef();

  // active ripple effect
  PrimeReact.ripple = true;

  const onFormSubmit = (e) => {
    if (text) {
      toastRef.current.show({ severity: 'info', summary: text, life: 3000 });
    }

    // clear
    setText('');

    e.preventDefault();
  }

  return (
      <div className="App">
        <Toast ref={toastRef} />

        <header className="App-header">
          <img src="logo.svg" className="App-logo" alt="logo" />
        </header>

        <form className="p-d-flex p-jc-center p-mt-6" onSubmit={onFormSubmit}>
          <InputText value={text} onChange={(e) => setText(e.target.value)} />
          <Button type="submit" label="Submit" icon="pi pi-check" className="p-ml-2" />
        </form>


        <style jsx>{`             
.App {
    text-align: center;
  }
  
  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
  
  .App-header {
    background-color: #282c34;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
  
  .App-link {
    color: #61dafb;
  }
  
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
`}</style>
      </div>
  );
}

export default Index;
