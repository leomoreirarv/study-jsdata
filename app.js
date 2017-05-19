(function(){
    "use strict";

    angular
    .module("test", ["js-data"]);
})();

(function(){
     "use strict";
    angular
        .module('test')
        .factory("store", function(){
            var adapter = new DSLocalForageAdapter();
            var store = new JSData.DS();
            store.registerAdapter('lf', adapter, { default: true });
            return store;
        });
})();

(function(){
     "use strict";
    angular
        .module('test')
        .factory("User", function(store){
            return store.defineResource("user");
        });
})();

(function(){
     "use strict";
    angular
        .module('test')
        .controller("HomeController", function(User, $scope){
            var vm = this;

           
            User.findAll().then(function(users){
                $scope.users = users;
            });

            User.bindAll({}, $scope, 'users');

            vm.createUser = function(usr){
               return User.create(usr).then(function(users){
                    console.log("Success");
                    vm.name = "";
               }, function(){
                   console.log(arguments);
               });
            }

            vm.destroyUser = function(user){
                return User.destroy(user.id);
            }
        });
})();