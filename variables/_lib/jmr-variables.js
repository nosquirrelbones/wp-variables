var toggleSection = function(){
	var tgt = this.getAttribute('data-target');
	var tgt_section = document.getElementById(tgt);
	tgt_section.classList.toggle('ui-collapse');
};

var locationGeocode = function(){
	var geocoder = new google.maps.Geocoder();
	var street, locality, region, country;
	street = document.getElementById('address_street').value;
	locality = document.getElementById('address_locality').value;
	region = document.getElementById('address_region').value;
	country = document.getElementById('address_country').value;

	if ( street === '' || locality === '' ) {
		alert('Insufficient data to geocode the location.');
	}

	var address = ( street + ' ' + locality + ' ' + region + ' ' + country ).trim();
	geocoder.geocode( { 'address': address}, function(results, status) {
		window.console.log(status);
		if (status == 'OK') {
			var location = results[0].geometry.location;
			var lat = location.lat();
			var lng = location.lng();
			document.getElementById('geo_lat').value = lat;
			document.getElementById('geo_lng').value = lng;
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
};

var showSchema = function(e){
	document.getElementById('schemaPreview').classList.toggle('ui-hidden');
	e.currentTarget.classList.toggle('tgt-hidden');
};

var schemaUpdateOptions = function(){
	var $opt = jQuery('option:selected', this);
	jQuery('#schemaType').val( $opt.val() );
	if ( $opt.data('subset') && $opt.data('subset') !== '' ) {
		jQuery('.subset').hide();
		jQuery('[data-parent="' + $opt.val() + '"]').show().on('change', function(){
			var $opt = jQuery('option:selected', this);
			if ( $opt.val() && $opt.val() !== '' ) {
				jQuery('#schemaType').val( $opt.val() );
			}
		});
	} else {
		jQuery('.subset').hide();
	}
};

var init = function() {

	var jmr_sections = document.querySelectorAll('.jmr-variable-section');
	for ( var i = 0; i < jmr_sections.length; i++ ) {
		jmr_sections[i].classList.add('ui-collapse');
	}

	var jmr_toggle = document.querySelectorAll('.jmr-variable-section h3');
	for ( i = 0; i < jmr_toggle.length; i++ ) {
		jmr_toggle[i].addEventListener('click', toggleSection, false);
	}

	var $sel = jQuery('#schemaType').val();
	if ($sel !== ''){
		var $opt = jQuery('.schema-type-options').find('option[value="' + $sel + '"]');
		jQuery($opt).prop('selected', true);
		$opt.closest('select').show();
		var $p = $opt.closest('select').show().data('parent');
		if ( $p && $p !== '' ) {
			jQuery('.schema-type-options').find('option[value="' + $p + '"]').prop('selected', true);
		}
	}

	document.getElementById('showSchemaJSON').addEventListener('click', showSchema, false);
	document.getElementById('schemaTypeSelect').addEventListener('change', schemaUpdateOptions, false);
	document.getElementById('generateLocation').addEventListener('click', locationGeocode, false);

};

window.addEventListener('load', function(){
	init();
}, false);
