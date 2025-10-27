export const environment = {
    apiBaseUrl: "http://localhost:3000",
    myErrors: [400, 409, 401, 404, 500, 503, 403],
    /*
    activeLoadingScreen: (): void => {
        const element = document.getElementById("Loading-Screen") as HTMLElement | null;

        if (!element) return;

        if (element.classList.contains("hidden")) {

            element.classList.remove("hidden");
            element.classList.add("block");
        } else {

            element.classList.remove("block");
            element.classList.add("hidden");
        }
    }*/

};