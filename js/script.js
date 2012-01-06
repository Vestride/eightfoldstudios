/* Author: Glen Cheney
*/

function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Object for creating dialogs.
 */
var Dialog = {
    
    /**
     * Creates a basic dialog box with a dark mask overlay and a close button
     * 
     * @param {object} options
     * <pre>
     *  - content:      {string|HTMLElement} all the content that will go in the dialog. Can be a string or html element
     *  - width:        {int}       [optional] width of the dialog. Default = 600
     *  - stylePrefix  {string}    [optional] Add id's to the container and content element with a prefix for css styling
     *  - top:          {int}       [optional] Distance (px) from the top of the screen. Default = auto
     *  - onopen        {function}  [optional] this function will be executed right before the mask and dialog are appended to the document. Default = empty
     *  - onclose:      {function}  [optional] this function will be fired when the close button is clicked, but before the dialog is closed. default = nothing
     *  - maskBackground:{string}   [optional] background for the mask. Default = dark transparent gray. Use 'none' for no background.
     *  - modal:        {boolean}   [optional] Close the dialog when the user clicks on the close button. Default = true 
     * </pre>
     */
    create : function(options) {
        // Settings
        var defaults = {
            content : '',
            title : '',
            width: 450,
            topPx : 'auto',
            onopen : function() {},
            onclose : function() {},
            maskBackground : null,
            stylePrefix : null,
            modal : false,
            classes : []
        };
        
        $.extend(defaults, options);
        
        var settings = {
            leftMargin : (defaults.width / 2) * -1,
            maskClass : 'es-dialog-mask',
            containerClass : 'es-dialog-container',
            insideClass : 'es-dialog-inside',
            closeClass : 'es-dialog-close',
            closeFunction : function(e) {
                defaults.onclose();
                e.preventDefault();
                Dialog.close();
            },
            openFunction : function() {
                defaults.onopen();
                if (Dialog.isOpen) {
                    Dialog.close();
                }
            },
            $body : $('body'),
            $mask : null,
            $container : null,
            $header : null,
            $dialogInside : null,
            $h3 : null,
            $x : null
        };

        // Mask
        settings.$mask = $('<div></div>', {"class" : settings.maskClass}).css({
            'background' : settings.maskBackground
        });
        
        // Close the dialog when mask is clicked on if not modal
        if (!defaults.modal) {
            settings.$mask.click(function(e) {
                settings.closeFunction(e);
            });
        }

        // Container
        settings.$container = $('<div></div>', {"class" : settings.containerClass}).css({
            'margin-left' : settings.leftMargin + 'px',
            'width' : defaults.width + 'px'
        });
        
        if (defaults.classes.length > 0) {
            settings.$container.addClass(defaults.classes.join(' '));
        }
        
        if (defaults.stylePrefix) {
            settings.$container.addClass(defaults.stylePrefix + '-' + defaults.containerClass);
        }
        
        if (defaults.topPx !== 'auto') {
            settings.$container.css({
                'margin-top' : '0px',
                'top' : defaults.topPx + 'px'
            });
        }
        
        // Dialog Header
        settings.$header = $('<div></div>', {"class" : 'es-dialog-header'});
        settings.$h3 = $('<h3></h3>').text(defaults.title);
        settings.$header.append(settings.$h3);
        

        // Close Link
        settings.$x = $('<a></a>', {
            'href' : '#',
            'title' : 'Close',
            'class' : settings.closeClass
        }).text('×').click(function(e) {
            settings.closeFunction(e);
        });
        
        settings.$header.append(settings.$x);

        // Put the content into the dialog
        settings.$dialogInside = $('<div></div>', {"class" : settings.insideClass}).html(defaults.content);
        
        if (defaults.stylePrefix) {
            settings.$dialogInside.addClass(defaults.stylePrefix + '-' + settings.insideClass);
        }
        
        settings.$container.append(settings.$header, settings.$dialogInside);
        
        // Save mask and container for later access
        this._container = settings.$container;
        this._mask = settings.$mask;
        
        // Call our onopen function hook
        settings.openFunction();

        // Show the dialog
        settings.$body.append(settings.$mask, settings.$container);
        
        this.isOpen = true;
        if (defaults.topPx == 'auto') {
            this.centerVertically();
        }
    },
    
    /**
     * Removes the dialog from the page
     */
    close : function() {
        this.getMask().add(this.getContainer()).remove();
        this.isOpen = false;
        this._mask = null;
        this._container = null;
        
        // Call any built up functions
        var i;
        for(i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    },
    
    /**
     * Adds a function to the callbacks array
     */
    addCallback : function(fn) {
    	if (typeof fn === "function") {
            this.callbacks.push = fn;
    	}
    },
    
    centerVertically : function() {
        var container = this.getContainer().get(0);
        container.style.height = "";
        container.style.height = container.offsetHeight + 'px';
        container.style.marginTop = (parseInt(container.style.height) / 2) * -1 + 'px';
    },
    
    callbacks : [],
    
    isOpen : false,
    
    _mask : null,
    getMask : function() {
        return this._mask;
    },
    
    _container : null,
    getContainer : function() {
        return this._container;
    }
};

var Vestride = {

    /**
     * Base url for the site, e.g. http://eightfoldstudios.com
     */
    baseUrl : document.location.protocol + '//' + (document.location.hostname || document.location.host),
    
    onHomePage : true,
    
    themeUrl : null,
    
    spinnerOpts : {
        lines: 12, // The number of lines to draw
        length: 7, // The length of each line
        width: 5, // The line thickness
        radius: 10, // The radius of the inner circle
        color: '#F0F0F0', // #rbg or #rrggbb
        speed: 1, // Rounds per second
        trail: 100, // Afterglow percentage
        shadow: true // Whether to render a shadow
    },
    
    backdrop : {
        fullHeight : null,
        minHeight : null,
        friction : 0.5,
        $backdrop : null,
        centered : 370,
        left : 120
    },
    
    initBackdrop : function() {
        this.backdrop.$backdrop = $('.backdrop');
        this.backdrop.fullHeight = this.backdrop.$backdrop.height();
        this.backdrop.minHeight = this.backdrop.$backdrop.find('.city').height() + 10;
    },
    
    modifyBackdrop : function() {
        var scrolled = $(window).scrollTop(),
            newHeight = this.backdrop.fullHeight - (scrolled * this.backdrop.friction),
            percentScrolled = scrolled / this.backdrop.fullHeight,
            backdropX = this.backdrop.centered - Math.round(percentScrolled * (this.backdrop.fullHeight - this.backdrop.minHeight));
        
        if (newHeight < this.backdrop.minHeight) newHeight = this.backdrop.minHeight;
        if (backdropX < this.backdrop.left) backdropX = this.backdrop.left;
        
        // Move the text at the same speed as regular scrolling
        this.backdrop.$backdrop.children().first().css('bottom', scrolled);
        
        // Move the city over
        this.backdrop.$backdrop.find('.city').css('background-position', backdropX + '% 0');
        
        // Move Backdrop at half speed
        this.backdrop.$backdrop.css('height', newHeight);
    },

    scrolledIt : function() {
        // Highlight which section we're in
        $('#main section').each(function() {
            var navId = '#a-' + $(this).attr('id');
            if ($.inviewport($(this), {threshold : 0})) {
                $(navId).addClass('in');
            } else {
                $(navId).removeClass('in');
            }
        });
        
        this.modifyBackdrop();
        
    },

    adjustSvgTitles : function() {
        $('.section-title svg').each(function() {
            var $this = $(this),
                width = $this.find('text').outerWidth();
            $this.attr('width', width);
        });
    },

    initCycle : function(anchorBuilder, selector) {
        if (!selector) {
            selector = '.carousel';
        }
        var $cycle = $(selector).cycle({
            timeout:  6000,
            speed:  400,
            pause: 1,
            pager: selector + '-control',
            pagerAnchorBuilder : function(index, el) {
                Vestride[anchorBuilder](this, index, el);
            },
            updateActivePagerLink : function(pager, index, active) {
                var title = $('.carousel a').eq(index).attr('data-title');
                $(pager).children().removeClass(active).eq(index).addClass(active);
                
                $('.carousel-item-title').fadeOut('fast', function() {
                    $(this).text(title).fadeIn();
                });
            }
        });

        // Change carousel item on hover
        $(selector + '-control > *').mouseover(function(){
            var zeroBasedIndex = parseInt($(this).text()) - 1;
            $cycle.cycle(zeroBasedIndex);
        });
    },

    cycleWithLinks : function(self, index, el) {
        $(self.pager).append('<a href="' + $(el).find('a').attr('href') + '">' + (index + 1) + '</a>');
    },

    cycleNoLinks : function(self, index, el) {
        $(self.pager).append('<span>' + (index + 1) + '</span>');
    },

    initGridHover : function() {
        $('#grid .item').hover(
            function() {
                var $paneText = $(this).find('.pane-title, .pane-view');
                $paneText.animate({
                    left : '20px'
                }, 250);
            },
            function() {
                var $paneText = $(this).find('.pane-title, .pane-view');
                $paneText.animate({
                    left : '250px'
                }, 150, function() {
                    $paneText.css('left', '-230px');
                });
            }
        );
    },

    initWorkFiltering : function() {
        $('.filter-options li').click(function() {
            var $this = $(this),
                $grid = $('#grid');

            // Hide current label, show current label in title
            $('.filter-options .active').removeClass('active');
            $this.addClass('active');
            $('.filter-title').text($this.text());

            // Filter elements
            $grid.paginate('paginate', $this.attr('data-key'));
        });
        
        $('#grid').paginate({
            itemWidth : 230,
            margins : 20,
            key : 'all'
        });
    },

    initLocalScroll : function() {
        $('#nav, .quick-tiles').localScroll({
            hash:true,
            duration:300
        });
    },

    initContactSubmit : function() {
        
        // Add blur and focus events so we can change the class of the arrows
        // to show if it's valid or invalid
        $('#contact input[type!="submit"], #contact textarea').focus(function() {
            $(this).parent().find('.arrow-down').addClass('active');
        }).blur(function(){
            var $parent = $(this).parent(),
                status;
                
            $parent.find('.arrow-down').removeClass('active');
            if (this.validity) {
                status = this.validity.valid ? 'valid' : 'invalid';
                $parent.find('.arrow-container').removeClass('valid invalid').addClass(status);
            }
        });
        
        var $submit = $('#contact-submit'),
            $form = $('#contact form'),
            $formElements = $form.find('input, textarea').not('[type=submit],[type=hidden]');
            
        $formElements.stickyholder();
        
        // make it so hitting enter while the submit div is focused submits the data
        $submit.keyup(function(evt) {
            // 13 == enter key
            if (evt.which === 13) {
                $form.submit();
            }
        });
        
        // Add click event to submit div
        $submit.click(function() {
            $form.submit();
        });
        
        $form.submit(Vestride.submitContact);
    },
    
    submitContact : function(event) {
        event.preventDefault();

        var $submit = $('#contact-submit'),
            $form = $('#contact form'),
            $formElements = $form.find('input, textarea').not('[type=submit]'),
            $notification = $form.find('.notification'),
            ok = true,
            errors = [],
            message = {},
            sendEnvelope = function() {
                $submit.addClass('closed');
                setTimeout(function() {
                    $submit.addClass('animate');
                }, 400);
            },
            retrieveEnvelope = function() {
                $submit.removeClass('animate');
                setTimeout(function() {
                    $submit.removeClass('closed');
                }, 600);
            };

        Vestride.hideContactErrors($notification);
        /*
        $formElements.each(function() {
            if ($(this).hasClass('holding')) {
                $(this).val('');
            }
            var type = this.type,
                name = this.name,
                nameUp = ucFirst(name),
                required = this.getAttribute('required'),
                value = this.value;


            // Check for html5 validity
            if ((this.validity) && !this.validity.valid) {
                this.focus();
                ok = false;

                if (this.validity.valueMissing) {
                    errors.push(nameUp + " must not be empty");
                }

                else if (this.validity.typeMismatch && type == 'email') {
                    errors.push(nameUp + " is invalid");
                }

                return false;
            }

            // Check browser support for email type
            if (type == 'email' && !Modernizr.inputtypes.email && !Vestride.email_is_valid(value)) {
                this.focus();
                ok = false;
                errors.push(nameUp + " is invalid");
                return false;
            }

            // Make sure all required inputs have a value
            if (required && !Modernizr.input.required && value == '') {
                this.focus();
                ok = false;
                errors.push(nameUp + ' is required');
                return false;
            }

            if (name === 'name' && value !== "") {
                this.focus();
                errors.push("Are you sure you're not a bot? You should not have been able to change that field");
                return false;
            }

            message[name] = value;
        });
        */
        if (ok) {
            sendEnvelope();
            /*
            $.ajax({
                url : Vestride.themeUrl + "/libs/ajax.php",
                dataType : 'json',
                data : 'method=sendContactMessage&data=' + JSON.stringify(message),
                success : function(response) {
                    if (response.success === true) {
                        Dialog.create({
                            title: 'Message sent! =]',
                            content: 'Your message has been sent successfully. We&rsquo;ll get back to you soon!',
                            classes: ['success'],
                            topPx: 135
                        });

                        // Clear the form is everything went ok
                        $form.get(0).reset();
                        $formElements.each(function() {
                            $(this).parent().find('.arrow-container').removeClass('valid');
                        });

                    } else if (Array.isArray(response)) {
                        Vestride.displayContactErrors(response, $notification);
                        retrieveEnvelope();
                    } else {
                        retrieveEnvelope();
                        Dialog.create({
                            title: 'Technical Difficulties',
                            content: 'Oops, something broke!',
                            classes: ['error'],
                            topPx: 135
                        });
                    }
                },
                error: function(response) {
                    retrieveEnvelope();
                    Dialog.create({
                        title: 'Technical Difficulties',
                        content: 'Oops, something broke!',
                        classes: ['error'],
                        topPx: 135
                    });
                },
                complete : function() {
                    console.log('complete');
                }
            });
            */
        } else {
            // Show errors
            Vestride.displayContactErrors(errors, $notification);
        }
    },
    
    displayContactErrors : function(errors, $notification) {
        var html = '<ul>',
            prop;
        for (prop in errors) {
            html += '<li>' + errors[prop] + '</li>';
        }
        html += '</ul>';
        $notification.html(html).attr('data-visible', 'true').show();
    },
    
    hideContactErrors : function($notification) {
        if ($notification.attr('data-visible') == "true") {
            $notification.attr('data-visible', 'false').hide();
        }
    },
    
    email_is_valid : function(email) {
        var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!emailRegEx.test(email)) {
            return false;
        }
        return true;
    },
    
    safeLoadImages : function(parent) {
        var $imgs = $(parent).find('img'),
            numImgs = $imgs.length,
            numLoaded = 0;
        
        $imgs.load(function(e) {
            numLoaded++;
            if (numLoaded === numImgs) {
                $(window).trigger('imgsLoaded.Vestride');
            }
        });
    },
    
    fullscreenImage : function() {
        $('.project .project-desc').click(function() {
            // put in container div with overflow hidden?
            var $mask = $('<div></div>', {"class": "blockbox-mask", style : "cursor: pointer;"}),
                $projectImg = $('.project-img'),
                imgUrl = $projectImg.attr('data-full'),
                imgWidth = $projectImg.attr('data-full-width'),
                imgHeight = $projectImg.attr('data-full-height'),
                isLandscape = imgWidth > imgHeight,
                $img = $('<img>', {src : imgUrl, alt : 'Full view', title : 'click to close'}),
                $div = $('<div></div>', {style : 'overflow:hidden;text-align:center;'});

            // Make sure the image will fit in the window
            if (isLandscape) {
                if (imgWidth > $(window).width()) {
                    $img.width($(window).width());
                    $div.height($(window).height());
                }
            } else {
                if (imgHeight > $(window).height()) {
                    $img.height($(window).height());
                    $div.width($(window).width());
                }
            }

            // Clicking anywhere will remove everything
            $mask.click(function(){
                $(this).remove();
            });

            $div.append($img)
            $mask.append($div);
            $('body').append($mask);
        });
    }
};

$(document).ready(function(){
    Vestride.fullscreenImage();
    Vestride.adjustSvgTitles();
});