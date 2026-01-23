export function showMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = `
    <h1>🐒 Monkey Garden Run 🍌</h1>
    <button onclick="startGame()">▶️ เริ่มเกม</button>
  `;
}
