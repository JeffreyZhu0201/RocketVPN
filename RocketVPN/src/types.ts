// src/types.ts
export interface Todo {
  id: string;
  text: string;
}

// 导航参数类型
export type RootStackParamList = {
  Home: undefined;
  Detail: { todo: Todo };
};