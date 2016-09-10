/**
 * Created by shish on 10.08.2016.
 */
var modificationsListModule = angular.module("modifications_application");

modificationsListModule.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});