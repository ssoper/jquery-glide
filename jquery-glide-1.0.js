/* Copyright (c) 2008 Sean Soper
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * jquery-glide
 * Version: 1.0 (Dec 6, 2008)
 * Requires: jQuery 1.2.6+
 */

(function($) {
  $.fn.glide = function(options) {

    var defaults = {
      duration: 3000,
      transition: 400,
      width: null,
      height: null,
      controller: null,
      autostart: true,
      callback: null,
      css_classes: {
        selected: 'selected',
        container: 'container'
      }
    }

    var opts = $.extend(defaults, options)
    var width = $(this).css('width') || opts.width
    var height = $(this).css('height') || opts.height
    var current = 0
    var timer = null
    var length = $(this).children().length
    var controller = opts.controller || '#' + this[0].id + '-controller'

    $(this).css({
      position: 'relative',
      overflow: 'hidden'
    })

    $(this).children().wrapAll('<div class="' + opts.css_classes.container + '"></div>').css({
      position: 'relative',
      width: this.width() + 'px',
      height:  this.height() + 'px',
      float: 'left'
    }).parent().css({
      position: 'relative',
      width: this.parent().width() * length + 'px',
      height:  this.parent().height() + 'px',
      overflow: 'hidden'
    })

    $(controller).children(':eq(' + current + ')').addClass(opts.css_classes.selected)

    var element = this
    $(controller).children().each(function(i) {
      $(this).click(function() {
        opts.autostart && dotimer(element)
        $(this).siblings().removeClass(opts.css_classes.selected)
        $(this).addClass(opts.css_classes.selected);
        var containerWidth = $(element).find('.' + opts.css_classes.container + ' :first').width()
        $(element).children('.' + opts.css_classes.container + ':first').animate({
          marginLeft: "-" + (i * containerWidth + "px")
        }, opts.transition)
        current = i
        opts.callback && opts.callback(i)
      })
    })

    var next = function (elem) {
      $(controller).children(':eq(' + (current) + ')').removeClass(opts.css_classes.selected)

      if (current < length - 1)
        current++
      else
        current = 0

      var containerWidth = $(elem).find('.' + opts.css_classes.container + ' :first').width()

      $(controller).children(':eq(' + current + ')').addClass(opts.css_classes.selected)

      $(elem).children('.' + opts.css_classes.container + ':first').animate({
        marginLeft: '-' + (current * containerWidth) + 'px'
      }, opts.transition)
      
      opts.callback && opts.callback(current)
    }
    
    var dotimer = function (elem) {
      if(timer != null) clearInterval(timer);

      timer = setInterval(function() {
        next(elem)
      }, opts.duration)
    }

    opts.autostart && dotimer(this)
  }

})(jQuery);