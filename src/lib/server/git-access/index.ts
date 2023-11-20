import { users } from "./contributors";

export const getGithubUsers = async () => {
    let jobs = [];
    for (let user of users) {
        let job = fetch(`https://api.github.com/users/${user.username}`).then(
            async (successResponse) => {
                if (successResponse.status != 200) {
                    return null;
                } else {
                    const { name, login, avatar_url, html_url } =
                        await successResponse.json();
                    return {
                        name,
                        login,
                        avatar_url,
                        html_url,
                        ...user,
                    };
                }
            },
            (failResponse) => {
                return null;
            }
        );
        jobs.push(job);
    }
    const result = await Promise.all(jobs);
    return result;
};
