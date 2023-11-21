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

export type GithubUser = ({
    username: string;
    description: string;
    socials: {
        facebook: string;
        twitter: null;
        instagram: null;
        whatsapp: string;
        github: string;
    };
    name: any;
    login: any;
    avatar_url: any;
    html_url: any;
} | null)[];
