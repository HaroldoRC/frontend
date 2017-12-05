angular.module('primeiraApp').controller('CannonsCtrl', [
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  CannonsController
])

function CannonsController(vm, $http, $location, msgs, tabs, consts) {
  vm = this
  vm.getCannons = function() {
    const page = parseInt($location.search().page) || 1
    const url = `${consts.apiUrl}/cannonScenes`
    vm.get(url).then(function(resp) {
      vm.Cannons = resp.data
      vm.Cannons = {}
      initCannons()
      tabs.show(vm, {tabList: true, tabCreate: true})
    })
  }

  vm.createCannon = function() {
    const url = `${consts.apiUrl}/cannonScenes`;
    $http.post(url, vm.cenaCanhoes).then(function(response) {
      vm.cenaCanhoes = {}
      initCannons()
      vm.getCannons()
      msgs.addSuccess('Operação realizada com sucesso!!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  vm.showTabUpdate = function(cenaCanhoes) {
    vm.cenaCanhoes = cenaCanhoes
    initCannons()
    tabs.show(vm, {tabUpdate: true})
  }

  vm.updateCannon = function() {
    const url = `${consts.apiUrl}/cenasCanhoes/${vm.cenaCanhoes._id}`
    $http.put(url, vm.cenaCanhoes).then(function(response) {
      vm.cenaCanhoes = {}
      initCannons()
      vm.getCannons()
      tabs.show(vm, {tabList: true, tabCreate: true})
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  vm.showTabDelete = function(cenaCanhoes) {
    vm.cenaCanhoes = cenaCanhoes
    initCannons()
    tabs.show(vm, {tabDelete: true})
  }

  vm.deleteCannon = function() {
    const url = `${consts.apiUrl}/cenasCanhoes/${vm.cannon._id}`
    $http.delete(url, vm.cannon).then(function(response) {
       vm.cannon = {}
       initCannons()
       vm.getCannons()
       tabs.show(vm, {tabList: true, tabCreate: true})
       msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
       msgs.addError(resp.data)
    })
  }

  vm.addCanhao = function(index) {
    vm.cenaCanhoes.canhoes.splice(index + 1, 0, {})
  }

  vm.cloneCanhao = function(index, {nome, ip, canal}) {
    vm.cenaCanhoes.canhoes.splice(index + 1, 0, {nome, ip, canal})
    initCannons()
  }

  vm.deleteCanhao = function(index) {
    vm.cenaCanhoes.canhoes.splice(index, 1)
    initCannons()
  }

  vm.addParametro = function(index) {
    vm.cenaCanhoes.canhoes.parametros.splice(index + 1, 0, {nome: null, canal: null, valor:null})
  }

  vm.cloneParametro = function(index, {nome, canal, valor}) {
    vm.cenaCanhoes.canhoes.parametros.splice(index + 1, 0, {nome, canal, valor})
    initCannons()
  }

  vm.deleteParametro = function(index) {
    vm.cenaCanhoes.canhoes.parametros.splice(index, 1)
    initCannons()
  }

  vm.cancel = function() {
    tabs.show(vm, {tabList: true, tabCreate: true})
    vm.cenaCanhoes = {}
    initCannons()
  }

  vm.showModalParametros = function(cenaCanhoes) {
    vm.cenaCanhoes = cenaCanhoes
    initParametros()
  }

  var initCannons = function() {
    if(!vm.cenaCanhoes.canhoes || !vm.cenaCanhoes.canhoes.length) {
      vm.cenaCanhoes.canhoes = []
      vm.cenaCanhoes.canhoes.push({})
    }
  }
  var initParametros = function() {
    if(!vm.cenaCanhoes.canhoes.parametros || !vm.cenaCanhoes.canhoes.parametros.length) {
    vm.cenaCanhoes.canhoes.parametros = []
    vm.cenaCanhoes.canhoes.parametros.push({})
    }
  }
  vm.getCannons()
}
