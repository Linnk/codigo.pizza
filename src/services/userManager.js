import { v4 as uuidv4 } from 'uuid';

class UserManager {
    constructor() {
        this.userId = uuidv4();
        this.userName = this.generateRandomName();
    }

    generateRandomName() {
        const adjectives = ['Cool', 'Swift', 'Bright', 'Smart', 'Quick', 'Bold', 'Calm', 'Wise', 'Kind', 'Brave'];
        const nouns = ['Coder', 'Developer', 'Programmer', 'Hacker', 'Builder', 'Creator', 'Maker', 'Wizard', 'Ninja', 'Master'];
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const number = Math.floor(Math.random() * 999) + 1;
        
        return `${adjective}${noun}${number}`;
    }

    getUserId() {
        return this.userId;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(name) {
        if (name && name.trim()) {
            this.userName = name.trim();
        }
    }

}

export default UserManager;