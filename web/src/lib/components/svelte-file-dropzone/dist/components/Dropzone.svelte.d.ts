/** @typedef {typeof __propDef.props}  DropzoneProps */
/** @typedef {typeof __propDef.events}  DropzoneEvents */
/** @typedef {typeof __propDef.slots}  DropzoneSlots */
export default class Dropzone extends SvelteComponentTyped<{
    accept: any;
    inputElement: any;
    minSize?: number;
    maxSize?: number;
    multiple?: boolean;
    disabled?: boolean;
    getFilesFromEvent?: typeof fromEvent;
    preventDropOnDocument?: boolean;
    noClick?: boolean;
    noKeyboard?: boolean;
    noDrag?: boolean;
    noDragEventsBubbling?: boolean;
    containerClasses?: string;
    containerStyles?: string;
    disableDefaultStyles?: boolean;
    name?: string;
    required?: boolean;
}, {
    dragenter: CustomEvent<any>;
    dragover: CustomEvent<any>;
    dragleave: CustomEvent<any>;
    filedropped: CustomEvent<any>;
    drop: CustomEvent<any>;
    droprejected: CustomEvent<any>;
    dropaccepted: CustomEvent<any>;
    filedialogcancel: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type DropzoneProps = typeof __propDef.props;
export type DropzoneEvents = typeof __propDef.events;
export type DropzoneSlots = typeof __propDef.slots;
import { fromEvent } from "file-selector";
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        accept: any;
        inputElement: any;
        minSize?: number;
        maxSize?: number;
        multiple?: boolean;
        disabled?: boolean;
        getFilesFromEvent?: typeof fromEvent;
        preventDropOnDocument?: boolean;
        noClick?: boolean;
        noKeyboard?: boolean;
        noDrag?: boolean;
        noDragEventsBubbling?: boolean;
        containerClasses?: string;
        containerStyles?: string;
        disableDefaultStyles?: boolean;
        name?: string;
        required?: boolean;
    };
    events: {
        dragenter: CustomEvent<any>;
        dragover: CustomEvent<any>;
        dragleave: CustomEvent<any>;
        filedropped: CustomEvent<any>;
        drop: CustomEvent<any>;
        droprejected: CustomEvent<any>;
        dropaccepted: CustomEvent<any>;
        filedialogcancel: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
