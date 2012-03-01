// js that only applies to the home page

$(document).ready(function() {
    
    // Smooth scrolling
    Vestride.initLocalScroll();
    $.localScroll.hash({
        duration: 600
    });
    
    // Parallax city scape
    Vestride.initBackdrop();

    // Check to see if sections are in the viewport on scroll
    $(window).scroll(function() {
        Vestride.scrolledIt();
    });
    
    // Set up 'Featured' carousel
    Vestride.initCycle('cycleWithLinks', '.carousel');

    // Set up hovers over 'work' section
    //Vestride.initGridHover();
    
    // Add work filter functionality
    Vestride.initWorkFiltering();
    
    // Set up ajax form
    Vestride.initContactSubmit();
    
    $('#grid').blockbox({
        navFilter : '.filtered .item-details a'
    });
});