import axios from 'axios'

const baseUrl = 'https://api.github.com'

class Services {
  async onFetchGithubRopesCommits (repo) {
    return axios.get(`${baseUrl}/repos/suiyang1714/${repo.name}/commits?since=${repo.since}`, {
      headers: {
        Authorization: 'token b7a362c903461be93987720b2d2e35307c1f1186'
      }
    })
  }
  async onFetchGithubRopes () {
    return axios.get(`${baseUrl}/user/repos?sort=update`, {
      headers: {
        Authorization: 'token b7a362c903461be93987720b2d2e35307c1f1186'
      }
    })
  }

  async onFetchGithubNotifications () {
    return axios.get(`${baseUrl}/notifications`, {
      headers: {
        Authorization: 'token b7a362c903461be93987720b2d2e35307c1f1186'
      }
    })
  }
}
export default new Services()
