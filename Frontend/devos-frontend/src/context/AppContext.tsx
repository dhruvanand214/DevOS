import { createContext, useContext, useState } from "react";

interface AppContextValue {
    selectedNoteId: string | null;
    openNote: (id: string) => void;

    isCreatingTask: boolean;
    startCreateTask: () => void;
    cancelCreateTask: () => void;
}


const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    function startCreateTask() {
        setIsCreatingTask(true);
    }

    function cancelCreateTask() {
        setIsCreatingTask(false);
    }


    function openNote(id: string) {
        setSelectedNoteId(id);
    }

    return (
        <AppContext.Provider
            value={{
                selectedNoteId,
                openNote,
                isCreatingTask,
                startCreateTask,
                cancelCreateTask,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return ctx;
}
