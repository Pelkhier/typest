export type LevelCard = {
    accuracy: number | null;
    time: number | null;
    wpm: number | null;
    completed: boolean;
    level: {
        id: number;
        name: string;
        lang: string;
        order: number;
        type: string;
    };
};
