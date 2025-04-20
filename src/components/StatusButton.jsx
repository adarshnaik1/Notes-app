import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function StatusButton({ status, todoId, onStatusChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-2 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600 border border-gray-500"
        onClick={() => setOpen((o) => !o)}
        title="Change status"
        type="button"
      >
        ⋮
      </button>
      {open && (
        <div className="absolute   left-7 mt-1 bg-gray-600/60 text-white rounded shadow z-10 min-w-[120px] ">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`block w-full text-left px-3 py-1 hover:text-black hover:bg-gray-200 ${status === opt.value ? "font-bold" : ""}`}
              onClick={() => {
                setOpen(false);
                if (opt.value !== status) onStatusChange(todoId, opt.value);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
