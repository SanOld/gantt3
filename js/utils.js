//Utils
function getDateAgo(date, days) {
    var new_date = new Date();
    new_date.setDate(date.getDate() + days);
    return new_date;
  }
function templateRenders() {
	function render(template, data) {
		var tpl_status = false;
		var params_status = false;
		if (data) {
			params_status = true;
		}
		if (template) {
			tpl_status = true;
		}
		if (tpl_status == true) {
			_.templateSettings = {
				evaluate : /\{\{(.+?)\}\}/g,
				interpolate : /\{\{=(.+?)\}\}/g,
				escape : /\{\{-(.+?)\}\}/g
			};
			_.templateSettings.variable = "rc";
			var tpl = _.template(jQuery(template).html());
		}
		return tpl(data);
		if (tpl_status == true && params_status == true) {
			return tpl(data);
		} else {
			return tpl(data);
		}

	}
	return {
		render : render
	}
}
var templates = new templateRenders();


