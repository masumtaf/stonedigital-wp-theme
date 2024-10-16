// table of contents script for ice cargo theme
let tocId = "table-of-contents__nav";
let headings;
let headingIds = [];
let headingIntersectionData = {};
let headerObserver;

// Function to add 'active' class to a link
function setLinkActive(link) {
  const links = document.querySelectorAll(`#table-of-contents__nav a`);
  links.forEach((link) => link.classList.remove("active"));
  const observed = document.querySelectorAll(
    `#table-of-contents__nav .observed`
  );
  observed.forEach((observed) => observed.classList.remove("observed"));
  if (link) {
    link.classList.add("active");

    const observed = link.parentElement.parentElement;
    // add class oberserved to the ul.submenu
    observed.classList.add("observed");
    // add display block to the ul.submenu
    // observed.style.display = "block";
  }
}

function getProperListSection(heading, previousHeading, currentListElement) {
  let listSection = currentListElement;
  if (previousHeading) {
    if (heading.tagName.slice(-1) > previousHeading.tagName.slice(-1)) {
      let nextSection = document.createElement("ul");

      // add submenus class to ul tag
      nextSection.classList.add("submenu");

      listSection.appendChild(nextSection);
      return nextSection;
    } else if (heading.tagName.slice(-1) < previousHeading.tagName.slice(-1)) {
      let indentationDiff =
        parseInt(previousHeading.tagName.slice(-1)) -
        parseInt(heading.tagName.slice(-1));
      while (indentationDiff > 0) {
        listSection = listSection.parentElement;
        indentationDiff--;
      }
    }
  }
  return listSection;
}

function setIdFromContent(element, appendedId) {
  if (!element.id) {
    element.id = `${element.innerHTML
      .replace(/:/g, "")
      .trim()
      .toLowerCase()
      .split(" ")
      .join("-")}-${appendedId}`;
  }
}

function addNavigationLinkForHeading(heading, currentSectionList) {
  let listItem = document.createElement("li");
  let anchor = document.createElement("a");
  anchor.innerHTML = heading.innerHTML;
  anchor.id = `${heading.id}-link`;
  anchor.href = `#${heading.id}`;
  anchor.onclick = (e) => {
    setTimeout(() => {
      setLinkActive(anchor);
    });
  };
  listItem.appendChild(anchor);
  currentSectionList.appendChild(listItem);
}

function buildTableOfContentsFromHeadings() {
  const tocElement = document.querySelector(`#${tocId}`);
  const main = document.querySelector(".stdl-post-content-left");
  if (!main) {
    throw Error("A `main` tag section is required to query headings from.");
  }
  headings = main.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let previousHeading;
  let currentSectionList = document.createElement("ul");
  tocElement.appendChild(currentSectionList);

  headings.forEach((heading) => {
    heading.innerHTML = heading.innerHTML
      .replace(/<strong>/g, "")
      .replace(/<\/strong>/g, "");
  });

  // remove em tags from headings
  headings.forEach((heading) => {
    heading.innerHTML = heading.innerHTML
      .replace(/<em>/g, "")
      .replace(/<\/em>/g, "");
  });

  headings.forEach((heading, index) => {
    currentSectionList = getProperListSection(
      heading,
      previousHeading,
      currentSectionList
    );
    setIdFromContent(heading, index);
    addNavigationLinkForHeading(heading, currentSectionList);

    headingIds.push(heading.id);
    headingIntersectionData[heading.id] = {
      y: 0,
    };
    previousHeading = heading;
  });
}

function updateActiveHeadingOnIntersection(entry) {
  const previousY = headingIntersectionData[entry.target.id].y;
  const currentY = entry.boundingClientRect.y;
  const id = `#${entry.target.id}`;
  const link = document.querySelector(id + "-link");
  const index = headingIds.indexOf(entry.target.id);

  if (entry.isIntersecting) {
    if (currentY > previousY && index !== 0) {
      console.log(id + ":1 enter top");
    } else {
      console.log(id + ":2 enter bottom");
      setLinkActive(link);
    }
  } else {
    if (currentY > previousY) {
      console.log(id + ":3 leave bottom");
      const lastLink = document.querySelector(`#${headingIds[index - 1]}-link`);
      setLinkActive(lastLink);
    } else {
      console.log(id + ":4 leave top");
    }
  }

  headingIntersectionData[entry.target.id].y = currentY;
}

// Function to observe headings and update active link
function observeHeadings() {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = document.querySelector(
            `#table-of-contents__nav a[href='#${entry.target.id}']`
          );
          if (activeLink) {
            setLinkActive(activeLink);
          }
        }
      });
    },
    { rootMargin: "0px 0px -75% 0px", threshold: 1.0 }
  ); // Adjust rootMargin and threshold as needed

  headings.forEach((heading) => observer.observe(heading));
}

// Initialize the observer on DOMContentLoaded
document.addEventListener("DOMContentLoaded", observeHeadings);

window.addEventListener("load", (event) => {
  buildTableOfContentsFromHeadings();
  if ("IntersectionObserver" in window) {
    observeHeadings();
  }
});

window.addEventListener("unload", (event) => {
  headerObserver.disconnect();
});
