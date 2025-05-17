/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 13:25:27
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 13:27:46
 * @FilePath: \RocketVPN\RocketVPN\DataUtils\GlobalProvider.tsx
 * @Description: File Description Here...
 * 
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved. 
 */
import React, { createContext, useState } from "react";

interface GlobalStateType {
  isConnected: boolean;
}

export const GlobalContext = createContext<{
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
}>({} as any);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isConnected: false,
    } as GlobalStateType);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
