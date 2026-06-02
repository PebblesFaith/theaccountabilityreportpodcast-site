// public/scripts/main.js

/*
  The Accountability Report Podcast
  Browser-side interaction script.

  Handles:
  - mobile navigation
  - inactive story-tip form messaging
  - simple accessibility state updates
*/

(function initializeAccountabilityReportSite() {
  "use strict";

  function closeMobileNavigation(menuButton, primaryNavigation) {
    menuButton.setAttribute("aria-expanded", "false");
    primaryNavigation.classList.remove("is-open");
  }

  function openMobileNavigation(menuButton, primaryNavigation) {
    menuButton.setAttribute("aria-expanded", "true");
    primaryNavigation.classList.add("is-open");
  }

  function setupMobileNavigation() {
    const menuButton = document.querySelector("[data-menu-button]");
    const primaryNavigation = document.querySelector("[data-primary-navigation]");

    if (!menuButton || !primaryNavigation) {
      return;
    }

    menuButton.addEventListener("click", function handleMenuButtonClick() {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMobileNavigation(menuButton, primaryNavigation);
        return;
      }

      openMobileNavigation(menuButton, primaryNavigation);
    });

    primaryNavigation.addEventListener("click", function handleNavigationClick(event) {
      const clickedLink = event.target.closest("a");

      if (!clickedLink) {
        return;
      }

      closeMobileNavigation(menuButton, primaryNavigation);
    });

    document.addEventListener("keydown", function handleDocumentKeydown(event) {
      if (event.key !== "Escape") {
        return;
      }

      closeMobileNavigation(menuButton, primaryNavigation);
    });

    document.addEventListener("click", function handleDocumentClick(event) {
      const isInsideHeader = event.target.closest(".site-header");

      if (isInsideHeader) {
        return;
      }

      closeMobileNavigation(menuButton, primaryNavigation);
    });
  }

  function setupInactiveTipForm() {
    const tipForm = document.querySelector("[data-tip-form]");
    const tipFormStatus = document.querySelector("[data-tip-form-status]");

    if (!tipForm || !tipFormStatus) {
      return;
    }

    tipForm.addEventListener("submit", function handleTipFormSubmit(event) {
      event.preventDefault();

      tipFormStatus.textContent =
        "This feature is not active yet. Please check back after the official launch.";
      tipFormStatus.classList.add("is-visible");
      tipFormStatus.setAttribute("role", "status");
      tipFormStatus.setAttribute("aria-live", "polite");

      const submitButton = tipForm.querySelector("button[type='submit']");

      if (submitButton) {
        submitButton.focus();
      }
    });
  }

  function setupComingSoonButtons() {
    const comingSoonButtons = document.querySelectorAll("[data-coming-soon]");
    const message =
      "Podcast platforms are coming soon. Official links will be added after the podcast channels are active.";

    comingSoonButtons.forEach(function prepareComingSoonButton(button) {
      button.addEventListener("click", function handleComingSoonClick(event) {
        event.preventDefault();

        const existingMessage = button.parentElement.querySelector(".form-status");

        if (existingMessage) {
          existingMessage.textContent = message;
          existingMessage.classList.add("is-visible");
          return;
        }

        const statusMessage = document.createElement("p");
        statusMessage.className = "form-status is-visible";
        statusMessage.setAttribute("role", "status");
        statusMessage.setAttribute("aria-live", "polite");
        statusMessage.textContent = message;

        button.parentElement.appendChild(statusMessage);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function handleDomContentLoaded() {
    setupMobileNavigation();
    setupInactiveTipForm();
    setupComingSoonButtons();
  });
})();