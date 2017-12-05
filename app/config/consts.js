angular.module('primeiraApp').constant('consts', {
  appName: 'MEAN - Primeira Aplicação',
  version: '1.0',
  owner: 'Cod3r',
  year: '2017',
  site: 'http://cod3r.com.br',
  apiUrl: 'http://billingcycle.jelasticlw.com.br/api',
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
