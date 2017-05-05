angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    // $scope.loginData = {};

    // // Create the login modal that we will use later
    // $ionicModal.fromTemplateUrl('templates/login.html', {
    //   scope: $scope
    // }).then(function (modal) {
    //   $scope.modal = modal;
    // });

    // // Triggered in the login modal to close it
    // $scope.closeLogin = function () {
    //   $scope.modal.hide();
    // };

    // // Open the login modal
    // $scope.login = function () {
    //   $scope.modal.show();
    // };

    // // Perform the login action when the user submits the login form
    // $scope.doLogin = function () {
    //   console.log('Doing login', $scope.loginData);

    //   // Simulate a login delay. Remove this and replace with your login
    //   // code if using a login system
    //   $timeout(function () {
    //     $scope.closeLogin();
    //   }, 1000);
    // };
  })

  .controller('ServerCtrl', function ($scope) {

  })

  .controller('ServerSettingCtrl', function ($scope, $http, $state) {

    var server_id = $state.params.serverID;

    // load JSON
    $http.get('data/servers.json').success(
      function (data) {
        $scope.server_title = data[server_id].title;
        $scope.timestamps = data[server_id].timestamps;
        $scope.notifications = data[server_id].notifications;
        $scope.highlights = data[server_id].highlights;
        $scope.address = data[server_id].address;
        $scope.nick = data[server_id].nick;
        $scope.channels = data[server_id].channels;

        
        console.log($scope.timestamps);
      });

    $scope.$on("$ionicView.loaded",
      function ($scope) {
        // console.log($scope);
      }
    );



    // debug stuff
    // console.log($state.params);
    // console.log($scope);
  });
