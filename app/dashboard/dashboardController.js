angular.module('primeiraApp').controller('DashboardCtrl', [
  '$http',
  'consts',
  DashboardController
])

function DashboardController($http, consts) {
  const vm = this
  vm.getSummary = function() {
    const url = `${consts.apiUrl}/billingSummary`;
    $http.get(url).then(function(response) {
      const {credit = 0, debt = 0} = response.data
      vm.credit = credit
      vm.debt = debt
      vm.total = credit - debt
    })
  }

  vm.getSummary()

  vm.barChart = function() {
      const url = `${consts.apiUrl}/billingCycles`;
      $http.get(url).then(function(response) {
        vm.billingCycles = response.data
        var labels = []
        var dataCredits = []
        var dataDebts = []
        var dataTotal = []
        vm.billingCycles.forEach(function(billingCycle) {
          var sumCredits = 0
          var sumDebts = 0
          var total = 0
          labels.push(billingCycle.name)
          
          billingCycle.credits.forEach(function(credit) {
            sumCredits = sumCredits + credit.value
          },this)
          billingCycle.debts.forEach(function(debt) {
            sumDebts = sumDebts + debt.value
          },this)
          
          total = sumCredits - sumDebts
          dataCredits.push(sumCredits)
          dataDebts.push(sumDebts)
          dataTotal.push(total)
          
        }, this)
        
        var areaChartData = {
          labels  : labels,
          datasets: [
            {
              label               : 'Créditos',
              fillColor           : 'rgba(210, 214, 222, 1)',
              strokeColor         : 'rgba(210, 214, 222, 1)',
              pointColor          : 'rgba(210, 214, 222, 1)',
              pointStrokeColor    : '#c1c7d1',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data                : dataCredits
            },
            {
              label               : 'Débitos',
              fillColor           : 'rgba(60,141,188,0.9)',
              strokeColor         : 'rgba(60,141,188,0.8)',
              pointColor          : '#3b8bba',
              pointStrokeColor    : 'rgba(60,141,188,1)',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(60,141,188,1)',
              data                : dataDebts
            },
            {
              label               : 'Saldo',
              fillColor           : 'rgba(60,141,188,0.9)',
              strokeColor         : 'rgba(60,141,188,0.8)',
              pointColor          : '#3b8bba',
              pointStrokeColor    : 'rgba(60,141,188,1)',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(60,141,188,1)',
              data                : dataTotal
            }
          ]
        }

        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
        var barChart                         = new Chart(barChartCanvas)
        var barChartData                     = areaChartData
        barChartData.datasets[0].fillColor   = '#00a65a'
        barChartData.datasets[0].strokeColor = '#00a65a'
        barChartData.datasets[0].pointColor  = '#00a65a'
        barChartData.datasets[1].fillColor   = '#EE3B3B'
        barChartData.datasets[1].strokeColor = '#EE3B3B'
        barChartData.datasets[1].pointColor  = '#EE3B3B'
        var barChartOptions                  = {
          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
          scaleBeginAtZero        : true,
          //Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines      : true,
          //String - Colour of the grid lines
          scaleGridLineColor      : 'rgba(0,0,0,.05)',
          //Number - Width of the grid lines
          scaleGridLineWidth      : 1,
          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,
          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines  : true,
          //Boolean - If there is a stroke on each bar
          barShowStroke           : true,
          //Number - Pixel width of the bar stroke
          barStrokeWidth          : 2,
          //Number - Spacing between each of the X value sets
          barValueSpacing         : 5,
          //Number - Spacing between data sets within X values
          barDatasetSpacing       : 1,
          //String - A legend template
          legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
          //Boolean - whether to make the chart responsive
          responsive              : true,
          maintainAspectRatio     : true
        }
    
        barChartOptions.datasetFill = false
        barChart.Bar(barChartData, barChartOptions)
      })
  }

  vm.barChart()

}
