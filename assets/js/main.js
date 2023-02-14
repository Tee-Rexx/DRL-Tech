
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */


  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(function() {
        preloader.remove()
        
      }, 500);
    });
    // preloader.remove()
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
    });
});



  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
                    const mobileNav = document.querySelector(".navbar-mobile");
                    const listicon = document.querySelector(".bi-list");
                    mobileNavToggle.addEventListener("click", function () {
                      mobileNav.classList.remove("hidden");
                      listicon.classList.add("hidden")
                    });
          
                    const links = document.querySelectorAll(".scrollto");
          
                    links.forEach(function (link) {
                      link.addEventListener("click", function (e) {
                        e.preventDefault();
          
                        const href = this.getAttribute("href");
                        const target = document.querySelector(href);
          
                        target.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
          
                        listicon.classList.remove("hidden")
                        mobileNav.classList.add("hidden");
                      });
                    });
          
          
          
                    const navbar = document.getElementById("navbar");
                    const closeIcon = document.querySelector(".bi-x");
          
                    navbar.addEventListener("click", function () {
                      navbar.classList.toggle("show");
                      closeIcon.classList.toggle("show");
          
                    });
                    const closeButton = document.querySelector('.bi-x');
                    const mobilenav = document.querySelector('.navbar-mobile');
                    const list_icon = document.querySelector(".bi-list");
          
                    closeButton.addEventListener('click', function (e) {
                      e.preventDefault();
                      mobilenav.classList.add("hidden");
                      list_icon.classList.remove("hidden")
                    });



                    // Get the button
            var backToTopButton = document.getElementById("back-to-top-button");

            // When the user scrolls down 20px from the top of the document, show the button
            window.onscroll = function () {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    backToTopButton.style.display = "flex";
                } else {
                    backToTopButton.style.display = "none";
                }
            };

            // When the user clicks on the button, scroll to the top of the document
            backToTopButton.onclick = function () {
                smoothScrollToTop();
            };

            function smoothScrollToTop() {
                // Get the current scroll position
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                
                // Calculate the target scroll position
                var targetScroll = 0;

                // Set the step size for the smooth scroll
                var stepSize = Math.abs(currentScroll - targetScroll) / 50;

                // Start the smooth scroll
                var intervalId = setInterval(function () {
                    // Scroll to the next step
                    currentScroll = currentScroll - stepSize;

                    // Check if we've reached the target
                    if (currentScroll <= targetScroll) {
                        // Clear the interval and reset the scroll position
                        clearInterval(intervalId);
                        currentScroll = 0;
                    }

                    // Update the scroll position
                    document.documentElement.scrollTop = currentScroll;
                    document.body.scrollTop = currentScroll;
                }, 10);
            }

            const chatbotButton = document.getElementById("chatbot-button");
const chatbotPopup = document.getElementById("chatbot-popup");
const closebutton = document.getElementById("close-button");
const inputField = document.getElementById("input-field");

chatbotButton.addEventListener("click", function () {
  chatbotPopup.style.display = "block";
});

closebutton.addEventListener("click", function () {
  chatbotPopup.style.display = "none";
});










})()