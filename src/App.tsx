import Button from './components/Button';
import { Header } from '@moduk/frontend/react';
import Accordion from './components/Accordion/Accordion';
// @ts-expect-error @moduk/frontend does not include type definitions
import { initAll } from '@moduk/frontend/dist/client/moduk-frontend.umd.js';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initAll();
  }, []);

  return (
    <>
      <Header />
      <Button />
      <Accordion />
    </>
  );
}

export default App;
