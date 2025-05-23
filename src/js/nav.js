// nav.js
const CSbody = document.querySelector("body");
const CSnavbarMenu = document.getElementById("cs-navigation");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const csUL = document.querySelector("#cs-expanded");

// Toggle mobile menu and aria-expanded
function toggleMenu() {
  if (mobileMenuToggle && CSnavbarMenu && csUL) {
    mobileMenuToggle.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    csUL.setAttribute("aria-expanded", csUL.getAttribute("aria-expanded") === "false" ? "true" : "false");
  }
}

// Dropdown toggle
function setupDropdowns() {
  const dropDowns = Array.from(document.querySelectorAll("#cs-navigation .cs-dropdown"));
  dropDowns.forEach((item) => {
    const parentLink = item.querySelector(".cs-li-link:not(.cs-drop-link)");
    if (parentLink) {
      parentLink.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const isActive = item.classList.contains("cs-active");
        item.classList.toggle("cs-active");
        if (isActive) {
          window.location.href = parentLink.getAttribute("href");
        }
      });
    }
  });
}

// Ensure DOM is loaded before setting up event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMenu);
  }

  // Setup dropdowns
  setupDropdowns();

  // Handle active state for navigation links
  const links = document.querySelectorAll("#cs-navigation .cs-li-link");
  const currentUrl = window.location.pathname;
  const normalizeUrl = (url) => (url ? url.replace(/\/$/, "") : "");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkUrl = normalizeUrl(href);
    const isActive = linkUrl === normalizeUrl(currentUrl);

    const parentDropdown = link.closest(".cs-dropdown");

    // Only apply cs-active to the link that matches the current URL
    if (isActive) {
      link.classList.add("cs-active");
    } else {
      link.classList.remove("cs-active");
    }

    // If the link is a parent and has an active child, add cs-active
    if (parentDropdown && !link.classList.contains("cs-drop-link")) {
      const childLinks = parentDropdown.querySelectorAll(".cs-drop-link");
      const hasActiveChild = Array.from(childLinks).some(
        (child) => child.getAttribute("href") && normalizeUrl(child.getAttribute("href")) === normalizeUrl(currentUrl)
      );
      if (hasActiveChild) {
        link.classList.add("cs-active");
      }
    }
  });
});