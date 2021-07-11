window.onload = () => {
  const playersDataPromises = [];
  const playersDataJsonPromise = [];
  const playersData = [];
  const playingRoles = [];
  const playersId = [
    33757, 35320, 49640, 359200, 424221, 432783, 507904, 646869, 684479, 684611,
  ];
  const playersId1 = [33757, 35320, 123];

  let filterPreferences = [];
  const searchText = [];
  const sideBarFilter = {
    chekBoxes: document.querySelectorAll(
      '.SideBarContentWrapper input[type="checkbox"]'
    ),
    initialize() {
      this.chekBoxes = document.querySelectorAll(
        '.SideBarContentWrapper input[type="checkbox"]'
      );
      this.createEventListeners();
    },
    createEventListeners() {
      const checkBoxes = this.chekBoxes;
      function _handleClick(event) {
        if (this.checked) {
          if (filterPreferences.includes(this.value)) {
          } else {
            filterPreferences.push(this.value);
          }
        } else {
          filterPreferences = filterPreferences.filter(
            (item) => !(item === this.value)
          );
        }
        showFilterdHtml();
      }
      this.chekBoxes.forEach((checkbox) => {
        checkbox.addEventListener("click", _handleClick);
      });
    },
  };

  //sideBarFilter.initialize();
  const fetchPlayerData = async (id) => {
    const responsePromise = fetch(
      "https://cricapi.com/api/playerStats?apikey=PTMXH9OYJtPwFMfpgYexrN0aR6F2&pid=" +
        id
    );
    // const responsePromise = fetch("http://localhost:3010/" + id);
    playersDataPromises.push(responsePromise);
  };
  playersId.map((id) => {
    fetchPlayerData(id);
  });

  const cardHtml = (name, imageUrl, country, t20, odi, test) => {
    return ` <div class="ContentCard">
    <div class="card-image">
      <img
        src="${imageUrl}"
        alt="Image Not Available"
        class="Card-image"
      />
    </div>
    <div class="card-Details">
      <span class="Name">${name}</span>
      <h2>${country}</h2>
    </div>
    <div class="card-Stats">
      <div class="stat">
        <div class="val">${test}</div>
        <div class="type">test</div>
      </div>
      <div class="stat border">
        <div class="val">${odi}</div>
        <div class="type">odi</div>
      </div>
      <div class="stat">
        <div class="val">${t20}</div>
        <div class="type">T20</div>
      </div>
    </div>
  </div>`;
  };
  const showFullPlayersHtml = () => {
    console.log("came here");
    const pLayersContainerNode = document.querySelector(".ContentWrapper");
    let finalHtml = "";
    console.log("PLayersData", playersData, searchText);
    playersData.map((item) => {
      console.log(item);
      let name = item.name;
      let imagePath = item.imageURL;
      let country = item.country;
      let PlayingRole = item.playingRole;
      let testMatches=0, odiMatches=0, t20Matches=0;
       
      if (item.data.batting.listA != undefined) {
        t20Matches = item.data.batting.listA.Mat;
      }
      if (item.data.batting.firstClass != undefined) {
        odiMatches = item.data.batting.firstClass.Mat;
      }
      if (item.data.batting.tests != undefined) {
        testMatches = item.data.batting.tests.Mat;
      }
      console.log(PlayingRole);
      if (playingRoles.includes(PlayingRole)) {
      } else {
        playingRoles.push(PlayingRole);
      }
      let nameMatched = true;
      if (searchText[0] != undefined && searchText[0] !== "") {
        nameMatched = false;
        let lowerCaseSearch = searchText[0].toLowerCase();
        let itemNameLowerCase = item.name.toLowerCase();
        if (itemNameLowerCase.includes(lowerCaseSearch)) {
          nameMatched = true;
        }
      }
      if (nameMatched === true) {
        finalHtml =
          finalHtml +
          cardHtml(
            name,
            imagePath,
            country,
            t20Matches,
            odiMatches,
            testMatches
          );
      }
    });
    console.log("Roles", playingRoles);
    if(finalHtml===''){
      finalHtml=noPlayerHtml('No Player With This Name');
    }
    pLayersContainerNode.innerHTML =  finalHtml;
  };
  const showFilterdHtml = () => {
    console.log("filter Preferences", filterPreferences, searchText);
    if (filterPreferences.length === 0) {
      showFullPlayersHtml();
    } else {
      const pLayersContainerNode = document.querySelector(".ContentWrapper");
      let filteredPlayers = playersData.filter((item) => {
        let roleOkay = false;
        let nameMatched = true;
        if (filterPreferences.includes(item.playingRole)) {
          roleOkay = true;
        }
        if (searchText[0] != undefined && searchText[0] !== "") {
          nameMatched = false;
          let lowerCaseSearch = searchText[0].toLowerCase();
          let itemNameLowerCase = item.name.toLowerCase();
          if (itemNameLowerCase.includes(lowerCaseSearch)) {
            nameMatched = true;
          }
        }
        return roleOkay && nameMatched;
      });
      let filterdHtml = "";
      filteredPlayers.map((item) => {
        let name = item.name;
        let imagePath = item.imageURL;
        let country = item.country;
        let testMatches=0, odiMatches=0, t20Matches=0;
       
        if (item.data.batting.listA != undefined) {
          t20Matches = item.data.batting.listA.Mat;
        }
        if (item.data.batting.firstClass != undefined) {
          odiMatches = item.data.batting.firstClass.Mat;
        }
        if (item.data.batting.tests != undefined) {
          testMatches = item.data.batting.tests.Mat;
        }
        filterdHtml = filterdHtml + cardHtml(name, imagePath, country,t20Matches,odiMatches,testMatches);
      });
      if(filterdHtml===''){
        filterdHtml=noPlayerHtml('No Player With This Name');
      }
      pLayersContainerNode.innerHTML = filterdHtml;
    }
  };
  const sideBarItemHtml = (role) => {
    return ` <div class="SideBarContentItem">
    <input type="checkbox" id="${role}" name="${role}" value="${role}">
    <label for="${role}"> ${role}</label>
    </div>`;
  };

  const showSideBarItems = () => {
    const sideBarWrapper = document.querySelector(".SideBarContentWrapper");
    let sideBarHtml = "";
    playingRoles.map((item) => {
      sideBarHtml = sideBarHtml + sideBarItemHtml(item);
    });
    sideBarWrapper.innerHTML = sideBarHtml;
  };

  const resolveData = async () => {
    Promise.all([...playersDataPromises]).then((values) => {
      values.map((value) => {
        const dataJsonPromise = value.json();
        playersDataJsonPromise.push(dataJsonPromise);
        console.log(playersDataJsonPromise);
        console.log("inside each promise");
      });
      Promise.all([...playersDataJsonPromise]).then((value) => {
        value.map((item) => {
          if (item.playingRole === null) {
            item.playingRole = "All Rounder";
          }
          playersData.push(item);
        });
        showFullPlayersHtml();
        showSideBarItems();
        sideBarFilter.initialize();
      });
    });
  };

  const generateHtml = async () => {
    await resolveData();
  };
  // generating Html
  generateHtml();

// noPlayerHtml
const noPlayerHtml=(text)=>{
  return `
  <div class="noPlayerHtml">
  <span class="noPlayerHtml_Text"> ${text} </span>
  </div>
  `
}

//setting while loading
const onPageLoad=()=>{
  let ContentHtml=noPlayerHtml('Sorry For Delay .......');
  const pLayersContainerNode = document.querySelector(".ContentWrapper");
  pLayersContainerNode.innerHTML=ContentHtml;
}

onPageLoad();


  // addEventListener version
  const input = document.querySelector(".SearchPlayer");

  input.addEventListener("search", () => {
    searchText[0] = input.value;
    console.log(searchText);
    showFilterdHtml();
  });
  SideBarFunctionality();
};
