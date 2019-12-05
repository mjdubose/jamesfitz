const app = angular.module('D3App', ['bsLoadingOverlay', 'bsLoadingOverlaySpinJs']).run(function (bsLoadingOverlayService) {
    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'bsLoadingOverlaySpinJs'
    })
});
app.controller('SearchBar', function ($scope, heroBackendService, bsLoadingOverlayService) {
    $scope.show = false;
    $scope.heroList = [];
    $scope.battleTag = 'slayeneq-1864';
    $scope.selectedId = '';
    $scope.getHeroInformation = function (tag) {
        bsLoadingOverlayService.start();
        return heroBackendService.getProfile(tag).then(function (response) {
            $scope.heroList = response;
            bsLoadingOverlayService.stop();
        });
    };
    $scope.deleteHeroInformation = async (tag) => {
        try {
            bsLoadingOverlayService.start();
            await heroBackendService.deleteProfile(tag);
            $scope.show = false;
            $scope.heroList = [];
            bsLoadingOverlayService.stop();
        } catch (error) {
            console.log(error);
            bsLoadingOverlayService.stop();
        }

    };

    $scope.displayHeroInformation = async (hero) => {
        try {
              console.log(hero);
            $scope.selectedId = hero.characterID;
            bsLoadingOverlayService.start();
            let character = await heroBackendService.getStats($scope.selectedId, $scope.battleTag);

          if (typeof character === "undefined")
          {    bsLoadingOverlayService.stop();
              return;}
            character.name = hero.name;
            character.level = hero.level;
            character.class = hero.class;
            character.paragonLevel = hero.paragonLevel;
            character.kills = hero.kills;
            character.feet = {};
            character.head = {};
            character.torso = {};
            character.feet = {};
            character.hands = {};
            character.legs = {};
            character.bracers = {};
            character.mainhand = {};
            character.waist = {};
            character.rightFinger = {};
            character.leftFinger = {};
            character.shoulders = {};
            character.offHand = {};
            character.neck = {};

            character.skills = await heroBackendService.getSkills($scope.selectedId);

            let gear = await heroBackendService.getGear($scope.selectedId);

            gear.forEach(item => {
                character[item.slot] = item;
            });

            character.cubeItems = await heroBackendService.getCubeItems($scope.selectedId);
            bsLoadingOverlayService.stop();
            $scope.character = character;
            $scope.show = true;
        } catch (error) {
            console.log(error);
            bsLoadingOverlayService.stop();
        }
    }
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

    app.factory('heroBackendService', ($http, bsLoadingOverlayService) => {
        var service = {};
        service.getProfile = function (tag) {
            bsLoadingOverlayService.start();
            return $http({method: 'Get', url: '/profile?id=' + tag})
                .then(function (response) {
                    bsLoadingOverlayService.stop();
                    return response.data;
                }, function (error) {
                    console.log(error);
                    bsLoadingOverlayService.stop();
                });

        };
        service.getStats = function (charId, battleTag) {
            return $http({
                method: 'Get',
                url: '/character?charId=' + charId + '&id=' + battleTag
            }).then(function (response) {
                return response.data[0];
            }, function (error) {
                console.log(error);
            });
        };
        service.getGear = function (charId) {
            return $http({
                method: 'Get',
                url: '/character/item?charId=' + charId
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
            });
        };

        service.getCubeItems = function (charId) {
            return $http({
                method: 'Get',
                url: '/character/cube?charId=' + charId
            }).then(function (response) {
                console.log(response.data);
                return response.data;
            }, function (error) {
                console.log(error);
            });
        };
        service.getSkills = function (charId) {
            return $http({
                method: 'Get',
                url: '/character/skills?charId=' + charId
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
            });
        };

        service.deleteProfile = function (battleTag) {
            return $http({
                method: 'Delete',
                url: '/profile/delete?id=' + battleTag
            });
        };
        return service;

    });
