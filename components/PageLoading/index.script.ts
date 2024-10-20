/* eslint-disable no-undef */

export interface IPageLoadingProps {
  height: string | number
  scale: string | number
}

export const defaultProps = {
  height: '100vh',
  scale: 1,
}

export const usePageLoadingComponent = () => {
  const state: Ref<string[]> = ref<string[]>([
    '--x: 1;--y: 0;--d: -0.7;',
    '--x: 1;--y: -1;--d: -0.6;',
    '--x: 0;--y: -1;--d: -0.5;',
    '--x: -1;--y: -1;--d: -0.4;',
    '--x: -1;--y: 0;--d: -0.3;',
    '--x: -1;--y: 1;--d: -0.2;',
    '--x: 0;--y: 1;--d: -0.1;',
    '--x: 1;--y: 1;--d: 0;',
  ])

  return { state }
}
