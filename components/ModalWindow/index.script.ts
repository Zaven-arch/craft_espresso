/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export interface IModalWindowProps {
  maxWidth: string | number
  modal: boolean
  persistent: boolean
  stickyActions: boolean
  bgColor: string
  contentClass: string
}

export type IEmits = (event: 'close') => void

export const defaultProps = {
  contentClass: '',
  maxWidth: 1176,
  modal: false,
  persistent: false,
  bgColor: '',
  stickyActions: false,
  attach: false,
}

export const useModalWindowComponent = (
  { modal }: IModalWindowProps,
  emits: IEmits,
) => {
  const isOpen: WritableComputedRef<boolean> = computed<boolean>({
    get: () => modal,
    set: (value) => !value && emits('close'),
  })

  onMounted(() => document.children[0].classList[isOpen.value ? 'add' : 'remove'](
    'overflow-y-hidden',
  ))

  return {
    isOpen,
  }
}
