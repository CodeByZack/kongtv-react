/// <reference types="vite/client" />
/*
 * ts图片声明导入文件
 */
// declare module '*.scss' {
//     const css: { [key: string]: string };
//     export default css;
//   }
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare interface Window {
  HlsJsPlayer: any;
}
