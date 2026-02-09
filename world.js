// --- การตั้งค่าโลก ---
const logElement = document.getElementById('world-log');
const statusPanel = document.getElementById('status-panel');

function updateLog(message) {
    const time = new Date().toLocaleTimeString();
    logElement.innerHTML += `[${time}] ${message}<br>`;
    logElement.scrollTop = logElement.scrollHeight;
}

// --- คลาส NPC มนุษย์ (Phase 2) ---
class Human {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
        this.hunger = 100;
        this.energy = 100;
        this.social = 50; // ความต้องการทางสังคม
        this.relationship = 0; // ค่าความสัมพันธ์กับอีกคน
        this.status = "เริ่มต้นชีวิต";
        this.inventory = { food: 5, wood: 0 };
    }

    // ระบบตัดสินใจ (Brain Phase 2)
    think(partner) {
        // 1. ตรวจสอบความหิว
        if (this.hunger < 40) {
            this.action("หาอาหาร");
            this.hunger += 40;
            this.inventory.food++;
        } 
        // 2. ตรวจสอบความเหนื่อย
        else if (this.energy < 30) {
            this.action("พักผ่อนงีบหลับ");
            this.energy += 50;
        } 
        // 3. ระบบสังคม: ถ้าเหงา ให้ไปคุยกับ partner
        else if (this.social < 40 || Math.random() > 0.7) {
            this.socialize(partner);
        }
        // 4. ถ้าทุกอย่างโอเค ให้ไปตัดไม้เตรียมสร้างบ้าน
        else {
            this.action("ไปตัดไม้เก็บสะสม");
            this.inventory.wood += 2;
            this.energy -= 15;
            this.hunger -= 10;
        }
        
        this.updateUI();
    }

    socialize(other) {
        this.status = `คุยกับ ${other.name}`;
        this.social += 30;
        this.relationship += 5;
        
        const dialogues = [
            `"วันนี้อากาศดีนะ ${other.name}"`,
            `"เรามาช่วยกันสร้างบ้านกันเถอะ"`,
            `"คุณหิวหรือเปล่า?"`,
            `"ฉันดีใจที่มีคุณอยู่ในโลกนี้ด้วย"`
        ];
        const randomChat = dialogues[Math.floor(Math.random() * dialogues.length)];
        
        updateLog(`<span style="color: #ff99cc;"><b>${this.name}:</b> ${randomChat}</span>`);
        updateLog(`<i>* ค่าความสัมพันธ์เพิ่มขึ้น (${this.relationship}) *</i>`);
    }

    action(act) {
        this.status = act;
        this.hunger -= 5;
        this.energy -= 5;
        this.social -= 5;
        updateLog(`<b>${this.name}</b> กำลัง${act}...`);
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
            <h3>${this.name} (${this.gender})</h3>
            <p>📍 สถานะ: <b>${this.status}</b></p>
            <p>🍕 หิว: ${this.hunger}% | ⚡ พลัง: ${this.energy}%</p>
            <p>❤️ ความสัมพันธ์: ${this.relationship}</p>
            <p>🎒 ของในกระเป๋า: 🍎x${this.inventory.food} 🪵x${this.inventory.wood}</p>
        `;
    }
}

// --- เริ่มต้นระบบ ---
const adam = new Human("Adam", "ชาย");
const eve = new Human("Eve", "หญิง");

// วนลูปจำลอง (ปรับเป็น 4 วินาทีเพื่อให้คุณอ่าน Log ทัน)
setInterval(() => {
    // ให้ Adam คิดโดยมี Eve เป็นคู่สนทนา และสลับกัน
    adam.think(eve);
    setTimeout(() => eve.think(adam), 2000); 
}, 4000);
