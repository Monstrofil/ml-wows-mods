/**
 * Created by shish on 08.08.2016.
 */
(function(angular) {
  'use strict';

  function ifLoading($http) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        scope.isLoading = isLoading;

        scope.$watch(scope.isLoading, toggleElement);

        ////////

        function toggleElement(loading) {
            if (loading) {
                elem[0].style.visibility = "visible";
                elem[0].style.opacity = "1";
            } else {
                elem[0].style.visibility = "hidden";
                elem[0].style.opacity = "0";
            }
        }

        function isLoading() {
          return $http.pendingRequests.length > 0;
        }
      }
    };
  }

  ifLoading.$inject = ['$http'];

  angular
    .module('modifications_application')
    .directive('ifLoading', ifLoading);
}(angular));