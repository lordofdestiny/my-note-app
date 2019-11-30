(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['note.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <small>Assigned for "
    + container.escapeExpression(((helper = (helper = helpers.flash_date || (depth0 != null ? depth0.flash_date : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"flash_date","hash":{},"data":data}) : helper)))
    + "</small>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <small>Just remember this <i class=\"fas fa-smile-wink yellow\"></i>\r\n        </small>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#\" class=\"list-group-item list-group-item-action\">\r\n    <div class=\"d-flex justify-content-between\">\r\n        <h5 class=\"mb-1\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\r\n        <small>"
    + alias4((helpers.timeBetween || (depth0 && depth0.timeBetween) || alias2).call(alias1,(depth0 != null ? depth0.date_created : depth0),{"name":"timeBetween","hash":{},"data":data}))
    + "</small>\r\n    </div>\r\n    <p class=\"mb-1\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.flash_date : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</a>";
},"useData":true});
})();