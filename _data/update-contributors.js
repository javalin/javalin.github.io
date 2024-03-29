// run by doing `node update-contributors.js` in this dir
// requires node18

(async () => {
    const fileSystem = require("fs");

    let repos = (await (await fetch("https://api.github.com/orgs/javalin/repos")).json())
        .filter(it => it.fork !== true) // we only care about sources/transferred repos
        .map(it => it.name)
        .filter(it => it !== ".github"); // this one isn't all that interesting, it's just meta info for the org

    let contributions = new Map();
    let avatars = new Map();

    for (let repo of repos) {
        console.log(`Getting contributors for ${repo} ...`);
        const response = await fetch(`https://api.github.com/repos/javalin/${repo}/contributors`);
        const repoContributors = await response.json();
        console.log(`${repo} has ${repoContributors.length} contributors ...`);
        for (let user of repoContributors) {
            console.log(`Adding contributions of ${user.login} ...`);
            avatars.set(user.login, user.avatar_url);
            if (contributions.has(user.login)) {
                contributions.set(user.login, contributions.get(user.login) + user.contributions);
            } else {
                contributions.set(user.login, user.contributions);
            }
        }
        console.log("------------------------------------------------------")
    }

    let contributorArray = Array.from(contributions.keys()).map(user => ({
        username: user,
        contributions: contributions.get(user),
        avatar: avatars.get(user),
    }));

    let sortedContributorArray = contributorArray
        .sort((a, b) => b.contributions - a.contributions)
        .filter(it => it.username !== "dependabot[bot]")
        .slice(0, 15);

    fileSystem.writeFileSync("contributors.json", JSON.stringify(sortedContributorArray, null, 2));
})();
