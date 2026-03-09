const topNav = document.querySelector(".top-nav");
const navLinks = document.querySelectorAll(".top-nav a");
const sections = document.querySelectorAll("main section[id]");
const projectVideos = document.querySelectorAll("#projects video");
const body = document.body;

function toggleTopNavOnScroll() {
    if (!topNav) return;
    const shouldShow = window.scrollY > window.innerHeight * 0.75;
    topNav.classList.toggle("visible", shouldShow);
}

function toggleHeroCondensed() {
    if (!body) return;
    const shouldCondense = window.scrollY > window.innerHeight * 0.08;
    body.classList.toggle("hero-condensed", shouldCondense);
}

function updateActiveNavLink() {
    let currentSectionId = "";
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href")?.replace("#", "");
        link.classList.toggle("active", target === currentSectionId);
    });
}

function playVideoSafely(video) {
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
    }
}

function setupProjectVideoPriority() {
    if (!projectVideos.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.preload !== "metadata") {
                    video.preload = "metadata";
                    video.load();
                }
                playVideoSafely(video);
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.45 });

    projectVideos.forEach((video) => {
        observer.observe(video);
        video.addEventListener("mouseenter", () => playVideoSafely(video));
    });
}

window.addEventListener("scroll", toggleTopNavOnScroll, { passive: true });
window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("scroll", toggleHeroCondensed, { passive: true });
window.addEventListener("load", toggleTopNavOnScroll);
window.addEventListener("load", updateActiveNavLink);
window.addEventListener("load", setupProjectVideoPriority);
window.addEventListener("load", toggleHeroCondensed);

