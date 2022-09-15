import { useEffect } from 'react';


export default function useInit(callback, depends = [], options = {backForward: false}) {
    useEffect(() => {
      callback(false);
      if (options.backForward) {
        window.addEventListener('popstate', callback);
        return () => {
          window.removeEventListener('popstate', callback);
        };
      }
    }, depends);
}
