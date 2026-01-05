import { createContext } from "react";

// type DispatchFunction = (action: DispatcherType) => void;
const DispatcherContext = createContext({dispatch: null});

export default DispatcherContext;