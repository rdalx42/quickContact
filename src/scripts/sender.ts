import { showNotification } from "./notify";
import { URL } from "./glob";

type sendInfo = {
    mail: string;
    content: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getData(): sendInfo | undefined {
    const emailLabel = document.getElementById(
        "email-input"
    ) as HTMLInputElement | null;

    const contentLabel = document.getElementById(
        "textarea-input"
    ) as HTMLTextAreaElement | null;

    const email = emailLabel?.value.trim() ?? "";
    const content = contentLabel?.value.trim() ?? "";

    if (!email || !emailRegex.test(email)) {
        showNotification("Please enter a valid email!", "error");
        return;
    }

    const words = content.split(/\s+/).filter(Boolean);

    if (words.length < 10 || words.length > 5000) {
        showNotification(
            "Your message must contain at least 10 words and at most 5000!",
            "error"
        );
        return;
    }

    return {
        mail: email,
        content: content
    };
}

export function initSender() {
    const emailButton = document.getElementById(
        "send-button"
    ) as HTMLButtonElement | null;

    if (!emailButton) return;

    emailButton.addEventListener("click", async () => {
        const result: sendInfo | undefined = getData();

        if (!result) return;

        try {
            const response = await fetch(URL + "/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            });

            const data = await response.json();

            console.log("Response:", data);

            if (!response.ok) {
                showNotification("Failed to send message!", "error");
                return;
            }

            if(!data.status) {
                showNotification(data.err, "error");    
            } else {
                showNotification("Sent message!","success");
            }
        } catch (error) {
            console.error(error);
            showNotification(
                "Could not connect to the server!",
                "error"
            );
        }
    });
}