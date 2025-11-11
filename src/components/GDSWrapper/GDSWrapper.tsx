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
      initAll();
      // needed to add styling to components
      document.body.classList.add('govuk-frontend-supported');
      console.log('Loading GDS Styles and JS');
    }, []);
    return <WrappedComponent />;
  };
}
