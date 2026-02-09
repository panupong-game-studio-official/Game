const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.getElementById('world-log'));

canvas.width = 800;
canvas.height = 400;
canvas.style.background = "#2d5a27"; // พื้นหญ้าสีเขียว
canvas.style.display = "block";
canvas.style.margin = "10px auto";
canvas.style.border = "4px solid #3e2723";

const logElement = document.getElementById('world-log');

function updateLog(message) {
    const time = new Date().toLocaleTimeString();
    logElement.innerHTML += `[${time}] ${message}<br>`;
    logElement.scrollTop = logElement.scrollHeight;
}

// --- ระบบสุ่มเชื้อชาติและกายภาพ ---
const ethnicities = [
    { name: "เอเชีย", skin: "#ffe0bd", traits: "ขยัน" },
    { name: "แอฟริกัน", skin: "#4b3020", traits: "แข็งแรง" },
    { name: "ยุโรป", skin: "#ffdbac", traits: "นักประดิษฐ์" },
    { name: "อเมริกาใต้", skin: "#8d5524", traits: "ว่องไว" }
];

class Human {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 15;
        this.speed = 2;
        
        // อัตลักษณ์จำเพาะ (Identity 100%)
        const eth = ethnicities[Math.floor(Math.random() * ethnicities.length)];
        this.ethnicity = eth.name;
        this.skinColor = eth.skin;
        this.height = Math.floor(Math.random() * (180 - 150) + 150); // ความสูงจำลอง
        
        this.hunger = 100;
        this.energy = 100;
        this.inventory = { wood: 0 };
        this.target = { x: this.x, y: this.y };
    }

    draw() {
        // วาดตัวละคร
        ctx.fillStyle = this.skinColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // แสดงชื่อและเชื้อชาติเหนือหัว
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.name} (${this.ethnicity})`, this.x, this.y - 20);
        
        // แถบพลังชีวิต/หิว
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - 10, this.y - 35, 20 * (this.hunger/100), 3);
    }

    update() {
        // เคลื่อนที่ไปยังเป้าหมาย
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        } else {
            // สุ่มจุดหมายใหม่ (เลียนแบบการสำรวจ)
            this.target.x = Math.random() * canvas.width;
            this.target.y = Math.random() * canvas.height;
            this.hunger -= 5;
            if(Math.random() > 0.95) updateLog(`${this.name} เดินสำรวจพื้นที่...`);
        }
    }
}

const adam = new Human("Adam", "ชาย");
const eve = new Human("Eve", "หญิง");

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // วาดพื้นหลัง/สิ่งของ (ไม้)
    ctx.fillStyle = "#5d4037";
    ctx.fillText("🌲 แหล่งไม้", 100, 100);

    adam.update();
    adam.draw();
    
    eve.update();
    eve.draw();

    requestAnimationFrame(animate);
}

animate();

// อัปเดตข้อมูล UI ด้านล่าง
setInterval(() => {
    document.getElementById('status-panel').innerHTML = `
        <div class="npc-card">
            <b>${adam.name}</b><br>เชื้อชาติ: ${adam.ethnicity}<br>สูง: ${adam.height} ซม.
        </div>
        <div class="npc-card">
            <b>${eve.name}</b><br>เชื้อชาติ: ${eve.ethnicity}<br>สูง: ${eve.height} ซม.
        </div>
    `;
}, 1000);
