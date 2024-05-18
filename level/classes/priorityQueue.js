class PriorityQueue {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
        this.data.sort((a, b) => a.getPriority() - b.getPriority());
    }
    poll() {
        return this.data.shift();
    }
    isEmpty() {
        return this.data.length === 0;
    }
}