document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById('github-form')
    const searchInput = document.getElementById("search")

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let usernameSearch = searchInput.value
        console.log(usernameSearch)
        fetch(`https://api.github.com/search/users?q=${usernameSearch}`, {
            method: "GET",
            headers:{
                Accept: "application/vnd.github.v3+json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const userLogin = data.items[0].login
                const userImg = data.items[0].avatar_url
                generateUserInfo(userLogin, userImg)
            })
        fetch(`https://api.github.com/users/${usernameSearch}/repos`, {
            method: "GET",
            headers: {
                Accept:"application/vnd.github.v3+json"
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                const repoList = data
                const dataLength = repoList.length
                for(let i =0; i < dataLength; i++) {
                    const repoListName = repoList[i].full_name
                    const repoGitUrl = repoList[i].git_url
                    const repoName = repoListName
                    const gitUrl = repoGitUrl
                    generateUserRepos(repoName, gitUrl)
                }
            })
        searchInput.value = ""
    })
})

function generateUserInfo(name, img) {
    console.log(name, img)
    const liName = document.createElement("li")
    const showImg = document.createElement("img")
    const userList = document.getElementById("user-list")
    liName.textContent = name
    showImg.src = img
    userList.append(liName, showImg)
}
function generateUserRepos(repo, url) {
    console.log(repo, url)
    const repoNameLi = document.createElement("li")
    const repoLinkA = document.createElement("a")
    const repoList = document.getElementById("repos-list")
    repoNameLi.textContent = repo
    repoLinkA.href = url.replace(`git://`, `https://`)
    repoLinkA.textContent = "Link to Repo"
    repoNameLi.append(repoLinkA)
    repoList.append(repoNameLi)
}