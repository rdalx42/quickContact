export type NotificationType = "success" | "error" | "info";

export function showNotification(
	message: string,
	type: NotificationType = "info"
) {
	if (typeof document === "undefined") return;

	const notification = document.createElement("div");

	notification.textContent = message;

	const background = {
		success: "#3a9d68",
		error: "#c94b4b",
		info: "#4b78a8"
	}[type];

	Object.assign(notification.style, {
        position: "fixed",
        top: "28px",
        left: "50%",
        transform: "translate(-50%, -12px)",
        width: "500px",
        maxWidth: "80vw",
        padding: "18px 32px",
        borderRadius: "12px",
        backgroundColor: background,
        color: "#fff",
        fontFamily: "Roboto, sans-serif",
        fontSize: "17px",
        fontWeight: "800",
        textAlign: "center",
        zIndex: "9999",
        opacity: "0",
        transition: "opacity 180ms ease, transform 180ms ease",
        pointerEvents: "none",
    });

	document.body.appendChild(notification);

	requestAnimationFrame(() => {
		notification.style.opacity = "1";
		notification.style.transform = "translate(-50%, 0)";
	});

	setTimeout(() => {
		notification.style.opacity = "0";
		notification.style.transform = "translate(-50%, -12px)";

		setTimeout(() => {
			notification.remove();
		}, 180);
	}, 3000);
}