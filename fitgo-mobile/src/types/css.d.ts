/** Declarações para imports de CSS (usados apenas na versão web). */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css';
