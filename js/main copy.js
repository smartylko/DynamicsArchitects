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

  }); // DOMContentLoaded
})();
