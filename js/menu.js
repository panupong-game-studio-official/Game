export function showMenu(startGame) {
  const menu = document.getElementById("menu");

  menu.innerHTML = `
    <h1>🐒 Monkey Run</h1>
    <button id="startBtn">▶ เริ่มเกม</button>
  `;

  document.getElementById("startBtn").onclick = () => {
    menu.style.display = "none";
    startGame(); // 🔥 ตรงนี้สำคัญ
  };
}
