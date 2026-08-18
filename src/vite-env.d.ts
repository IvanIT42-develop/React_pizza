declare module '*.scss';
declare module '*.module.scss';
declare module '*.module.css' ;

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
export {};