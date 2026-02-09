// --- การตั้งค่าโลก ---
const logElement = document.getElementById('world-log');
const statusPanel = document.getElementById('status-panel');

function updateLog(message) {
    const time = new Date().toLocaleTimeString();
    logElement.innerHTML += `[${time}] ${message}<br>`;
    logElement.scrollTop = logElement.scrollHeight;
}

// --- คลาส NPC ---
class Human {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
        this.hunger = 100;
        this.energy = 100;
        this.status = "ปกติ";
        this.inventory = { food: 0, wood: 0 };
    }

    // ส่วนที่ AI ใช้ตัดสินใจ (AI Brain Phase 1)
    think() {
        if (this.hunger < 50) {
            this.action("หาอาหาร");
            this.hunger += 30;
            this.inventory.food++;
        } else if (this.energy < 30) {
            this.action("พักผ่อน");
            this.energy += 40;
        } else {
            this.action("สำรวจพื้นที่");
            this.hunger -= 10;
            this.energy -= 10;
        }
        this.updateUI();
    }

    action(act) {
        this.status = act;
        updateLog(`<b>${this.name}</b> (${this.gender}) กำลัง${act}...`);
    }

    updateUI() {
        let card = document.getElementById(`npc-${this.name}`);
        if (!card) {
            card = document.createElement('div');
            card.id = `npc-${this.name}`;
            card.className = 'npc-card';
            statusPanel.appendChild(card);
        }
        card.innerHTML = `
            <h3>${this.name}</h3>
            <p>สถานะ: ${this.status}</p>
            <p>ความหิว: ${this.hunger}%</p>
            <p>พลังงาน: ${this.energy}%</p>
            <p>เสบียง: 🍎x${this.inventory.food} 🪵x${this.inventory.wood}</p>
        `;
    }
}

// --- เริ่มต้นระบบ ---
const adam = new Human("Adam", "ชาย");
const eve = new Human("Eve", "หญิง");

// วนลูปการจำลองทุก 3 วินาที
setInterval(() => {
    adam.think();
    eve.think();
}, 3000);
