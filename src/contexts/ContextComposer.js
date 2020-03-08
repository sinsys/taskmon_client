import { cloneElement } from 'react';
import PropTypes from 'prop-types';

export const ContextProviderComposer = 
  ({contextProviders, children}) => {
    return (
      contextProviders.reduceRight(
        (children, parent, index) => {
          return (
            cloneElement(
              parent, { children }
            ),
            children
          )
        })
    );
};

ContextProviderComposer.propTypes = {
  contextProviders: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
  children: PropTypes.node.isRequired,
};

/* Example usage

import providerOne from './providerOne.js';
import ProviderTwo from './providerTwo.js';
import ProviderThree from './providerThree.js';

return (
  <ContextProviderComposer contextProviders={[
    <ProviderOne key={0}/>
    <ProviderTwo key={1}/>
    <ProviderThree key={2}/>
  ]}>
    { props.children }
  </ContextProviderComposer>
);

*/