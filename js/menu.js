export function showMenu() {
  const menu = document.getElementById("menu");

  menu.innerHTML = `
    <h1>🐒 Monkey Garden Run 🍌</h1>

    <button class="menu-btn" id="startBtn">▶️ เริ่มเกม</button>
    <button class="menu-btn">🐵 ตัวละคร</button>
    <button class="menu-btn">⚙️ ตั้งค่า</button>
    <button class="menu-btn">ℹ️ เครดิต</button>
  `;

  document.getElementById("startBtn")
    .addEventListener("click", startGame);
}

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";

  console.log("เข้าสู่เกม");
}
