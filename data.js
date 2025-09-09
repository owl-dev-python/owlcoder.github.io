// data.js — Local Storage Edition
const siteData = {
  portfolio: [],
  marketplace: []
};

// Initialize localStorage if empty
if (!localStorage.getItem('owldev_data')) {
  localStorage.setItem('owldev_data', JSON.stringify(siteData));
}
