import { BASE_URL } from '../constants/githubApiConstants.js'

export class GithubApi {
    constructor({ owner, repo }) {
        this.baseUrl = BASE_URL;
        this.owner = owner;
        this.repo = repo;
    }

    getCommits() {
        const _url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/commits`;
        return fetch(_url, { method: 'GET' })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}