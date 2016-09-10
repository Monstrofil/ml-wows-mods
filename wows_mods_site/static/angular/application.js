/**
 * Created by shish on 07.08.2016.
 */

var modificationsListModule = angular.module("modifications_application", ['djng.urls', 'ngRoute', 'ngResource', 'xeditable', 'ngDialog', 'djangoRESTResources', 'angular-google-adsense']);

modificationsListModule.factory('Page', function() {
   var title = 'Модификации World of Warships';
   return {
     title: function() { return document.title; },
     setTitle: function(newTitle) { document.title = newTitle + " | " + title }
   };
});

modificationsListModule.filter("html", ["$sce", function (e) {
    return function (t) {
        return e.trustAsHtml(t)
    }
}]);

modificationsListModule.run(function(editableOptions, editableThemes) {
  // set `default` theme
  editableOptions.theme = 'default';

  // overwrite submit button template
  editableThemes['default'].submitTpl = '<button type="submit"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5IDQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OSA0OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0zOS45MTQsMEgzNy41aC0yOGgtOXY0OWg3aDMzaDhWOC41ODZMMzkuOTE0LDB6IE0zNS41LDJ2MTRoLTI0VjJIMzUuNXogTTkuNSw0N1YyOGgyOXYxOUg5LjV6IE00Ni41LDQ3aC02VjI2aC0zM3YyMWgtNSAgIFYyaDd2MTZoMjhWMmgxLjU4Nkw0Ni41LDkuNDE0VjQ3eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPHBhdGggZD0iTTEzLjUsMzNoN2MwLjU1MywwLDEtMC40NDcsMS0xcy0wLjQ0Ny0xLTEtMWgtN2MtMC41NTMsMC0xLDAuNDQ3LTEsMVMxMi45NDcsMzMsMTMuNSwzM3oiIGZpbGw9IiNGRkZGRkYiLz4KCTxwYXRoIGQ9Ik0yMy41LDM1aC0xMGMtMC41NTMsMC0xLDAuNDQ3LTEsMXMwLjQ0NywxLDEsMWgxMGMwLjU1MywwLDEtMC40NDcsMS0xUzI0LjA1MywzNSwyMy41LDM1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPHBhdGggZD0iTTI1Ljc5LDM1LjI5Yy0wLjE4MSwwLjE4OS0wLjI5LDAuNDUtMC4yOSwwLjcxczAuMTA5LDAuNTIsMC4yOSwwLjcxQzI1Ljk3OSwzNi44OSwyNi4yMjksMzcsMjYuNSwzNyAgIGMwLjI2LDAsMC41Mi0wLjExLDAuNzEtMC4yOWMwLjE4LTAuMTksMC4yOS0wLjQ1LDAuMjktMC43MXMtMC4xMS0wLjUyMS0wLjI5LTAuNzFDMjYuODQsMzQuOTIsMjYuMTYsMzQuOTIsMjUuNzksMzUuMjl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMzMuNSw0aC02djEwaDZWNHogTTMxLjUsMTJoLTJWNmgyVjEyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></button>';
  editableThemes['default'].cancelTpl = '<button type="button" ng-click="$form.$cancel()"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3NS4yIDQ3NS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMiA0NzUuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MDUuNiw2OS42QzM2MC43LDI0LjcsMzAxLjEsMCwyMzcuNiwwcy0xMjMuMSwyNC43LTE2OCw2OS42UzAsMTc0LjEsMCwyMzcuNnMyNC43LDEyMy4xLDY5LjYsMTY4czEwNC41LDY5LjYsMTY4LDY5LjYgICAgczEyMy4xLTI0LjcsMTY4LTY5LjZzNjkuNi0xMDQuNSw2OS42LTE2OFM0NTAuNSwxMTQuNSw0MDUuNiw2OS42eiBNMzg2LjUsMzg2LjVjLTM5LjgsMzkuOC05Mi43LDYxLjctMTQ4LjksNjEuNyAgICBzLTEwOS4xLTIxLjktMTQ4LjktNjEuN2MtODIuMS04Mi4xLTgyLjEtMjE1LjcsMC0yOTcuOEMxMjguNSw0OC45LDE4MS40LDI3LDIzNy42LDI3czEwOS4xLDIxLjksMTQ4LjksNjEuNyAgICBDNDY4LjYsMTcwLjgsNDY4LjYsMzA0LjQsMzg2LjUsMzg2LjV6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPHBhdGggZD0iTTM0Mi4zLDEzMi45Yy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGwtODUuNiw4NS42TDE1MiwxMzIuOWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xICAgIGw4NS42LDg1LjZsLTg1LjYsODUuNmMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00bDg1LjYtODUuNmw4NS42LDg1LjZjMi42LDIuNiw2LjEsNCw5LjUsNCAgICBjMy41LDAsNi45LTEuMyw5LjUtNGM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMWwtODUuNC04NS42bDg1LjYtODUuNkMzNDcuNiwxNDYuNywzNDcuNiwxMzguMiwzNDIuMywxMzIuOXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></button>';
});

modificationsListModule.factory('ModificationService', function(djResource) {
        function formDataObject (data) {
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
        }
        return djResource('/api/modifications/:id/', {id: '@id'}, {
            save: {
                method: 'POST',
                transformRequest: formDataObject,
                headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
            },
            'update': {
                method:'PATCH',
                transformRequest: formDataObject,
                headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
            }
        })
    });

modificationsListModule.factory('VideoService', function(djResource) {
        return djResource('/api/videos/:id/', {id: '@id'}, {
            'update': { method:'PUT' }
        })
    });

modificationsListModule.factory('ImageService', function(djResource) {
        function formDataObject (data) {
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
        }
        return djResource('/api/screenshots/:id/', {id: '@id'}, {
            save: {
                method: 'POST',
                transformRequest: formDataObject,
                headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
            }
        })
    });

modificationsListModule.factory('FileService', function(djResource) {
        function formDataObject (data) {
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
        }
        return djResource('/api/files/:id/', {id: '@id'}, {
            save: {
                method: 'POST',
                transformRequest: formDataObject,
                headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
            }
        })
    });

modificationsListModule.directive('backButton', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);
