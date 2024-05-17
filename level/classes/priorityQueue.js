class PriorityQueue {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
        this.data.sort((a, b) => a.getlevelPriority() - b.getlevelPriority());
    }
    poll() {
        return this.data.shift();
    }
    isEmpty() {
        return this.data.length === 0;
    }
}