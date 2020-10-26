const matchListTopID = document.getElementById("match-list");
let inputSearchVal = document.getElementById("search");
const displayImageCover = document.querySelector("#imgCover");

if ((inputSearchVal.style.display = "block")) {
  // API Contoller
  const APIController = (function () {
    const clientId = "3e2bdd5e7a96439fa34f1b4d9424ccd0";
    const clientSecret = "17c49beb060949ed9cbb02e66490362b";

    // private methods
    const _getToken = async () => {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });

      const data = await result.json();
      return data.access_token;
    };

    const _getGenres = async (token) => {
      const result = await fetch(
        `https://api.spotify.com/v1/browse/categories`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );

      const data = await result.json();
      return data.categories.items;
    };

    const _getTracks = async (token, tracksEndPoint) => {
      const limit = 10;

      const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      const data = await result.json();
      return data.items;
    };

    const _getTrack = async (token, trackEndPoint) => {
      const result = await fetch(`${trackEndPoint}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      const data = await result.json();
      return data;
    };

    //search Songs
    const _searchTracks = async (token, searchKeyword) => {
      const searchResult = await fetch(
        `https://api.spotify.com/v1/search?q=${searchKeyword}&type=track%2Cartist`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );

      const data = await searchResult.json();
      // return data.tracks.items;

      const songsData = data.tracks.items;

      let matches = songsData.filter((song) => {
        const regex = new RegExp(`^${searchKeyword}`, "gi");
        return song.name.match(regex) || song.artists[0].name.match(regex);
      });

      if (searchKeyword.length == 1) {
        matches = [];
        matchListTopID.innerHTML = "";
      }

      return outputHtml(matches);
    };

    // Show results in HTML
    const outputHtml = (matches) => {
      if (matches.length > 0) {
        const html = matches
          .map(
            (match) => `
            <div class="card card-body mb-1">
                <a href="" id="${match.href}">
                    <h4>${match.name} <span> by ${match.artists[0].name}</span> </h4>
                    <small>Album: ${match.album.name}</small>
                </a>
            </div>  
            `
          )
          .join("");

        UIController.inputField().matchSearch.innerHTML = html;
      }
    };

    return {
      getToken() {
        return _getToken();
      },
      getGenres(token) {
        return _getGenres(token);
      },
      getTracks(token, tracksEndPoint) {
        return _getTracks(token, tracksEndPoint);
      },
      getTrack(token, trackEndPoint) {
        return _getTrack(token, trackEndPoint);
      },
      getSearchResults(token, searchKeyword) {
        return _searchTracks(token, searchKeyword);
      },
    };
  })();

  // UI Module
  const UIController = (function () {
    //object to hold references to html selectors
    const DOMElements = {
      mainControlRight: "#main-control",
      hfToken: "#hidden_token",
      searchTracks: "#search",
      matchList: "#match-list",
      imageCoverWrapper: "cover-img-wrapper-id",
    };

    //public methods
    return {
      //method to get input fields
      inputField() {
        return {
          mainControl: document.querySelector(DOMElements.mainControlRight),
          search: document.querySelector(DOMElements.searchTracks),
          matchSearch: document.querySelector(DOMElements.matchList),
        };
      },

      // need method to create a track list group item
      createTrack(id, name, artist) {
        const trackOrSong = document.querySelector(DOMElements.matchList);

        trackOrSong.innerHTML = "";

        const html = `<a href="" class="card card-body mb-1" id="${id}">${name} <span style="color:#2196f3;font-size:16px;font-weight:600;">by ${artist}</span> </a>`;
        document
          .querySelector(DOMElements.matchList)
          .insertAdjacentHTML("beforeend", html);
      },

      // need method to create the song detail
      createTrackDetail(img, title, artist) {
        const detailDiv = document.querySelector(DOMElements.mainControlRight);
        // any time user clicks a new song, we need to clear out the song detail div
        detailDiv.innerHTML = "";

        const html = `
            <div class="cover-image">
                <img id="spotify_imgCover" src="${img}" alt="Image Album Cover" style="display:block;">
            </div>
            <div class="title-wrapper">
                <div>
                <span class="svg-right-wrapper-black" id="svg-black">
                    <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff">
                        <rect x="100.00" y="44.50" width="6.71" height="11.00" rx="3.36" ry="3.36" />
                        <rect x="112.42" y="30.50" width="6.71" height="39.00" rx="3.36" ry="3.36" />
                        <rect x="124.84" y="44.50" width="6.71" height="11.00" rx="3.36" ry="3.36" />
                        <rect x="137.27" y="30.50" width="6.71" height="39.00" rx="3.36" ry="3.36" />
                        <rect x="149.69" y="30.50" width="6.71" height="39.00" rx="3.36" ry="3.36" />
                        <rect x="162.11" y="41.00" width="6.71" height="18.00" rx="3.36" ry="3.36" />
                        <rect x="174.53" y="34.00" width="6.71" height="32.00" rx="3.36" ry="3.36" />
                        <rect x="186.96" y="20.00" width="6.71" height="60.00" rx="3.36" ry="3.36" />
                        <rect x="199.38" y="23.50" width="6.71" height="53.00" rx="3.36" ry="3.36" />
                        <rect x="211.80" y="37.50" width="6.71" height="25.00" rx="3.36" ry="3.36" />
                        <rect x="224.22" y="20.00" width="6.71" height="60.00" rx="3.36" ry="3.36" />
                        <rect x="236.64" y="20.00" width="6.71" height="60.00" rx="3.36" ry="3.36" />
                        <rect x="249.07" y="23.50" width="6.71" height="53.00" rx="3.36" ry="3.36" />
                        <rect x="261.49" y="37.50" width="6.71" height="25.00" rx="3.36" ry="3.36" />
                        <rect x="273.91" y="34.00" width="6.71" height="32.00" rx="3.36" ry="3.36" />
                        <rect x="286.33" y="20.00" width="6.71" height="60.00" rx="3.36" ry="3.36" />
                        <rect x="298.76" y="44.50" width="6.71" height="11.00" rx="3.36" ry="3.36" />
                        <rect x="311.18" y="37.50" width="6.71" height="25.00" rx="3.36" ry="3.36" />
                        <rect x="323.60" y="23.50" width="6.71" height="53.00" rx="3.36" ry="3.36" />
                        <rect x="336.02" y="20.00" width="6.71" height="60.00" rx="3.36" ry="3.36" />
                        <rect x="348.44" y="23.50" width="6.71" height="53.00" rx="3.36" ry="3.36" />
                        <rect x="360.87" y="41.00" width="6.71" height="18.00" rx="3.36" ry="3.36" />
                        <rect x="373.29" y="44.50" width="6.71" height="11.00" rx="3.36" ry="3.36" />
                        <g transform="translate(20,20)">
                            <path
                                d="M30,0A30,30,0,1,1,0,30,30,30,0,0,1,30,0M43.73,43.2a1.85,1.85,0,0,0-.47-2.43,5,5,0,0,0-.48-.31,30.64,30.64,0,0,0-5.92-2.72,37.07,37.07,0,0,0-11.56-1.84c-1.33.07-2.67.12-4,.23a52.44,52.44,0,0,0-7.08,1.12,3.45,3.45,0,0,0-.54.16,1.83,1.83,0,0,0-1.11,2.08A1.79,1.79,0,0,0,14.37,41a4.29,4.29,0,0,0,.88-.12,48.93,48.93,0,0,1,8.66-1.15,35.33,35.33,0,0,1,6.75.37,28.29,28.29,0,0,1,10.25,3.61,4.77,4.77,0,0,0,.5.27,1.85,1.85,0,0,0,2.33-.74M47.41,35a2.34,2.34,0,0,0-.78-3.19l-.35-.21a35.72,35.72,0,0,0-7.38-3.3,45.39,45.39,0,0,0-15.7-2.13,41.19,41.19,0,0,0-7.39.92c-1,.22-2,.48-2.94.77A2.26,2.26,0,0,0,11.29,30a2.32,2.32,0,0,0,1.44,2.2,2.47,2.47,0,0,0,1.67,0,37,37,0,0,1,10.38-1.46,43,43,0,0,1,7.91.74,35.46,35.46,0,0,1,9.58,3.18c.66.34,1.3.72,1.95,1.08A2.33,2.33,0,0,0,47.41,35m.35-8.49A2.79,2.79,0,0,0,52,24.11c0-.2,0-.4-.08-.6a2.78,2.78,0,0,0-1.4-1.85,35.91,35.91,0,0,0-6.41-2.91,56.19,56.19,0,0,0-16.86-2.89,58.46,58.46,0,0,0-7,.21,48.31,48.31,0,0,0-6.52,1c-.87.2-1.73.42-2.58.7a2.73,2.73,0,0,0-1.85,2.68,2.79,2.79,0,0,0,2,2.61,2.9,2.9,0,0,0,1.6,0c.87-.23,1.75-.47,2.63-.66a45.52,45.52,0,0,1,7.26-.91,57.42,57.42,0,0,1,6.4,0,53.7,53.7,0,0,1,6.11.72,42.63,42.63,0,0,1,8.49,2.35,33.25,33.25,0,0,1,4,2" />
                        </g>
                    </svg>
                </span>

                    <div class="song-wrapper">
                        <div class="song-flex-div">
                            <p id="songName-id">${title}</p>
                            <span id="artist-Name">${artist}</span>
                            <span class="wish-icon">
                                <img class="black-icon"
                                    src="//cdn.shopify.com/s/files/1/0233/0430/6752/files/wishwhite.webp?v=1603267812"
                                    alt="heart icon">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="controller">
                <img class="black-icon"
                    src="//cdn.shopify.com/s/files/1/0233/0430/6752/files/whiteplayer.webp?v=1603267800"
                    alt="image player">
            </div> 
            `;

        detailDiv.insertAdjacentHTML("beforeend", html);
      },

      resetTrackDetail() {
        this.inputField().search.innerHTML = "";
      },

      storeToken(value) {
        document.querySelector(DOMElements.hfToken).value = value;
      },

      getStoredToken() {
        return {
          token: document.querySelector(DOMElements.hfToken).value,
        };
      },

      storeImageURL(imgURLVal) {
        document.querySelector(DOMElements.imageCoverURL).value = imgURLVal;
      },

      storeTitleOfTheSong(songTitle) {
        document.querySelector(DOMElements.searchTracks).value = songTitle;
      },
    };
  })();

  //App Controller
  const APPController = (function (UICtrl, APICtrl) {
    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
      //get the token
      const token = await APICtrl.getToken();
      //store the token onto the page
      UICtrl.storeToken(token);
      //get the genres
      const genres = await APICtrl.getGenres(token);
      console.log("Genres loaded successfully");
    };

    DOMInputs.search.addEventListener("input", async (e) => {
      e.preventDefault();
      //get the token that's stored on the page
      const token = UICtrl.getStoredToken().token;
      // get the playlist field
      const songOrAlbumRes = UICtrl.inputField().search;
      // get track endpoint based on the selected playlist
      const searchKeyword = songOrAlbumRes.value;
      // get the list of tracks
      APIController.getSearchResults(token, searchKeyword);

      matchListTopID.style.display = "block";
    });

    // create song selection click event listener
    DOMInputs.matchSearch.addEventListener("click", async (e) => {
      // prevent page reset
      e.preventDefault();
      UICtrl.resetTrackDetail();
      // get the token
      const token = UICtrl.getStoredToken().token;
      // get the track endpoint
      const trackEndpoint = e.target.id;
      //get the track object
      const track = await APICtrl.getTrack(token, trackEndpoint);
      // load the track details
      UICtrl.createTrackDetail(
        track.album.images[0].url,
        track.name,
        track.artists[0].name
      );

      const searchVal = track.name + " by: " + track.artists[0].name;

      matchListTopID.style.display = "none";

      UICtrl.storeTitleOfTheSong(searchVal);

      if (searchVal != "") {
        matchListTopID.innerHTML = "";
      }

      UICtrl.storeImageURL(track.album.images[0].url);
      document.getElementById("song-name-id-1").value = track.name;
      document.getElementById("artist-name-id-1").value = track.artists[0].name;

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });

    return {
      init() {
        console.log("App is starting");
        loadGenres();
      },
    };
  })(UIController, APIController);

  // will need to call a method to load the genres on page load
  APPController.init();
}
