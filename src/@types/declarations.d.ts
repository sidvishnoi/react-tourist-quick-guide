declare module 'storybook-addon-specifications' {
  export function specs(...args: any[]): void;
  export function describe(...args: any[]): void;
  export function it(...args: any[]): any;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
