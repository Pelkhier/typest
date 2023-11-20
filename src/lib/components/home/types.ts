// NOTE : this user is connected to auth returned by the hook
export type UserClient =
    | {
          id: number;
          name: string;
          email: string;
      }
    | undefined;

export type UserStats = {
    completedLevelsCount: number;
    allLevelsCount: number;
    currentLevel: {
        level: {
            name: string;
            order: number;
            type: string;
        };
    } | null;
    lastStoryTime:
        | {
              accuracy: number | null;
              wpm: number | null;
          }
        | null
        | undefined;
} | null;
