import type { Directive } from "vue";

export const vActive: Directive = {
    updated(el, binding) {
        const { name, index, count } = binding.value;
        if (el.children.length === 0) return;
        if (count === 0) return;
        if (count === 1) {
            if (index === 0) {
                el.children[index].classList.add(name)
                return;
            }
            const elChild = el.querySelector('.' + name);
            elChild.classList.remove(name);
            el.children[index].classList.add(name);
        } else {
            if (index === 0) {
                for (let i = 0; i < count; i++) {
                    el.children[index + i].classList.add(name)
                }
                return;
            }
            const elChild = el.querySelectorAll('.' + name);
            for (let i = 0; i < elChild.length; i++) {
                const item = elChild[i];
                item.classList.remove(name)
            }
            for (let i = 0; i < count; i++) {
                el.children[index + i].classList.add(name)
            }
        }
    }
}
