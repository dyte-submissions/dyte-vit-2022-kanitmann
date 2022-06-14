const octokit = new Octokit({
  auth: 'access-token'
})

await octokit.request('POST /repos/{owner}/{repo}/pulls', {
  owner: 'OWNER',
  repo: 'REPO',
  title: 'Amazing new feature',
  body: 'Please pull these awesome changes in!',
  head: 'octocat:new-feature',
  base: 'master'
})