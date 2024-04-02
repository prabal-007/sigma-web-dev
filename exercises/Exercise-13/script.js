function createCard(title, cname, views, monthsOld, duration, thumbnail) {
    let card = document.createElement('div');
    card.className = 'card';
    document.body.append(card);

    card.style.background = 'black';
    card.style.color = 'white';
    card.style.display = 'flex';

    let imgDiv = document.createElement('div');
    imgDiv.className = "imgdiv";
    imgDiv.innerHTML = `<img src=${thumbnail} alt="img"></img><span id="imgspan">${duration}</span>`;

    let txtDiv = document.createElement('div');
    txtDiv.className = "txtDiv"; 
    txtDiv.innerHTML = `<h3>${title}</h3><p class="c-data">${cname} | ${nviews(views)} | ${monthsOld} months ago</p>`;

    card.append(imgDiv);
    card.append(txtDiv);
}

function nviews(views) {
    // let views = 
    if (views <= 999) {
        return views;
    } else if ((views >= 1000) &&  (views <= 1000000)) {
        views = (views / 1000);
        views = views + 'k';
    } else {
        views = (views / 1000000);
        views = views + 'M';
    }
    return views;
}


createCard("Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1", "CodeWithHarry", 727000, 6, "31:20", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw");

createCard("Your First HTML Website | Sigma Web Development Course - Tutorial #2", "CodeWithHarry", 14000, 4, "28:31", "https://i.ytimg.com/vi/kJEsTjH5mVg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAU_sVj4Cw273EE2dnVxk_GeeDocQ");

createCard("Basic Structure of an HTML Website | Sigma Web Development Course - Tutorial #3", "CodeWithHarry", 402000, 2, "11:12", "https://i.ytimg.com/vi/BGeDBfCIqas/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBuhpUj-ErJicHq24jgB_3K2Chl_Q");

