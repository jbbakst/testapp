var jbTodo = angular.module('jbTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // get all todos and show them when we view the page
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the form, send text to node api
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear form
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

      // delete a todo after checking it off
      $scope.deleteTodo = function(id) {
          $http.delete('/api/todos/' + id)
              .success(function(data) {
                  $scope.todos = data;
                  console.log(data);
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
      }
    }
}