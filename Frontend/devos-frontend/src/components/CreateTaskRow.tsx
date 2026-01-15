import { useEffect, useRef, useState } from "react";

interface Props {
  onCreate: (title: string) => void;
  onCancel: () => void;
}

export default function CreateTaskRow({ onCreate, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && title.trim()) {
      onCreate(title.trim());
    }

    if (e.key === "Escape") {
      onCancel();
    }
  }

  return (
    <div className="rounded border border-neutral-700 bg-neutral-900 px-4 py-3">
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="New task title..."
        className="w-full bg-transparent outline-none text-sm"
      />
      <p className="text-xs text-neutral-500 mt-1">
        Enter to create • Esc to cancel
      </p>
    </div>
  );
}
