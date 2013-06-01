var data = {
    employees: [
    {   firstName: "Christophe",
        lastName: "Coenraets",
        fullTime: true,
        phone: "617-123-4567"
    },
    {   firstName: "John",
        lastName: "Smith",
        fullTime: false,
        phone: "617-987-6543"
    },
    {   firstName: "Lisa",
        lastName: "Jones",
        fullTime: true,
        phone: "617-111-2323"
    },
    ]};
var tpl = "Employees:<ul>{{#employees}}<li>{{firstName}} {{lastName}}" +
          "{{#fullTime}} {{phone}}{{/fullTime}}</li>{{/employees}}</ul>";
var html = Mustache.to_html(tpl, data);
$('#sampleArea').html(html);