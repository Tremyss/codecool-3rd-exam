// todo  searchbar nothing found

const searchContainer = document.querySelector(".search-container")
const dataOutput = document.querySelector(".container")
const searchBar = document.getElementById("searchBar")
const infoMessage = document.createElement("h3")
infoMessage.setAttribute("id", "infoMessage")
infoMessage.innerText = "Loading..."
dataOutput.parentNode.insertBefore(infoMessage, searchContainer)

const searchUsers = (e) => {
    const value = e.target.value.toLowerCase()
    const userCards = document.querySelectorAll(".userCard")
    let counter = 0
    for (const userCard of userCards) {
        const isVisible = userCard.childNodes[1].innerText.includes(value)
        if (!isVisible) {
            userCard.style.display = "none"
        } else {
            userCard.style.display = "block"
            counter++
        }
    }
    if (counter === 0) {
        infoMessage.style.display = "block"
        infoMessage.innerText = "Nothing found"
    } else {
        infoMessage.style.display = "none"
    }
}
searchBar.addEventListener("input", searchUsers)

const getUserData = async () => {
    let userResponse = await fetch("https://api.github.com/users")
    let userData = await userResponse.json()
    renderData(userData)
}
getUserData()

const renderData = (userData) => {
    users = userData.map((user) => {
        let userCard = document.createElement("div")
        userCard.setAttribute("class", "userCard")
        dataOutput.append(userCard)

        let userPicture = document.createElement("img")
        userPicture.setAttribute("class", "userPicture")
        userPicture.setAttribute("src", user.avatar_url)
        userPicture.setAttribute("style", "max-width: 7rem")
        userCard.append(userPicture)

        let userName = document.createElement("p")
        userName.setAttribute("class", "userName")
        userName.innerText = user.login
        userCard.append(userName)

        // ? button
        let infoButton = document.createElement("button")
        infoButton.setAttribute("class", "infoButton")
        infoButton.innerText = "Show more"
        userCard.append(infoButton)

        let userRank = document.createElement("p")
        userRank.setAttribute("class", "userRank")
        userRank.innerText = `Rank: ${user.type}`
        userCard.append(userRank)
        userRank.style.display = "none"

        let userAdmin = document.createElement("p")
        userAdmin.setAttribute("class", "userAdmin")
        userAdmin.innerText = `Admin: ${user.site_admin}`
        userCard.append(userAdmin)
        userAdmin.style.display = "none"
    })
    infoMessage.style.display = "none";
    buttonHandler()
}

const showInfos = (e) => {
    const button = e.target
    const rank = button.nextSibling
    const admin = rank.nextSibling

    if (button.innerText === "Show more") {
        button.innerText = "Show less";
        rank.style.display = "block"
        admin.style.display = "block"
    } else {
        button.innerText = "Show more"
        rank.style.display = "none"
        admin.style.display = "none"
    }
}

const buttonHandler = () => {
    const infoButton = document.querySelectorAll('.infoButton');

    infoButton.forEach((button) => {
        button.addEventListener('click', showInfos)
    })
}


