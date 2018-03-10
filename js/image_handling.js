$(document).ready(function() {
	// Append caption after pictures
	$('.content img').each(function(i) {
		var alt = this.alt;
		var parent = $(this).parent();

		if (alt != '') {
			var element = $(this);
			if (parent.is('a')) {
				element = parent;
			}
			element.after('<span class="caption">'+alt+'</span>');
		}

		if (!parent.is('a')) {
			$(this).wrap('<a href="'+this.src+'" title="'+alt+'" />');
		}
	});
  $(".content img").unveil(50, function() {
    $(this).load(function() {
      console.log(this.src + " loaded");
    });
  });
});
