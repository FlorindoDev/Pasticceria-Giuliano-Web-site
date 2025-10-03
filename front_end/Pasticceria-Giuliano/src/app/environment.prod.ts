export const environment = {
    apiBaseUrl: "http://localhost:3000",
    myErrors: [400, 409, 401, 404, 500, 503, 403],
    //noProfilePic: "/logo.jpg",
    timeDiffFromCreation: (createdAt: Date): string => {

        let Diffmilliseconds = 0;

        Diffmilliseconds = Date.now() - new Date(createdAt).getTime();

        const seconds = Math.floor(Diffmilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(seconds / 3600);
        const days = Math.floor(seconds / 86400);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) return `${seconds} secondi fa`;
        if (minutes < 60) return `${minutes} minuti fa`;
        if (hours < 24) return `${hours} ore fa`;
        if (days < 30) return `${days} giorni fa`;
        if (months < 12) return `${months} mesi fa`;
        return `${years} anni fa`;


    }

};