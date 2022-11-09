const searchInput = document.querySelector("#searchBar");
// let users = [];
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    users.map((user) => {
        const isVisible = user.login.includes(value);
        user.element.classList.toggle("hide", !isVisible);
    });
});

const getUserData = async () => {
    let userResponse = await fetch("https://api.github.com/users");
    let userData = await userResponse.json();
    renderData(userData);
};
getUserData();

const renderData = (userData) => {
    let dataOutput = document.querySelector(".container");

    users = userData.map((user) => {
        let userCard = document.createElement("div");
        userCard.setAttribute("class", "userCard");
        dataOutput.append(userCard);

        let userPicture = document.createElement("img");
        userPicture.setAttribute("class", "userPicture");
        userPicture.setAttribute("src", user.avatar_url);
        userPicture.setAttribute("style", "max-width: 7rem");
        userCard.append(userPicture);

        let userName = document.createElement("p");
        userName.setAttribute("class", "userName");
        userName.innerText = user.login;
        userCard.append(userName);

        // ? button
        let infoButton = document.createElement("button");
        infoButton.setAttribute("class", "infoButton");
        infoButton.innerText = "Show more";
        userCard.append(infoButton);

        infoButton.addEventListener(
            "click",
            (showInfos = (event) => {
                infoButton.innerText = "Show less";

                let userRank = document.createElement("p");
                userRank.setAttribute("class", "userRank");
                userRank.innerText = `Rank: ${user.type}`;
                userCard.append(userRank);

                let userAdmin = document.createElement("p");
                userAdmin.setAttribute("class", "userAdmin");
                userAdmin.innerText = `Admin: ${user.site_admin}`;
                userCard.append(userAdmin);
            })
        );
        return { userName: user.login };
    });
    /* for (let i = 0; i < userData.length; i++) {
        let userCard = document.createElement("div");
        userCard.setAttribute("class", "userCard");
        dataOutput.append(userCard);

        let userPicture = document.createElement("img");
        userPicture.setAttribute("class", "userPicture");
        userPicture.setAttribute("src", userData[i].avatar_url);
        userPicture.setAttribute("style", "max-width: 7rem");
        userCard.append(userPicture);

        let userName = document.createElement("p");
        userName.setAttribute("class", "userName");
        userName.innerText = userData[i].login;
        userCard.append(userName);

        // ? button
        let infoButton = document.createElement("button");
        infoButton.setAttribute("class", "infoButton");
        infoButton.innerText = "Show more";
        userCard.append(infoButton);

        infoButton.addEventListener(
            "click",
            (showInfos = (event) => {
                infoButton.innerText = "Show less";

                let userRank = document.createElement("p");
                userRank.setAttribute("class", "userRank");
                userRank.innerText = `Rank: ${userData[i].type}`;
                userCard.append(userRank);

                let userAdmin = document.createElement("p");
                userAdmin.setAttribute("class", "userAdmin");
                userAdmin.innerText = `Admin: ${userData[i].site_admin}`;
                userCard.append(userAdmin);
            })
        );

    } */
    /* infoButton.addEventListener(
        "click",
        (noInfos = (event) => {
            infoButton.innerText = "Show more";
        })
    ); */
};
