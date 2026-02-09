const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');
const statsDiv = document.getElementById('stats');

canvas.width = 800;
canvas.height = 500;

// ระบบสุ่มอัตลักษณ์ (เชื้อชาติ/สีผิว/กายภาพ)
const ethnicities = [
    { name: "Asian", skin: "#ffe0bd", speed: 1.2 },
    { name: "African", skin: "#4b3020", speed: 1.4 },
    { name: "European", skin: "#ffdbac", speed: 1.1 },
    { name: "Latino", skin: "#8d5524", speed: 1.3 }
];

class Human {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = this.x;
        this.targetY = this.y;
        
        // สุ่มลักษณะทางกายภาพ
        const eth = ethnicities[Math.floor(Math.random() * ethnicities.length)];
        this.ethnicity = eth.name;
        this.skinColor = eth.skin;
        this.speed = eth.speed;
        this.size = 8; // ขนาดตัวละครแบบ Pixel Art style
        
        this.hunger = 100;
        this.energy = 100;
        this.isSleeping = false;
        this.action = "เดินสำรวจ";
    }

    draw() {
        // วาดเงา
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 10, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // วาดตัวละคร (ร่าง)
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(this.x - 5, this.y - 15, 10, 15); // ลำตัว
        
        // วาดหัว
        ctx.beginPath();
        ctx.arc(this.x, this.y - 18, 5, 0, Math.PI * 2);
        ctx.fill();

        // เกจพลังงานเหนือหัว (แดง = หิว, เขียว = พลังงาน)
        ctx.fillStyle = "#333";
        ctx.fillRect(this.x - 10, this.y - 30, 20, 4);
        ctx.fillStyle = this.energy > 30 ? "#00ff00" : "#ff0000";
        ctx.fillRect(this.x - 10, this.y - 30, 20 * (this.energy / 100), 4);

        // ชื่อ
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(this.name, this.x - 10, this.y - 35);
    }

    update() {
        if (this.isSleeping) {
            this.energy += 0.5;
            this.action = "💤 กำลังนอนหลับ";
            if (this.energy >= 100) this.isSleeping = false;
            return;
        }

        // ความต้องการพื้นฐาน
        this.hunger -= 0.05;
        this.energy -= 0.03;

        if (this.energy < 20) {
            this.isSleeping = true;
            return;
        }

        // เดินไปยังเป้าหมาย
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
            this.action = "🏃 กำลังเดิน";
        } else {
            // สุ่มที่หมายใหม่เหมือนคนเดินเล่น
            this.targetX = Math.random() * canvas.width;
            this.targetY = Math.random() * canvas.height;
            this.action = "📍 กำลังสำรวจ";
        }
    }
}

// สร้าง Adam และ Eve
const people = [
    new Human("Adam", "ชาย"),
    new Human("Eve", "หญิง")
];

function gameLoop() {
    // วาดพื้นหญ้าแบบมี Texture เล็กน้อย
    ctx.fillStyle = "#2d5a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // วาดทรัพยากรจำลอง (พุ่มไม้/หิน)
    ctx.fillStyle = "#1b3a1a";
    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, Math.PI*2); ctx.fill(); 
    ctx.arc(600, 300, 25, 0, Math.PI*2); ctx.fill();

    let statsHTML = "";
    people.forEach(p => {
        p.update();
        p.draw();
        statsHTML += `
            <div class="stat-box">
                <b>${p.name} (${p.ethnicity})</b><br>
                ${p.action}<br>
                🩸 หิว: ${Math.floor(p.hunger)}% | ⚡ พลัง: ${Math.floor(p.energy)}%
            </div>
        `;
    });
    statsDiv.innerHTML = statsHTML;

    requestAnimationFrame(gameLoop);
}

gameLoop();
