export class StorageServiceMock {

    private map = new Map();

    public setItem(key, value) {
        this.map.set(key, value);
        return Promise.resolve();
    }

    public getItem(key) {
        const value = this.map.get(key);
        return Promise.resolve(value ? value : null);
    }

    public clean() {
        this.map.clear();
    }

}
