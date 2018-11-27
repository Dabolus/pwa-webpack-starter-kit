declare module 'terser' {
  export function minify(code: string): {
    code: string,
  };
}
