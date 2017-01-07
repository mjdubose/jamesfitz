var app = angular.module('D3App', []);
app.controller('SearchBar', function ($scope, heroBackendService) {
    $scope.show = false;
    $scope.heroList = [];
    $scope.battleTag = 'slayeneq-1864';
    $scope.selectedId = '';
    $scope.getHeroInformation = function (tag) {
        return heroBackendService.getProfile(tag).then(function (response) {
            $scope.heroList = response;
        });
    };
    $scope.deleteHeroInformation = function (tag) {
        return heroBackendService.deleteProfile(tag).then(function () {
            $scope.show = false;
            $scope.heroList = [];
        });
    }

    $scope.displayHeroInformation = function (hero) {

        $scope.selectedId = hero.characterID;
        return heroBackendService.getStats($scope.selectedId, $scope.battleTag).then(function (response) {
            var character = {};
            character = {};
            character = response;
            character.name = hero.name;
            character.level = hero.level;
            character.class = hero.class;
            character.paragonLevel = hero.paragonLevel;
            character.kills = hero.kills;
            $scope.character = character;
            $scope.show = true;
        }).then(function () {
            return heroBackendService.getSkills($scope.selectedId).then(function (response) {
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
                return heroBackendService.getGear($scope.selectedId)
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
        return $http({ method: 'Get', url: '/profile?id=' + tag })
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

    service.deleteProfile = function (battleTag) {
        return $http({
            method: 'Delete',
            url: '/profile/delete?id=' + battleTag
        });
    }
    return service;

});
