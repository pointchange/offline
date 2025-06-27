import { h, reactive, ref } from 'vue'
import '../assets/dialog.css';

export function useDialog() {
  const show = ref(false);
  const props = reactive({
    headerContent: '',
    mainContent: '',
    cancel: '',
    confirm: '',
    cancelHandle: () => { },
    confirmHandle: () => { },
  });
  function clickHandle() {
    show.value = !show.value
    console.log(show.value);
  }
  function cancelClick() {
    if (props.confirmHandle) {
      props.confirmHandle();
    }
    clickHandle()
  }
  const vnode = h('div', { class: 'dialog' }, [
    h('div', { onClick: clickHandle, class: 'modal' }),
    h('div', { class: 'card' }, [
      h('header', null, props.headerContent),
      h('main', null, props.mainContent),
      h('footer', null, [
        h('button', { class: 'button', onClick: cancelClick }, props.cancel),
        h('button', { class: 'button', onClick: props.confirmHandle }, props.confirm),

      ]),
    ]),
  ])
  function render() {
    return show.value ? vnode : null;
  }

  return { render, show, props, clickHandle }
}