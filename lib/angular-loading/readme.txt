url:  https://github.com/yuechong/angular-loading  spin.js  http://spin.js.org/


Add angular-loading.min.js and angular-loading.css to your HTML. Also add spin.js library.
like this:
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/spin.js/1.2.7/spin.min.js"></script>
<script src="//rawgithub.com/darthwade/angular-loading/master/angular-loading.min.js"></script>

<link rel="stylesheet" type="text/css" href="//rawgithub.com/darthwade/angular-loading/master/angular-loading.css"/>


Add darthwade.dwLoading as a module dependency for your app.

angular.module('myApp', ['darthwade.dwLoading']);

Add dw-loading directive to that block which you want to lock during loading.

<div dw-loading="key" dw-loading-options="options"></div>

Example:

<div dw-loading="users" dw-loading-options="{text: 'Loading users...'}" class="users-list">
  <p ng-repeat="user in users">{{user.name}}</p>
</div>
function SampleCtrl($scope, $loading) {
  $scope.loadUsers = function() {
    // Lock UI and show spinner
    $loading.start('users');

    $http({method: 'GET', url: '/someUrl'})
        .success(function(data, status, headers, config) {
          $scope.users = data;

          // Unlock UI and hide spinner
          $loading.finish('users');
        });
  };

  $scope.loadUsers();
}

Options:

{
  active: false, // Defines current loading state
  text: 'Loading...', // Display text
  className: '', // Custom class, added to directive
  overlay: true, // Display overlay
  spinner: true, // Display spinner
  spinnerOptions: {
    lines: 12, // The number of lines to draw
    length: 7, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    rotate: 0, // Rotation offset
    corners: 1, // Roundness (0..1)
    color: '#000', // #rgb or #rrggbb
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 2, // Rounds per second
    trail: 100, // Afterglow percentage
    opacity: 1 / 4, // Opacity of the lines
    fps: 20, // Frames per second when using setTimeout()
    zIndex: 2e9, // Use a high z-index by default
    className: 'dw-spinner', // CSS class to assign to the element
    top: 'auto', // Center vertically
    left: 'auto', // Center horizontally
    position: 'relative' // Element position
  }
}

API:

$loading.setDefaultOptions(options) - Overrides default options.

$loading.start(key) - Activates loading state by key.

$loading.finish(key) - Deactivates loading state by key.

Events:

$loadingStart - Fired once the loading is started. The '$rootScope' emits the event.

$scope.$on('$loadingStart', function(event, key){ ... });
$loadingFinish - Fired once the loading is finished. The '$rootScope' emits the event.

$scope.$on('$loadingFinish', function(event, key){ ... });


Styling:

<div dw-loading="key" dw-loading-options="{className: 'custom-loading', spinnerOptions: {className: 'custom-spinner'}}" class="my-block">
  <p>Content</p>
</div>