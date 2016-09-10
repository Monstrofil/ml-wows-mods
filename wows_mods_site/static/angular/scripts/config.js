/**
 * Created by shish on 10.08.2016.
 */
var modificationsListModule = angular.module("modifications_application");

modificationsListModule.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
            .when('/', {
                templateUrl : '/static/angular_templates/ml_modifications_list.html',
                controller  : 'modifications_controller'
            })
            .when('/modification/:id/', {
                templateUrl : '/static/angular_templates/ml_modification.html',
                controller  : 'modification_controller'
            })
            .otherwise({
                templateUrl : '/static/angular_templates/ml_404.html'
            });

    });

modificationsListModule.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

!function(){"use strict";angular.module("angular-google-adsense",[]).service("Adsense",[function(){this.url="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",this.isAlreadyLoaded=!1}]).directive("adsense",function(){return{restrict:"E",replace:!0,scope:{adClient:"@",adSlot:"@",inlineStyle:"@",adFormat:"@"},template:'<div class="ads"><ins class="adsbygoogle" data-ad-client="{{adClient}}" data-ad-slot="{{adSlot}}" style="{{inlineStyle}}" data-ad-format="{{adFormat}}"></ins></div>',controller:["Adsense","$timeout",function(a,b){if(!a.isAlreadyLoaded){var c=document.createElement("script");c.type="text/javascript",c.src=a.url,c.async=!0,document.body.appendChild(c),a.isAlreadyLoaded=!0}b(function(){(window.adsbygoogle=window.adsbygoogle||[]).push({})})}]}})}();