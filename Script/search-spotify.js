// const matchListTopID = document.getElementById("match-list");
// let inputSearchVal = document.getElementById("search");
// const displayImageCover = document.querySelector("#imgCover");

//  // API Contoller
//  const APIController = (function () {
//   const clientId = "3e2bdd5e7a96439fa34f1b4d9424ccd0";
//   const clientSecret = "17c49beb060949ed9cbb02e66490362b";

//   // private methods
//   const _getToken = async () => {
//     const result = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//       },
//       body: "grant_type=client_credentials",
//     });

//     const data = await result.json();
//     return data.access_token;
//   };

//   const _getGenres = async (token) => {
//     const result = await fetch(
//       `https://api.spotify.com/v1/browse/categories`,
//       {
//         method: "GET",
//         headers: { Authorization: "Bearer " + token },
//       }
//     );

//     const data = await result.json();
//     return data.categories.items;
//   };

//   const _getTracks = async (token, tracksEndPoint) => {
//     const limit = 10;

//     const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
//       method: "GET",
//       headers: { Authorization: "Bearer " + token },
//     });

//     const data = await result.json();
//     return data.items;
//   };

//   const _getTrack = async (token, trackEndPoint) => {
//     const result = await fetch(`${trackEndPoint}`, {
//       method: "GET",
//       headers: { Authorization: "Bearer " + token },
//     });

//     const data = await result.json();
//     return data;
//   };

//   //search Songs
//   const _searchTracks = async (token, searchKeyword) => {
//     const searchResult = await fetch(
//       `https://api.spotify.com/v1/search?q=${searchKeyword}&type=track%2Cartist`,
//       {
//         method: "GET",
//         headers: { Authorization: "Bearer " + token },
//       }
//     );

//     const data = await searchResult.json();
//     // return data.tracks.items;

//     const songsData = data.tracks.items;

//     let matches = songsData.filter((song) => {
//       const regex = new RegExp(`^${searchKeyword}`, "gi");
//       return song.name.match(regex) || song.artists[0].name.match(regex);
//     });

//     if (searchKeyword.length == 1) {
//       matches = [];
//       matchListTopID.innerHTML = "";
//     }

//     return outputHtml(matches);
//   };

//   // Show results in HTML
//   const outputHtml = (matches) => {
//     if (matches.length > 0) {
//       const html = matches
//         .map(
//           (match) => `
//           <div class="card card-body mb-1">
//               <a href="" id="${match.href}">
//                   <h4>${match.name} <span> by ${match.artists[0].name}</span> </h4>
//                   <small>Album: ${match.album.name}</small>
//               </a>
//           </div>  
//           `
//         )
//         .join("");

//       UIController.inputField().matchSearch.innerHTML = html;
//     }
//   };

//   return {
//     getToken() {
//       return _getToken();
//     },
//     getGenres(token) {
//       return _getGenres(token);
//     },
//     getTracks(token, tracksEndPoint) {
//       return _getTracks(token, tracksEndPoint);
//     },
//     getTrack(token, trackEndPoint) {
//       return _getTrack(token, trackEndPoint);
//     },
//     getSearchResults(token, searchKeyword) {
//       return _searchTracks(token, searchKeyword);
//     },
//   };
// })();

// // UI Module
// const UIController = (function () {
//   //object to hold references to html selectors
//   const DOMElements = {
//     mainControlRight: "#main-control",
//     hfToken: "#hidden_token",
//     searchTracks: "#search",
//     matchList: "#match-list",
//     imageCoverURL: "#img_URL",
//     imageCoverWrapper: "#cover-img-wrapper-id",
//     insertSongTitle: "#songName-id",
//     insertArtistName: "#artist-Name",
//   };

//   //public methods
//   return {
//     //method to get input fields
//     inputField() {
//       return {
//         mainControl: document.querySelector(DOMElements.mainControlRight),
//         search: document.querySelector(DOMElements.searchTracks),
//         matchSearch: document.querySelector(DOMElements.matchList),
//       };
//     },

//     // need method to create a track list group item
//     createTrack(id, name, artist) {
//       const trackOrSong = document.querySelector(DOMElements.matchList);

