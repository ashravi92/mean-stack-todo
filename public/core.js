var app = angular.module('todoapp', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error : ' + data);
        });

    //creating a todo application
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);

            })
            .error(function(data) {
                console.log("Error : " + data);
            });
    };
    // delete a todo
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log("Error " + data);
            });
    }

}