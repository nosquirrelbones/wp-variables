var toggleSection=function(){var e=this.getAttribute("data-target"),t=document.getElementById(e);t.classList.toggle("ui-collapse")},locationGeocode=function(){var e=new google.maps.Geocoder,t,o,a,n;t=document.getElementById("address_street").value,o=document.getElementById("address_locality").value,a=document.getElementById("address_region").value,n=document.getElementById("address_country").value,""!==t&&""!==o||alert("Insufficient data to geocode the location.");var l=(t+" "+o+" "+a+" "+n).trim();e.geocode({address:l},function(e,t){if(window.console.log(t),"OK"==t){var o=e[0].geometry.location,a=o.lat(),n=o.lng();document.getElementById("geo_lat").value=a,document.getElementById("geo_lng").value=n}else alert("Geocode was not successful for the following reason: "+t)})},showSchema=function(e){document.getElementById("schemaPreview").classList.toggle("ui-hidden"),e.currentTarget.classList.toggle("tgt-hidden")},schemaUpdateOptions=function(){var e=jQuery("option:selected",this);jQuery("#schemaType").val(e.val()),e.data("subset")&&""!==e.data("subset")?(jQuery(".subset").hide(),jQuery('[data-parent="'+e.val()+'"]').show().on("change",function(){var e=jQuery("option:selected",this);e.val()&&""!==e.val()&&jQuery("#schemaType").val(e.val())})):jQuery(".subset").hide()},init=function(){for(var e=document.querySelectorAll(".jmr-variable-section"),t=0;t<e.length;t++)e[t].classList.add("ui-collapse");var o=document.querySelectorAll(".jmr-variable-section h3");for(t=0;t<o.length;t++)o[t].addEventListener("click",toggleSection,!1);var a=jQuery("#schemaType").val();if(""!==a){var n=jQuery(".schema-type-options").find('option[value="'+a+'"]');jQuery(n).prop("selected",!0),n.closest("select").show();var l=n.closest("select").show().data("parent");l&&""!==l&&jQuery(".schema-type-options").find('option[value="'+l+'"]').prop("selected",!0)}document.getElementById("showSchemaJSON").addEventListener("click",showSchema,!1),document.getElementById("schemaTypeSelect").addEventListener("change",schemaUpdateOptions,!1),document.getElementById("generateLocation").addEventListener("click",locationGeocode,!1)};window.addEventListener("load",function(){init()},!1);