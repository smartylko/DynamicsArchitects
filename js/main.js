// js/main.js - Dynamic Architects final initialization
(function(){
  'use strict';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', function(){
    
    // AOS init (if available)
    if(window.AOS) try{ AOS.init({duration:800, once:true}); }catch(e){console.warn('AOS init failed',e);} 

    // GLightbox init
    if(window.GLightbox) try{ GLightbox({selector:'.glightbox'}); }catch(e){console.warn('GLightbox init failed',e);} 

    // GSAP animations
    if(window.gsap && window.ScrollTrigger){
      try{
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.gsap-fade').forEach(function(el){
          gsap.from(el, {y:50, opacity:0, duration:1, scrollTrigger:{trigger:el, start:'top 85%'}});
        });
        gsap.utils.toArray('.parallax').forEach(function(bg){
          gsap.to(bg, {backgroundPositionY:'40%', ease:'none', scrollTrigger:{trigger:bg, start:'top bottom', scrub:true}});
        });
      }catch(e){console.warn('GSAP error',e);} 
    }

    // Sticky navbar shadow
    var onScrollNav = function(){
      var nav = document.querySelector('.navbar'); if(!nav) return;
      if(window.scrollY > 10) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScrollNav);

    // Page fade transitions
    try{
      document.body.classList.add('fade');
      window.addEventListener('load', function(){ document.body.classList.remove('fade'); });
      document.querySelectorAll('a').forEach(function(link){
        try{
          if(link.hostname === window.location.hostname){
            link.addEventListener('click', function(e){
              var href = this.getAttribute('href') || '';
              if(href.indexOf('#')===0 || href.indexOf('tel:')===0 || href.indexOf('mailto:')===0 || href==='') return;
              e.preventDefault(); document.body.classList.add('fade'); setTimeout(function(){ window.location = href; }, 300);
            });
          }
        }catch(err){}
      });
    }catch(e){console.warn('page transition init failed',e);} 

    // Preloader hide (robust)
    window.addEventListener('load', function(){
      var preloader = document.getElementById('preloader');
      if(preloader){ try{ preloader.style.opacity = '0'; setTimeout(function(){ preloader.style.display = 'none'; }, 450); }catch(e){ preloader.style.display = 'none'; } }
    });

    // Counters
    var counters = document.querySelectorAll('.counter');
    if(counters && counters.length){
      var speed = 200;
      var animateCounters = function(){
        counters.forEach(function(counter){
          var update = function(){
            var target = +counter.getAttribute('data-target') || 0;
            var count = +counter.innerText.replace(/,/g,'') || 0;
            var inc = Math.ceil(target / speed);
            if(count < target){ counter.innerText = (count + inc).toLocaleString(); setTimeout(update, 10); } else counter.innerText = target.toLocaleString();
          };
          update();
        });
      };
      var obs = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting) animateCounters(); }); }, {threshold:0.4});
      var countersSection = document.querySelector('#counters'); if(countersSection) obs.observe(countersSection);
    }

    // Isotope project filtering
    if(window.Isotope){
      try{
        var grid = document.querySelector('.project-grid');
        if(grid){
          var iso = new Isotope(grid, { itemSelector: '.project-item', layoutMode: 'fitRows' });
          document.querySelectorAll('.filter-btn').forEach(function(btn){
            btn.addEventListener('click', function(){
              document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
              this.classList.add('active');
              var filterValue = this.getAttribute('data-filter');
              iso.arrange({ filter: filterValue });
            });
          });
        }
      }catch(e){console.warn('Isotope init failed', e);} 
    }

    // --- 1. Portfolio Filtering Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.querySelector('.project-grid');
    const projectItems = document.querySelectorAll('.project-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                // Check if the item should be shown
                const shouldShow = filterValue === '*' || item.classList.contains(filterValue.substring(1));

                // Simple show/hide implementation
                if (shouldShow) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                
                // Note: For a smoother, animated filter (like Isotope), 
                // you would use a dedicated library or more complex CSS transitions.
            });
        });
    });

    // --- 2. Project Detail Modal Logic ---
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get data from the clicked card's data attributes
            const title = this.getAttribute('data-title');
            const img = this.getAttribute('data-img');
            const services = this.getAttribute('data-services');
            const cost = this.getAttribute('data-cost');
            const remarks = this.getAttribute('data-remarks');

            // Populate the modal content
            modalTitle.textContent = title;
            modalImg.src = img;

            modalDesc.innerHTML = `
                <div class="text-left mt-4">
                    <h5><strong class="text-warning">Nature of Services Rendered:</strong></h5>
                    <p>${services}</p>
                    
                    <h5 class="mt-3"><strong class="text-warning">Cost in Lacs (Rs.):</strong></h5>
                    <p>₹ ${cost} Lacs</p>
                    
                    <h5 class="mt-3"><strong class="text-warning">Remarks:</strong></h5>
                    <p>${remarks}</p>
                </div>
            `;

            // Display the modal
            modal.style.display = 'flex';
        });
    });

    // Close the modal when the close button (X) is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when the user clicks anywhere outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

  });
  
(function(){
  // Helper: place markers from data-left & data-top attributes (percentage values)
  document.querySelectorAll('.map-marker').forEach(btn=>{
    const left = btn.getAttribute('data-left') || '50';
    const top  = btn.getAttribute('data-top')  || '50';
    btn.style.left = left + '%';
    btn.style.top  = top  + '%';

    // add accessible label (visually hidden)
    const city = btn.dataset.city || 'Location';
    btn.setAttribute('aria-label', city + ' (open details)');
    // add simple tooltip element
    const tip = document.createElement('span');
    tip.className = 'tooltip';
    tip.textContent = city;
    btn.appendChild(tip);
  });

  const info = document.getElementById('mapInfo');
  const titleEl = document.getElementById('mapInfoTitle');
  const addrEl  = document.getElementById('mapInfoAddress');
  const gmaps   = document.getElementById('mapInfoGMaps');
  const copyBtn = document.getElementById('mapInfoCopy');
  const closeBtn= document.getElementById('mapInfoClose');

  // click on marker -> open floating info
  document.querySelectorAll('.map-marker').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const city = btn.dataset.city || 'Location';
      const addr = btn.getAttribute('data-address') || 'Address not set';
      titleEl.textContent = city;
      addrEl.textContent = addr;

      // create google maps link (uses city text for search); you can replace with precise coordinates
      const gmapUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(city);
      gmaps.setAttribute('href', gmapUrl);

      // show panel
      info.classList.add('show');
      info.setAttribute('aria-hidden','false');

      // focus for accessibility
      info.focus && info.focus();
    });
  });

  // Copy to clipboard
  copyBtn && copyBtn.addEventListener('click', ()=>{
    const text = addrEl.textContent || '';
    if (!text) return;
    navigator.clipboard?.writeText(text).then(()=>{
      copyBtn.textContent = 'Copied';
      setTimeout(()=> copyBtn.textContent = 'Copy Address', 1200);
    }).catch(()=> {
      alert('Copy failed — select & copy manually.');
    });
  });

  // Close panel
  closeBtn && closeBtn.addEventListener('click', ()=>{
    info.classList.remove('show');
    info.setAttribute('aria-hidden','true');
  });

  // close on Esc key
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
      info.classList.remove('show');
      info.setAttribute('aria-hidden','true');
    }
  });

})();// DOMContentLoaded
})();

