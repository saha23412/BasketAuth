import React from 'react';
import propTypes from "prop-types";
export const ServicesContext = React.createContext({});
function ServicesProvider({services, children}) {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}

ServicesProvider.propTypes = {
  services: propTypes.object.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
}

export default React.memo(ServicesProvider);
