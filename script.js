"use strict";

const setError = function (error) {
  document.querySelector(".error").textContent = error;
};

const validEmail = function (email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const validName = function (fullname) {
  var regex = /^[a-zA-Z ]{2,30}$/;
  return regex.test(fullname);
};

const navbarDark = function () {
  document.querySelector(".container-parent").classList.add("sticky");
  document
    .querySelectorAll(".link")
    .forEach((a) => a.classList.add("text-white"));
  document.querySelector(".logo").classList.add("text-white");
  document.querySelector(".container-parent").classList.add("navbar-bg");
};

const navbarLight = function () {
  document.querySelector(".container-parent").classList.remove("sticky");
  document
    .querySelectorAll(".link")
    .forEach((a) => a.classList.remove("text-white"));
  document.querySelector(".logo").classList.remove("text-white");
  document.querySelector(".container-parent").classList.remove("navbar-bg");
};

document.querySelector("#submit").addEventListener("click", function (e) {
  const fullName = document.querySelector("#full-name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  if (fullName === "") {
    setError("Full Name cannot be blank");
    e.preventDefault();
  } else if (!validName(fullName)) {
    setError("Full Name is not valid");
    e.preventDefault();
  }

  if (email === "") {
    setError("Email cannot be blank");
    e.preventDefault();
  } else if (!validEmail(email)) {
    setError("Please enter a valid email address");
    e.preventDefault();
  }

  if (message === "") {
    setError("Message cannot be blank");
    e.preventDefault();
  } else if (message.trim().replaceAll(" ", "").length < 10) {
    setError("Message should contain at least 10 characters long");
    e.preventDefault();
  }

  if (document.querySelector(".error").textContent !== "") {
    document.querySelector(".error").classList.remove("hidden");
  }
});

document.querySelector("#navbar").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("link")) {
    const link = e.target;
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });

    document
      .querySelectorAll(".link")
      .forEach((link) => link.classList.remove("current"));
    console.log(document.querySelectorAll(".link"));
    link.classList.add("current");
  }
});

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const navHeight = nav.getBoundingClientRect().height;

let entryIntersecting;

const stickyNav = function (entries) {
  const [entry] = entries;
  entryIntersecting = entry.isIntersecting;
  if (!entry.isIntersecting) {
    navbarDark();
  } else {
    navbarLight();
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-150px`,
});
headerObserver.observe(header);

const hamburger = document.querySelector(".nav-icon");
let click = 0;

hamburger.addEventListener("click", function () {
  document.querySelector(".nav-mobile").classList.toggle("hidden");
  document
    .querySelector(".nav-mobile")
    .classList.toggle("nav-mobile-animation");
  if (click % 2 === 0) navbarDark();
  if (click % 2 === 1 && entryIntersecting) navbarLight();
  if (document.querySelector(".nav-mobile").classList.contains("hidden")) {
    document.body.style.overflow = "visible";
  } else if (
    !document.querySelector(".nav-mobile").classList.contains("hidden")
  ) {
    document.body.style.overflow = "hidden";
  }
  console.log("It enters");
  click++;
});

document
  .querySelector(".navbar-mobile-links")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("link-mobile")) {
      e.preventDefault();
      const link = e.target;
      const id = link.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
      document.querySelector(".nav-mobile").classList.add("hidden");
      document.body.style.overflow = "visible";
    }
  });

document.querySelector(".btn-work").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#portfolio").scrollIntoView({
    behavior: "smooth",
  });
});

document.querySelector(".btn-contact").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#contact").scrollIntoView({
    behavior: "smooth",
  });
});
