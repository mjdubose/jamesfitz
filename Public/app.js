var app = angular.module('D3App', []);
app.controller('SearchBar', function ($scope, heroBackendService) {
    $scope.show = false;
    $scope.heroList = [];
    $scope.battleTag = 'slayeneq-1864';
    $scope.selectedId = '';
    $scope.getHeroInformation = function (tag) {
        heroBackendService.getProfile(tag).then(function (response) {
            $scope.heroList = response;
        })
    };
    $scope.displayHeroInformation = function (hero) {

        $scope.selectedId = hero.characterID;
        heroBackendService.getStats($scope.selectedId, $scope.battleTag).then(function (response) {
            $scope.character = {};
            $scope.character = response;
            $scope.character.name = hero.name;
            $scope.character.level = hero.level;
            $scope.character.class = hero.class;
            $scope.character.paragonLevel = hero.paragonLevel;
            $scope.character.kills = hero.kills;
            $scope.show = true;
        }).then(function () {
            heroBackendService.getSkills($scope.selectedId).then(function (response) {
                $scope.character.skills = response;
            })
        })
            .then(function () {

                $scope.character.feet = {};
                $scope.character.head = {};
                $scope.character.torso = {};
                $scope.character.feet = {};
                $scope.character.hands = {};
                $scope.character.legs = {};
                $scope.character.bracers = {};
                $scope.character.mainhand = {};
                $scope.character.waist = {};
                $scope.character.rightFinger = {};
                $scope.character.leftFinger = {};
                $scope.character.shoulders = {};
                $scope.character.offHand = {};
                $scope.character.neck = {};
                heroBackendService.getGear($scope.selectedId)
                    .then(function (response) {
                        response.forEach(function (item) {
                            $scope.character[item.slot] = item;
                        })
                    });
            });
    };
});
    app.controller('Displayer', function ($scope) {
        $scope.equipment = false;
        $scope.statListing = false;
        $scope.getCharacter = function () {
            return $scope.character;
        };
        $scope.showId = function () {
            return $scope.selectedId;
        };
        $scope.showbattleTag = function () {
            return $scope.battleTag;
        };
        $scope.showStats = function () {
            $scope.statListing = !$scope.statListing;
        };
        $scope.showEquipment = function () {
            $scope.equipment = !$scope.equipment;
        }
    });

    app.factory('heroBackendService', function ($http) {
        var service = {};
        service.getProfile = function (tag) {
            return $http({method: 'Get', url: '/profile?id=' + tag})
                .then(function (response) {
                    return response.data;
                });
        };
        service.getStats = function (charId, battleTag) {
            return $http({
                method: 'Get',
                url: '/character?charId=' + charId + '&id=' + battleTag
            }).then(function (response) {
                return response.data[0];
            });
        };
        service.getGear = function (charId) {
            return $http({
                method: 'Get',
                url: '/character/item?charId=' + charId
            }).then(function (response) {
                return response.data;
            });
        };
        service.getSkills = function (charId) {
            return $http({
                method: 'Get',
                url: '/character/skills?charId=' + charId
            }).then(function (response) {
                return response.data;
            });
        };
        return service;

    });
