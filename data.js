// Store all editable content here
const siteData = {
  portfolio: [
    {
      id: 1,
      title: "Sky Adventures",
      description: "An open-world flying RPG with dynamic weather and quests.",
      image: "https://via.placeholder.com/400x220/4f46e5/ffffff?text=Sky+Adventures",
      tags: ["Full Game", "RPG"]
    },
    {
      id: 2,
      title: "Modular House Pack",
      description: "Highly customizable building pieces for any Roblox environment.",
      image: "https://via.placeholder.com/400x220/059669/ffffff?text=Modular+House+Pack",
      tags: ["3D Asset", "Building"]
    },
    {
      id: 3,
      title: "Advanced Combat System",
      description: "Modular, easy-to-integrate combat system with hit detection and animations.",
      image: "https://via.placeholder.com/400x220/dc2626/ffffff?text=Advanced+Combat+System",
      tags: ["Script", "Combat"]
    },
    {
      id: 4,
      title: "Fantasy Weapon Set",
      description: "Stylized weapons perfect for medieval or fantasy-themed games.",
      image: "https://via.placeholder.com/400x220/7c3aed/ffffff?text=Fantasy+Weapon+Set",
      tags: ["3D Asset", "Weapons"]
    }
  ],
  marketplace: [
    {
      id: 1,
      title: "Magic Spells Pack",
      description: "10 unique spell effects with particle systems and sound cues.",
      image: "https://via.placeholder.com/400x220/f59e0b/ffffff?text=Magic+Spells+Pack",
      price: "Free",
      note: "Interested? DM me on Discord: owl_coder"
    },
    {
      id: 2,
      title: "Advanced Vehicle Controller",
      description: "Realistic physics-based vehicle system with customization options.",
      image: "https://via.placeholder.com/400x220/ef4444/ffffff?text=Vehicle+Controller",
      price: "$15",
      note: "Interested? DM me on Discord: owl_coder"
    },
    {
      id: 3,
      title: "UI Kit Pro",
      description: "Modern, responsive UI components for any Roblox game interface.",
      image: "https://via.placeholder.com/400x220/10b981/ffffff?text=UI+Kit+Pro",
      price: "$10",
      note: "Interested? DM me on Discord: owl_coder"
    }
  ]
};

// Save to localStorage for persistence
if (!localStorage.getItem('owldev_data')) {
  localStorage.setItem('owldev_data', JSON.stringify(siteData));
}