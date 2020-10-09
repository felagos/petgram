export class ActionSheetControllerMock {
    create(options) {
        console.log("create")
        return Promise.resolve({
            present: () => Promise.resolve()
        });
    }
}