import classes from "./Modal.module.css"

function Modal(props) {
    return <>
        <div className={classes.backdrop}/>
        <dialog open className={classes.modal}>
            {props.children}
        </dialog>
    </>
}

export default Modal