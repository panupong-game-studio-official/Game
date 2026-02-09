const canvas = document.getElementById('worldCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

// ฐานข้อมูลลักษณะทางกายภาพ
const hairColors = ["#442211", "#221100", "#DDAA66", "#884422", "#000000"];
const eyeColors = ["#114422", "#223366", "#442211", "#333333"];
const clothColors = ["#cc3333", "#33cc33", "#3333cc", "#cccc33", "#cc33cc"];
const skinTones = ["#ffe0bd", "#ffdbac", "#8d5524", "#4b3020"];
const nationalities = ["Thai", "Japanese", "American", "Brazilian", "Nigerian"];
const namesByNation = {
    "Thai": ["Somchai", "Somsak", "Mali", "Kanya"],
    "Japanese": ["Hiroshi", "Yuki", "Kenji", "Hana"],
    "American": ["John", "Sarah", "Mike", "Emily"],
    "Brazilian": ["Lucas", "Julia", "Thiago", "Beatriz"],
    "Nigerian": ["Kofi", "Amara", "Chidi", "Zola"]
};

class Human {
    constructor(gender) {
        this.gender = gender;
        this.nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
        // NPC ตั้งชื่อตัวเองตามสัญชาติ
        const nameList = namesByNation[this.nationality];
        this.name = nameList[Math.floor(Math.random() * nameList.length)];
        
        // DNA เฉพาะตัว
        this.skin = skinTones[Math.floor(Math.random() * skinTones.length)];
        this.hair = hairColors[Math.floor(Math.random() * hairColors.length)];
        this.eye = eyeColors[Math.floor(Math.random() * eyeColors.length)];
        this.shirt = clothColors[Math.floor(Math.random() * clothColors.length)];
        
        // ตำแหน่งและการเคลื่อนที่
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.target = { x: this.x, y: this.y };
        this.energy = 100;
        this.isBlinking = false;
    }

    draw() {
        const { x, y, skin, hair, eye, shirt, name } = this;

        // 1. วาดตัว (เสื้อผ้า)
        ctx.fillStyle = shirt;
        ctx.fillRect(x - 8, y - 12, 16, 15); 
        
        // 2. วาดแขนและขา (มือเท้า)
        ctx.fillStyle = skin;
        ctx.fillRect(x - 12, y - 10, 4, 8); // แขนซ้าย
        ctx.fillRect(x + 8, y - 10, 4, 8);  // แขนขวา
        ctx.fillRect(x - 6, y + 3, 5, 8);   // ขาซ้าย
        ctx.fillRect(x + 1, y + 3, 5, 8);   // ขาขวา

        // 3. วาดหัวและผม
        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.arc(x, y - 20, 10, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = hair; // ผม
        ctx.fillRect(x - 10, y - 30, 20, 8);

        // 4. วาดตาและปาก (รายละเอียดใบหน้า)
        ctx.fillStyle = "white"; // ตาขาว
        ctx.fillRect(x - 5, y - 22, 3, 3);
        ctx.fillRect(x + 2, y - 22, 3, 3);
        
        ctx.fillStyle = eye; // รูม่านตา
        ctx.fillRect(x - 4, y - 21, 1.5, 1.5);
        ctx.fillRect(x + 3, y - 21, 1.5, 1.5);

        ctx.strokeStyle = "#aa3333"; // ปาก
        ctx.beginPath();
        ctx.arc(x, y - 16, 3, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // แสดงชื่อ
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${name} (${this.nationality})`, x, y - 35);
    }

    update() {
        // AI เดินเอง
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if (dist > 2) {
            this.x += dx / dist * 1.5;
            this.y += dy / dist * 1.5;
        } else {
            this.target.x = Math.random() * canvas.width;
            this.target.y = Math.random() * canvas.height;
        }
    }
}

// เริ่มการจำลอง
const world = [new Human("Male"), new Human("Female")];

function loop() {
    ctx.fillStyle = "#2d5a27"; // พื้นโลก
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    world.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(loop);
}
loop();
