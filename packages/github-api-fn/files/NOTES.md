# Github api fn

## TODO

https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-the-weekly-commit-activity
https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-the-last-year-of-commit-activity
https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-the-weekly-commit-count
https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-commits
https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-page-views
https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-top-referral-sources
https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-all-contributor-commit-activity
https://docs.github.com/en/free-pro-team@latest/rest/reference/pulls#list-pull-requests

    const viewsPromise = http.get(`/repos/${repo.repo}/traffic/views`);
      const clonesPromise = http.get(`/repos/${repo.repo}/traffic/clones`);
      const referrersPromise = http.get(`/repos/${repo.repo}/traffic/popular/referrers`);
      const pathsPromise = http.get(`/repos/${repo.repo}/traffic/popular/paths`);

`repos/${user}/${repo}/traffic/views`
`repos/${user}/${repo}/traffic/clones`

pulls also support pagination
`repos/${user}/${repo}/commits?per_page=100`
`repos/${user}/${repo}/commits?per_page=1000`