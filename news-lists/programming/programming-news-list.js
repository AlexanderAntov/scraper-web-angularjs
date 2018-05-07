﻿(function () {
    'use strict';

    angular.module('app.programmingNewsList', [
        'app.newsListsService'
    ])
    .controller('programmingNewsListCtrl', ProgrammingNewsListCtrl);

    function ProgrammingNewsListCtrl($http, $scope, $sce, appConst, newsListsService) {
        newsListsService.init($scope);

        $http.get('{0}/programming?images="true"'.replace('{0}', appConst.backendUrl)).then(function (response) {
            if (response && response.data && response.data.length > 0) {
                response.data.forEach(function (newsModel, index) {
                    newsModel.infoHtml = $sce.trustAsHtml(newsModel.info);
                });
                $scope.newsList = response.data;
                $scope.pristineNewsList = response.data;
            }
        });
    }
})();
