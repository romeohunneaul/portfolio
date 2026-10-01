/** Where the visitor's choice lives. Shared by the head script and the switch. */
export const THEME_KEY = "theme";

/**
 * Runs inline in <head>, before first paint: the visitor's saved choice, else their system setting.
 * Without JS the page stays light — the default tokens. Kept free of React so the root layout can import it.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
