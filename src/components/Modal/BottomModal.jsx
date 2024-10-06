export default function BottomModal({ id, children, onClose }) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box overflow-hidden p-0 rounded-t-lg flex flex-col">
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>
          <span className="icon-light-bold-Close"></span>
        </button>
      </form>
    </dialog>
  );
}
