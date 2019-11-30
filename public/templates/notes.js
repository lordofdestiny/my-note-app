(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['notes.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <a href=\"#\" class=\"list-group-item list-group-item-action\">\r\n        <div class=\"d-flex justify-content-between\">\r\n            <h5 class=\"mb-1\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h5>\r\n            <small>"
    + alias2((helpers.timeBetween || (depth0 && depth0.timeBetween) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.date_created : depth0),{"name":"timeBetween","hash":{},"data":data}))
    + "</small>\r\n        </div>\r\n        <p class=\"mb-1\">"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</p>\r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.flash_date : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "    </a>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <small>Assigned for "
    + container.escapeExpression((helpers.momentIt || (depth0 && depth0.momentIt) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.flash_date : depth0),"DD.MM.YYYY. [at] HH:mm",{"name":"momentIt","hash":{},"data":data}))
    + "</small>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <small>Just remember this <i class=\"fas fa-smile-wink yellow\"></i>\r\n            </small>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.notes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();