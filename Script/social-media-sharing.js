const getCurrentURL = window.location.href;
const encodeCurrentURL = encodeURIComponent(getCurrentURL);
const pageTitle = encodeURIComponent(document.title);
const pageDesc = document.querySelector('meta[name="description"]').content;
const encodedPageDesc = encodeURIComponent(pageDesc);

const fbShareQueryPost = `https://www.facebook.com/sharer.php?u=${encodeCurrentURL}`;
const TwitShareQueryPost = `https://twitter.com/intent/tweet?url=${encodeCurrentURL}&text=${pageTitle}`;
const linkedInShareQueryPost = `https://www.linkedin.com/shareArticle?url=${encodeCurrentURL}&title=${pageTitle}&summary=${encodedPageDesc}&source=${pageTitle}`;

const shareToLinkedIn = document.querySelector('#fb');

shareToLinkedIn.addEventListener("click", () => {   
   window.open(linkedInShareQueryPost, '_blank').focus();
});
