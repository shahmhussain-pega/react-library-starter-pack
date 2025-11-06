import { useEffect } from 'react';
import '../../styles/main.scss';
// @ts-expect-error @moduk/frontend does not include type definitions
import { initAll } from '@moduk/frontend/dist/client/moduk-frontend.umd.js';

/**
 *
 * @param WrappedComponent Adds GDS javascript wrapper code into code on first time load
 * @returns
 */
export function withGDSWrapper(WrappedComponent: React.FC): React.FC {
  return function NewComponent() {
    useEffect(() => {
      // TODO improve to avoid storybook issue
      // console.log('updating with 1ms');
      // setTimeout(() => {
      //   console.log('initAll');
      //   initAll();
      // }, 1);
      // setTimeout(() => {
      //   // needed to add styling to components
      //   console.log('adding govuk-frontend-supported');
      //   document.body.classList.add('govuk-frontend-supported');
      // }, 0);
      // logic needed for loading js into components
      initAll();
      // needed to add styling to components
      document.body.classList.add('govuk-frontend-supported');
      console.log('Loading GDS Styles and JS');
    }, []);
    return <WrappedComponent />;
  };
}
