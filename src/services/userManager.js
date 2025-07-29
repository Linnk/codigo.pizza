import { v4 as uuidv4 } from 'uuid';

class UserManager {
    constructor() {
        this.userId = uuidv4();
        this.userName = this.loadUserName() || this.generateRandomName();
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
        const newName = name.trim();
        if (newName) {
            this.userName = newName;
            try {
                localStorage.setItem('codigo_pizza_userName', newName);
            } catch (error) {
                console.warn('Failed to save userName to localStorage:', error);
            }
        }
    }

    loadUserName() {
        try {
            return localStorage.getItem('codigo_pizza_userName');
        } catch (error) {
            console.warn('Failed to load userName from localStorage:', error);
            return null;
        }
    }
}

export default UserManager;