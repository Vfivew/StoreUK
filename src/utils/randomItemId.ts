export function randomItemId() {
  const items = ["Котушки"]; //, "Rods", "Example"
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

