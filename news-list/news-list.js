﻿(function () {
    'use strict';

    angular.module('app.newsList', [])
        .controller('newsListCtrl', NewsListCtrl);

    function NewsListCtrl($http, $scope) {
        $scope.onSearchValueChange = onSearchValueChange;
        $scope.$watch('searchInputVisible', cleanSearchValue);

        $http.get('https://scraper-api.herokuapp.com/news?images="true"').then(function (response) {
            if (response && response.data) {
                $scope.newsList = response.data;
                $scope.pristineNewsList = response.data;
            }
        });

        function cleanSearchValue(value) {
            if (!value) {
                $scope.searchValue = '';
                $scope.newsList = $scope.pristineNewsList;
            }
        }

        function onSearchValueChange(value) {
            var filteredNewsList = [],
                lowerCaseValue;

            if (value && value.length > 2) {
                lowerCaseValue = value.toLowerCase();
                $scope.pristineNewsList.forEach(function (newsModel) {
                    if ((newsModel.title && newsModel.title.toLowerCase().indexOf(lowerCaseValue) > -1) ||
                        (newsModel.info && newsModel.info.toLowerCase().indexOf(lowerCaseValue) > -1)) {
                        filteredNewsList.push(newsModel);
                    }
                });
            } else {
                filteredNewsList = $scope.pristineNewsList;
            }

            $scope.newsList = filteredNewsList;
        }
    }
})();
