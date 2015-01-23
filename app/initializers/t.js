import Ember from 'ember';
import T from 'ember-cli-i18n/utils/t';
import tHelper from '../helpers/t';
import Stream from 'ember-cli-i18n/utils/stream';
import Namespace from 'ember-cli-i18n/namespace';

export function initialize(container, application) {
	if(application.I18N_HELPER===undefined) {
		application.I18N_HELPER='i18n';
	}
	Ember.Handlebars.registerHelper(application.I18N_HELPER, tHelper);

	application.localeStream = new Stream(function() {
		return	application.get('locale');
	});

	Ember.addObserver(application, 'locale', function() {
		application.localeStream.notify();
	});

	application.register('utils:i18n', T);
	application.inject('route', application.I18N_HELPER, 'utils:i18n');
	application.inject('model', application.I18N_HELPER, 'utils:i18n');
	application.inject('component', application.I18N_HELPER, 'utils:i18n');
	application.inject('controller', application.I18N_HELPER, 'utils:i18n');
	
	Ember.I18n=Namespace.create({container:container});
};

export default {
	name: 't',
	initialize: initialize
};
