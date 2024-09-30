import NProgress from 'nprogress'; //nprogress module
import utilsConstants from './utils.constants';
import { useRouterType } from 'packages/hook/useRouter';

const handlerChange = (route?: useRouterType) => {
  if (route === 'start') {
    NProgress.configure({
      showSpinner: false,
    });

    NProgress.start();
  }

  if (route === 'done') {
    NProgress.done();
  }
};

const handlerURL = (href: string) => {
  const isURL = href.startsWith(location.origin);

  const targetURL = new URL(isURL ? href : location.origin + href);
  const cleanURL = targetURL.pathname.replace('//', '/'); // why replace "//", because home page bug

  /* 
      if user navigation as the same, we need prevent
        1. same URL
        2. same SEARCH
  */
  if (cleanURL === location.pathname && targetURL.search === location.search) {
    return true;
  }

  return false;
};

const handlerPrevent = (element: Element | null): Element | null => {
  while (element) {
    if (element?.classList?.contains?.(utilsConstants.PREVENT_ANCHOR)) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
};

export default {
  handlerChange,
  handlerURL,
  handlerPrevent,
};
