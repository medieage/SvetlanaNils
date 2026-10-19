import type { SVGProps } from 'react';

const paths = {
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  down: <path d="M12 4v16m-6-6 6 6 6-6" />,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /><path d="M8 11h8m-8 4h5" /></>,
  book: <><path d="M12 6c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v15" /><path d="M5 9h3m-3 4h3m8-4h3m-3 4h3" /></>,
  pen: <><path d="m15 5 4 4M4 20l4-1L21 6a2.8 2.8 0 0 0-4-4L4 15l-1 6 5-2" /><path d="M13 21h8" /></>,
  mentor: <><circle cx="9" cy="7" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-16a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v1" /></>,
  idea: <><path d="M9 18h6m-6 3h6M8 13a6 6 0 1 1 8 0c-1.5 1-1 3-1 3H9s.5-2-1-3Z" /><path d="M12 1v1M3 4l1 1m16-1-1 1" /></>,
  document: <><path d="M14 2H5v20h14V7Zm0 0v5h5M8 11h8m-8 4h8m-8 4h5" /></>,
  signature: <><path d="M3 17c5-8 7-13 5-14-3-1-6 18-2 18 3 0 5-10 7-10 2 0-1 7 1 7 1 0 2-3 3-3s1 3 4 1M3 23h18" /></>,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="18" cy="9" r="2" /><path d="M2 21v-2a7 7 0 0 1 14 0v2m2-6a5 5 0 0 1 5 5v1" /></>,
  vk: <path fill="currentColor" stroke="none" d="M13.162 18.994C4.962 18.994.285 13.374.09 4.022h4.107c.135 6.864 3.163 9.77 5.56 10.37V4.022h3.867v5.92c2.367-.255 4.856-2.952 5.695-5.92h3.867c-.645 3.657-3.343 6.354-5.261 7.463 1.918.899 4.991 3.252 6.16 7.509h-4.257c-.914-2.848-3.192-5.051-6.204-5.351v5.351h-.462Z" />,
};

export type IconName = keyof typeof paths;

/** Icons supplement visible labels and stay out of the accessibility tree. */
export default function Icon({ name, className = '', ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`icon ${className}`} aria-hidden="true" focusable="false" {...props}>{paths[name]}</svg>;
}
