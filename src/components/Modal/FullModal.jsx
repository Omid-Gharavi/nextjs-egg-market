export default function FullModal({ id, type = "primary", children }) {
  return (
    <dialog
      id={id}
      className="modal modal-bottom md:modal-middle overflow-y-scroll"
    >
      <div
        className={`modal-box fullModal rounded-none max-w-[100vw] max-h-[100vh] flex flex-col h-screen md:h-fit w-screen p-0 ${
          type === "primary" ? "bg-default-50" : "bg-surface-secondary"
        } `}
      >
        {children}
      </div>
    </dialog>
  );
}
