const getCurrentURL = window.location.href;
const encodeCurrentURL = encodeURIComponent(getCurrentURL);
const pageTitle = encodeURIComponent(document.title);
const pageDesc = document.querySelector('meta[name="description"]').content;
const encodedPageDesc = encodeURIComponent(pageDesc);

const fbShareQueryPost = `https://www.facebook.com/sharer.php?u=${encodeCurrentURL}`;
const TwitShareQueryPost = `https://twitter.com/intent/tweet?url=${encodeCurrentURL}&text=${pageTitle}`;
const linkedInShareQueryPost = `https://www.linkedin.com/shareArticle?url=${encodeCurrentURL}&title=${pageTitle}&summary=${encodedPageDesc}&source=${pageTitle}`;
const emailThisLink = `mailto:?subject=${pageTitle}&body=Read%20this%20article%20%22${pageTitle}%22%20on%20${getCurrentURL}`;

const shareToLinkedIn = document.querySelector("#fb");

shareToLinkedIn.addEventListener("click", () => {
  socialWindow(fbShareQueryPost, 570, 570);
});

function socialWindow(url, width, height) {
  var left = (window.innerWidth - width) / 2;
  var top = (window.innerHeight - height) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=" +
    width +
    ",height=" +
    height +
    ",top=" +
    top +
    ",left=" +
    left;  
  window.open(url, "", params);
}
