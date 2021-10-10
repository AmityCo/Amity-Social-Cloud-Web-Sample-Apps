export async function asynchronize (liveThing, immediately = true){
    if (
        immediately &&
        ((liveThing.models && liveThing.models.length) || liveThing.model)
    )

        return liveThing.models || liveThing.model;

    return new Promise((resolve, reject) => {
        // we wrap the resolve in setTimeout(0) to allow 'hasMore' to refresh for live collection (reactive related bug.)
        liveThing.once("dataUpdated", (data) =>
            setTimeout(() => {
                resolve(data);
            }, 0)
        );
    })
}