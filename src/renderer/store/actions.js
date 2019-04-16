import Services from './services'

export default {
  async onFetchGithubRopesCommits ({commit, state}, repo) {
    const res = await Services.onFetchGithubRopesCommits(repo)
    return res.data
  },
  async onFetchGithubRopes ({commit, state}) {
    const res = await Services.onFetchGithubRopes()
    return res.data
  },
  async onFetchGithubNotifications ({commit, state}) {
    const res = await Services.onFetchGithubNotifications()
    return res.data
  }
}
