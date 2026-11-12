window.SITE_CONFIG = {
    email: "akash2001tomar@gmail.com",
    githubUrl: "",
    linkedinUrl: "",
    resumeUrl: "https://drive.google.com/file/d/1DkE8AuTRDm6GW06UuEiXRYunRGoVBXl4/view?usp=sharing",
    supplyChainRepo: "",
    supplyChainDemo: "",
    stakingRepo: "",
    stakingDemo: "",
    nftRepo: "",
    nftDemo: "",
    votingRepo: "",
    votingDemo: "https://dvotingdapp.netlify.app/",
    walletRepo: "",
    walletDemo: ""
};

const config = window.SITE_CONFIG;
const configuredLinks = document.querySelectorAll("[data-config-link]");

configuredLinks.forEach((link) => {
    const url = config[link.dataset.configLink];

    if (url) {
        link.href = url;
        if (/^https?:\/\//i.test(url)) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        return;
    }

    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.title = "Add this URL in site.js";
    if (link.closest(".project-links")) {
        link.textContent = link.textContent.replace("Source code", "Source link pending").replace("Live demo", "Demo link pending");
    }
});

document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${config.email}`;
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        navLinks.classList.remove("is-open");
    });
});

const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
        });
    });
}, { rootMargin: "-30% 0px -60% 0px" });

sections.forEach((section) => sectionObserver.observe(section));
document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = `Portfolio inquiry from ${formData.get("name")}`;
    const body = `${formData.get("message")}\n\nFrom: ${formData.get("name")} (${formData.get("email")})`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formNote.textContent = "Your email app should open with the message ready to send.";
});