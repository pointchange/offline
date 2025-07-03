import Message from "@/components/other/Message.vue";
import { createVNode, render, type VNode } from "vue";

let node: VNode;
function create() {
    const div = document.createElement('div');
    const vm = createVNode(Message)
    render(vm, div);
    document.body.appendChild(div);
    return vm;
}
export function message() {
    if (!node) {
        node = create();
    }
    function add(Msg: Msg) {
        const exposed = node.component?.exposed
        if (exposed) {
            exposed.add(Msg);
        }
    }

    return {
        add
    }
}