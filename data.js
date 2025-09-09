// data.js — CLEAN START — NO DEFAULT ITEMS
// data.js — CLEAN START
const siteData = {
  portfolio: [],
  marketplace: []
};

// Initialize localStorage only if it doesn't exist (so your edits won't be overwritten)
// Only initialize localStorage if it doesn't exist (so your edits are never overwritten)
if (!localStorage.getItem('owldev_data')) {
  localStorage.setItem('owldev_data', JSON.stringify(siteData));
}