//       trackOrSong.innerHTML = "";

//       const html = `<a href="" class="card card-body mb-1" id="${id}">${name} <span style="color:#2196f3;font-size:16px;font-weight:600;">by ${artist}</span> </a>`;
//       document
//         .querySelector(DOMElements.matchList)
//         .insertAdjacentHTML("beforeend", html);
//     },

//     // need method to create the song detail
//     createTrackDetail(img, title, artist) {
//       const insertIMGFrom = document.querySelector(
//         DOMElements.imageCoverWrapper
//       );
//       const insertSongTitleFrom = document.querySelector(
//         DOMElements.insertSongTitle
//       );
//       const insertArtistFrom = document.querySelector(
//         DOMElements.insertArtistName
//       );

//       insertIMGFrom.innerHTML = "";
//       insertSongTitleFrom.innerText = `${title}`;
//       insertArtistFrom.innerText = `${artist}`;
//       const albumCoverSpotify = `<img id="spotify_imgCover" src="${img}" alt="Image Album Cover" style="display:block;">`;
//       insertIMGFrom.insertAdjacentHTML("beforeend", albumCoverSpotify);
//     },

//     resetTrackDetail() {
//       this.inputField().search.innerHTML = "";
//     },

//     storeToken(value) {
//       document.querySelector(DOMElements.hfToken).value = value;
//     },

//     getStoredToken() {
//       return {
//         token: document.querySelector(DOMElements.hfToken).value,
//       };
//     },

//     storeImageURL(imgURLVal) {
//       document.querySelector(DOMElements.imageCoverURL).value = imgURLVal;
//     },

//     storeTitleOfTheSong(songTitle) {
//       document.querySelector(DOMElements.searchTracks).value = songTitle;
//     },
//   };
// })();

// //App Controller
// const APPController = (function (UICtrl, APICtrl) {
//   // get input field object ref
//   const DOMInputs = UICtrl.inputField();

//   // get genres on page load
//   const loadGenres = async () => {
//     //get the token
//     const token = await APICtrl.getToken();
//     //store the token onto the page
//     UICtrl.storeToken(token);
//     //get the genres
//     const genres = await APICtrl.getGenres(token);
//     console.log("Genres loaded successfully");
//   };

//   DOMInputs.search.addEventListener("input", async (e) => {
//     e.preventDefault();
//     //get the token that's stored on the page
//     const token = UICtrl.getStoredToken().token;
//     // get the playlist field
//     const songOrAlbumRes = UICtrl.inputField().search;
//     // get track endpoint based on the selected playlist
//     const searchKeyword = songOrAlbumRes.value;
//     // get the list of tracks
//     APIController.getSearchResults(token, searchKeyword);

//     matchListTopID.style.display = "block";
//   });

//   // create song selection click event listener
//   DOMInputs.matchSearch.addEventListener("click", async (e) => {
//     // prevent page reset
//     e.preventDefault();
//     UICtrl.resetTrackDetail();
//     // get the token
//     const token = UICtrl.getStoredToken().token;
//     // get the track endpoint
//     const trackEndpoint = e.target.id;
//     //get the track object
//     const track = await APICtrl.getTrack(token, trackEndpoint);
//     // load the track details
//     UICtrl.createTrackDetail(
//       track.album.images[0].url,
//       track.name,
//       track.artists[0].name
//     );

//     const searchVal = track.name + " by: " + track.artists[0].name;

//     matchListTopID.style.display = "none";

//     UICtrl.storeTitleOfTheSong(searchVal);

//     if (searchVal != "") {
//       matchListTopID.innerHTML = "";
//     }

//     UICtrl.storeImageURL(track.album.images[0].url);
//     document.getElementById("song-name-id-1").value = track.name;
//     document.getElementById("artist-name-id-1").value = track.artists[0].name;

//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
//   });

//   return {
//     init() {
//       console.log("App is starting");
//       loadGenres();
//     },
//   };
// })(UIController, APIController);

// // will need to call a method to load the genres on page load
// APPController.init();
