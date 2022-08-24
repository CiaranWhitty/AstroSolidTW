import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import CustomPaper from "./CustomPaper";

import styles from "../styles/CustomModal.module.css";

export default function CustomModal(props) {
  return (
    <Show when={props.modalOpen}>
      <Portal mount={props.mount}>
        <div class="fixed inset-0 z-50">
          <div
            class=" relative z-30 h-full bg-black opacity-70 "
            onClick={props.modalClose}
          ></div>
          <div class="absolute inset-0 flex items-center justify-center overflow-y-auto p-12">
            <div class=" absolute z-40">
              <CustomPaper center>
                <div class="mb-4 flex w-10/12 max-w-xl items-center justify-between">
                  <h3>{props.title ? props.title : "Title"}</h3>
                  <button href="" onClick={props.modalClose}>
                    X
                  </button>
                </div>
                <hr />
                {props.children
                  ? props.children
                  : "Add Elements To *CustomModal* Children"}
              </CustomPaper>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
