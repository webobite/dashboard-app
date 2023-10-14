import React, { useReducer } from "react";

export default (reducer: any, actions: { [x: string]: (arg0: React.DispatchWithoutAction) => any; }, initialState: unknown) => {
  const Context = React.createContext(null);

  const Provider = ( children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined ) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: { [x: string]: any; } = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      // @ts-ignore
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
