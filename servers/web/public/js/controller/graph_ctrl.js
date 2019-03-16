app.controller('graphCtrl', function ($scope, $http, $interval, $rootScope, $routeParams /* , $location */) {
  $rootScope.sidebar = true;

  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        type: 'linear',
        display: true,
        position: 'left'
      }]
    },
    elements: {
      line: {
        tension: 0,
        fill: false,
      }
    }
  };

  const taskSetId = $routeParams.task_set_id;

  $http
    .get('/api/graph/plot_info', {
      params: { taskSetId }
    })
    .then(function (response) {
      $scope.axes = response.data.axes;
      $scope.curves = response.data.curves;
      $scope.argumentTemplate = response.data.argumentTemplate;
    });

  $scope.getPlotData = function (graph) {
    let promise;

    $scope.start = function () {
      $scope.stop();

      plotData(graph, taskSetId, $http, $scope);

      promise = $interval(function () {
        plotData(graph, taskSetId, $http, $scope);
      }, 1500);
    };

    $scope.stop = function () {
      $interval.cancel(promise);
    };

    $scope.start();

    $scope.$on('$destroy', function () {
      $scope.stop();
    });
  };
});

function plotData(graph, taskSetId, $http, $scope) {
  $http
    .get('/api/graph/plot_data', {
      params: {
        index: graph.curve,
        xAxis: graph.xAxis,
        yAxis: graph.yAxis,
        taskSetId
      }
    })
    .then(function (response) {
      const curves = response.data;

      const labels = [];
      const data = [];

      for (let curve in curves) { // eslint-disable-line
        const curveData = [];
        for (let xAxis in curves[curve]) { // eslint-disable-line
          if (labels.indexOf(xAxis) === -1) {
            // Push if doesn't exist already
            labels.push(xAxis);
          }

          // TODO: here, get here the
          let yAxisValue = 0;

          for (let i = 0; i < curves[curve][xAxis].length; i += 1) {
            yAxisValue += curves[curve][xAxis][i];
          }

          yAxisValue /= curves[curve][xAxis].length;

          curveData.push(yAxisValue);
        }

        data.push(curveData);
      }

      $scope.data = data;
      $scope.labels = labels;
    });
}
