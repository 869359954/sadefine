$(".nav [data-index]").on("mouseover click",function(){var a=$(this).parents(".nav-parent");a.find(".nav [data-index]").removeClass("active");var n=$(this).addClass("active").data("index"),d=a.find(".nav-desc [data-index]");d.removeClass("active"),a.find('.nav-desc [data-index="'+n+'"]').addClass("active"),d.each(function(n){a.find(".nav-desc").removeClass("nav-index-"+n)}),a.find(".nav-desc").addClass("nav-index-"+n)});