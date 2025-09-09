// data.js — CLEAN START
const siteData = {
  portfolio: [],
  marketplace: []
};

// Only initialize localStorage if it doesn't exist (so your edits are never overwritten)
if (!localStorage.getItem('owldev_data')) {
  localStorage.setItem('owldev_data', JSON.stringify(siteData));
}
