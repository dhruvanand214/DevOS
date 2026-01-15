import { useState } from "react";
import type { Command } from "../utils/commands";
import { fuzzyMatch } from "../utils/fuzzyMagic.ts";

interface CommandPaletteProps {
    isOpen: boolean;
    commands: Command[];
    onClose: () => void;
}

export default function CommandPalette({
    isOpen,
    commands,
    onClose,
}: CommandPaletteProps) {

    const [query, setQuery] = useState("");

    if (!isOpen) return null;

    const filteredCommands = commands.filter((cmd) =>
        fuzzyMatch(cmd.label, query)
    );


    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24">
            <div className="w-full max-w-lg rounded-lg bg-neutral-900 border border-neutral-800 shadow-xl">
                <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command..."
                    className="w-full bg-transparent px-4 py-3 border-b border-neutral-800 outline-none text-sm"
                />


                <ul className="max-h-64 overflow-auto">
                    {filteredCommands.length === 0 && (
                        <li className="px-4 py-6 text-sm text-neutral-500">
                            No matching commands
                        </li>
                    )}
                    {filteredCommands.map((cmd) => (
                        <li
                            key={cmd.id}
                            onClick={() => {
                                cmd.action();
                                onClose();
                            }}
                            className="px-4 py-3 text-sm cursor-pointer hover:bg-neutral-800"
                        >
                            {cmd.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
