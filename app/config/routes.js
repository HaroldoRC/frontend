angular.module('primeiraApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('billingCycle', {
      url: "/billingCycles?page",
      templateUrl: "billingCycle/tabs.html"
    }).state('cenaCanhoes', {
      url: "/cenasCanhoes?page",
      templateUrl: "cenaCanhoes/tabs.html"
    }).state('cannon', {
      url: "/cannon?page",
      templateUrl: "cannon/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
