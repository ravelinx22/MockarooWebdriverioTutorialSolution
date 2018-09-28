var assert = require('assert');
var Mockaroo = require('mockaroo');

describe('los estudiantes login', function() {
	function setup() {
		browser.url('/');
		browser.click('button=Cerrar');
	}

	setup();

	it('should visit los estudiantes and failed at log in', function () {
		var data = {};
		browser.waitUntil(function () {
			var client = new Mockaroo.Client({
				apiKey: YOUR_API_KEY
			})

			return client.generate({
				count: 1,
				fields: [{
					name: 'name',
					type: 'First Name'
				}, {
					name: 'lastname',
					type: 'Last Name'
				}, {
					name: 'major',
					type: 'Custom List',
					values: ["22", "49", "46", "66", "53", "62", "89", "1", "44", "19", "42", "37", "31", "78", "71", "84", "58", "56", "59", "12", "74", "75", "9", "33", "81", "64", "86", "29", "51", "52", "69", "39", "35"]
				}, {
					name: 'password',
					type: 'Password'
				}]
			}).then(function(records) {
				data = records;
				// Setup email
				data.email = "test@gmail.com"
				return records;
			});
		}, 5000, 'expected text to be different after 5s');

		browser.url('/');
		browser.waitForVisible('button=Ingresar', 5000);
		browser.click('button=Ingresar');

		var cajaSignUp = browser.element('.cajaSignUp');

		var nameInput = cajaSignUp.element('input[name="nombre"]');
		nameInput.click();
		nameInput.keys(data.name);

		var apellidoInput = cajaSignUp.element('input[name="apellido"]');
		apellidoInput.click();
		apellidoInput.keys(data.lastname);

		var mailInput = cajaSignUp.element('input[name="correo"]');
		mailInput.click();
		mailInput.keys(data.email);

		var passwordInput = cajaSignUp.element('input[name="password"]');
		passwordInput.click();
		passwordInput.keys(data.password);

		var programSelector = cajaSignUp.element('select[name="idPrograma"]');
		let major = "" + data.major;
		programSelector.selectByValue(major);

		var acceptTerms = cajaSignUp.element('input[name="acepta"]');
		acceptTerms.click();

		cajaSignUp.element('button=Registrarse').click()

		browser.waitForVisible('.text-muted.lead', 5000);
		var alertText = browser.element('.text-muted.lead').getText();
		expect(alertText).toContain('Error: Ya existe un usuario registrado con el correo');
	});
});
