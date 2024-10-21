import React from "react";

export default function MessageCard({ data, setSelected }) {
  const { icon, time, id, title, description, status } = data;

  return (
    <>
      <button
        onClick={() => {
          document.getElementById("messageModal").showModal();
          setSelected(data);
        }}
        className="w-full line flex items-start mb-2 gap-2 p-2"
      >
        <span className={`${icon} text-xl`}></span>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <p
              className={`text-default-900 text-sm ${
                status ? "font-medium" : " font-extrabold"
              }`}
            >
              {title}
            </p>
            {!status && (
              <span className="h-1 w-1 bg-primary rounded-full"></span>
            )}
          </div>
          <p
            className={`limitText text-start text-default-500 text-xs ${
              status ? "font-medium" : " font-extrabold"
            }`}
          >
            {description}
          </p>
        </div>
        <p
          className={`text-default-500 text-xs ${
            status ? "font-medium" : " font-extrabold"
          }`}
        >
          {time}
        </p>
      </button>
    </>
  );
}
