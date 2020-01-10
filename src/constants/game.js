export const characterTemplate = {
  user: null,
  name: null,
  class: null,
  game: null,
  gear: {
    clothing: "",
    armor: "",
    shield: "",
    weapon: "",
  },
  magicGear: {
    head: "",
    headband: "",
    face: "",
    neck: "",
    shoulders: "",
    chest: "",
    body: "",
    wrists: "",
    hands: "",
    belt: "",
    feet: "",
    ring1: "",
    ring2: "",
    slotless: ""
  },
  inventory: null,
  notes: null,
  strength: 10,
  weight: 0,
  wealth: {
    platinum: 0,
    gold: 0,
    silver: 0,
    copper: 0
  }
}

export const itemTypes = [
  { text: "Armor", value: "armor" },
  { text: "Kit", value: "kit" },
  { text: "Potion", value: "potion" },
  { text: "Clothing", value: "clothing" },
  { text: "Scroll", value: "scroll" },
  { text: "Weapon", value: "weapon" },
  { text: "Wondrous item", value: "wondrousItem" },
]