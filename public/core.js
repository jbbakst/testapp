var todoApp = angular.module('todoApp', []);
console.log("module created: " + todoApp);

todoApp.controller("TodoController", function($scope, $http) {
    $scope.formData = {};
    console.log("form data: " + $scope.formData);

    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = function(id) {
        console.log("TRYING TO DELETE");
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                console.log("SUCCESS");
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log("ERROR");
                console.log('Error: ' + data);
            });
    };
});