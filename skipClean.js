(function skipClean() {
    if (!Spicetify?.Player?.addEventListener || !Spicetify?.Playbar) {
        setTimeout(skipClean, 1000);
        return;
    }

    let enabled = localStorage.getItem("skipClean.enabled") !== "false";
    let consecutiveSkips = 0;
    const MAX_SKIPS = 15;

    const button = new Spicetify.Playbar.Button(
        "Skip Clean Songs",
        Spicetify.SVGIcons["exclamation-circle"],
        (self) => {
            enabled = !enabled;
            self.active = enabled;
            localStorage.setItem("skipClean.enabled", String(enabled));
            Spicetify.showNotification(enabled ? "Skip Clean: ON" : "Skip Clean: OFF");
        },
        false,
        enabled
    );

    function fixButtonIcon() {
        const buttons = document.querySelectorAll(".main-nowPlayingBar-extraControls button");
        for (const btn of buttons) {
            const span = btn.querySelector("span");
            if (span && span.firstElementChild?.tagName.toLowerCase() === "path") {
                span.innerHTML = "";
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 0 16 16");
                svg.setAttribute("width", "16");
                svg.setAttribute("height", "16");
                svg.setAttribute("fill", "currentColor");
                svg.innerHTML = Spicetify.SVGIcons["exclamation-circle"];
                span.appendChild(svg);
                return;
            }
        }
        setTimeout(fixButtonIcon, 500);
    }

    setTimeout(fixButtonIcon, 500);

    function checkAndSkip() {
        if (!enabled) return;

        const item = Spicetify.Player.data?.item;
        if (!item) return;

        if (!item.isExplicit) {
            if (consecutiveSkips >= MAX_SKIPS) {
                Spicetify.showNotification("⚠️ No explicit tracks found, stopping.");
                consecutiveSkips = 0;
                return;
            }
            consecutiveSkips++;
            Spicetify.showNotification(`Skipping clean version... (${consecutiveSkips}/${MAX_SKIPS})`);
            Spicetify.Player.next();
        } else {
            consecutiveSkips = 0;
        }
    }

    Spicetify.Player.addEventListener("songchange", checkAndSkip);
})();
