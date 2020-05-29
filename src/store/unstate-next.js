import React from 'react';

function createContainer(useHook) {
  const Context = React.createContext(null);

  function Provider(props) {
    const value = useHook(props.initialState);
    return React.createElement(
      Context.Provider,
      {
        value: value,
      },
      props.children
    );
  }

  function useContainer() {
    const value = React.useContext(Context);
    if (value === null) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }

  return {
    Provider: Provider,
    useContainer: useContainer,
  };
}
function useContainer(container) {
  return container.useContainer();
}

export { createContainer, useContainer };
