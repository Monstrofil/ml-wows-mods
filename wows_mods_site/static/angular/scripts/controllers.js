/**
 * Created by shish on 10.08.2016.
 */
var modificationsListModule = angular.module("modifications_application");

modificationsListModule.controller("modifications_controller", function ($scope, $http, ModificationService) {
    var modifications = ModificationService.query(function() {
        $scope.modifications = modifications;
    });
});


modificationsListModule.controller("modification_controller", function ($scope, $http, $routeParams, $location, ModificationService, ngDialog, FileService, Page) {
    $scope.showVideoGallery = function () {};

    $scope.showFileUploadDialog = function () {
        $scope.file = {};

        ngDialog.openConfirm({
            template: '/static/angular_templates/ml_add_file.html',
            className: 'overlay_modal fixed',
            scope: $scope,
            controller: "modification_file_upload_controller",
            showClose: false
        });
    };

    $scope.removeFile = function(file){
        console.log(file);
        var fileInfo = {};
        fileInfo.id = file.id;

        FileService.delete(fileInfo, function () {
            $scope.modification.ml_files.splice($scope.modification.ml_files.indexOf(file), 1);
        }, function(error) {
            var errorScope = $scope.$new(true);
            errorScope.error = error;
            ngDialog.open({
                template: '/static/angular_templates/ml_info_dialog.html',
                className: 'overlay_modal fixed',
                scope: errorScope,
                controller: "modification_file_upload_controller",
                showClose: false
            })
        });
    };

    $scope.$on("$destroy", function(){
        ContentTools.EditorApp.get().removeEventListener();
        ContentTools.EditorApp.get().destroy();
    });

    $scope.editing = false;

    var modification = ModificationService.get({id: $routeParams.id}, function () {
        Page.setTitle(modification.ml_name);
        $scope.modification = modification;

        var settingsScope = $scope.$new(true);
        settingsScope.ml_preview = $scope.modification.ml_preview;
        settingsScope.ml_short_description = $scope.modification.ml_short_description;

        // ngDialog.open({
        //     template: '/static/angular_templates/ml_modification_settings.html',
        //     className: 'overlay_modal fixed',
        //     scope: settingsScope,
        //     controller: "modification_settings_controller",
        //     showClose: false
        // });
        
        $scope.showVideoList = function () {
            var videoScope = $scope.$new(true);
            videoScope.ml_videos = $scope.modification.ml_videos;
            ngDialog.open({
                template: '/static/angular_templates/ml_video_list_modal.html',
                className: 'overlay_modal fixed',
                scope: videoScope,
                controller: "modification_video_list_controller",
                showClose: false
            });
        };

        $scope.showImageList = function () {
            var imageScope = $scope.$new(true);
            imageScope.ml_screenshots = $scope.modification.ml_screenshots;
            ngDialog.open({
                template: '/static/angular_templates/ml_image_list_modal.html',
                className: 'overlay_modal fixed',
                scope: imageScope,
                controller: "modification_screenshot_list_controller",
                showClose: false
            });
        };
        
        $scope.showVideoGallery = function () {
            var blueVideoList = [];
            $scope.modification.ml_videos.forEach(function (video) {
                blueVideoList.push({
                    title: '',
                    href: video.ml_video,
                    type: 'text/html',
                    youtube: video.ml_code,
                    poster: video.max_thumbnail
                })
            });
            blueimp.Gallery(blueVideoList, {'closeClass':'ml_close'});
        };

        $scope.showImageGallery = function () {
            var blueVideoList = [];
            $scope.modification.ml_screenshots.forEach(function (screenshot) {
                blueVideoList.push({
                            title: '',
                            href: screenshot.ml_image,
                            type: 'image/jpeg',
                            thumbnail: screenshot.ml_image
                        })
            });
            blueimp.Gallery(blueVideoList, {'closeClass':'ml_close'});
        };

        var editor = ContentTools.EditorApp.get();
        //editor.init('*[data-editable]', 'data-name');

        editor.addEventListener('saved', function (ev) {
            console.log(ev.detail().regions);
            var obj = {};
            obj['id'] = $scope.modification['id'];
            for(var region in ev.detail().regions){
                if(region != "ml_preview") {
                    $scope.modification[region] = ev.detail().regions[region];
                    obj[region] = ev.detail().regions[region];
                }
            }
            ModificationService.update(obj, function() { //TODO: fix bug

            });
        });

        editor.addEventListener('start', function (ev) {
            $scope.editing = true;
            $scope.ml_name_form.$show();
        });

        editor.addEventListener('stop', function (ev) {
            $scope.editing = false;
            $scope.ml_name_form.$save();
        });

        editor.addEventListener('revert', function (ev) {
            $scope.editing = false;
            $scope.ml_name_form.$cancel();

            ModificationService.get({id: $routeParams.id}, function() {

            });
        });
    }, function(data, status, headers, config) {
        $location.url('/404');
    });
});

modificationsListModule.controller("modification_file_upload_controller", function ($scope, $http, $routeParams, ModificationService, FileService, djResource) {
    $scope.setFile = function(element) {
        $scope.$apply(function ($scope) {
            $scope.file.file = element.files[0];
        });
    };

    $scope.submit_file_upload = function(upload_file_form) {
        console.log($scope);
        var ml_file = {};
        ml_file.ml_modification = $routeParams.id;
        ml_file.ml_file = $scope.file.file;
        ml_file.ml_title = $scope.file.title;

        FileService.save(ml_file, function () {
            var modification = ModificationService.get({id: $routeParams.id}, function () {
                $scope.modification.ml_files = modification.ml_files;
            });
            $scope.closeThisDialog();
        });
    };

    $scope.saveModification = function () {
        ModificationService.update($scope.modification, function() {
            console.log()
        });
    };
});

modificationsListModule.controller("modification_video_list_controller", function ($scope, $http, $routeParams, VideoService, ngDialog) {
    $scope.removeMedia = function (video) {
        var videoToRemove = {};
        videoToRemove.id = video.id;

        VideoService.delete(videoToRemove, function () {
            $scope.ml_videos.splice($scope.ml_videos.indexOf(video), 1);
        }, function(error) {
            var errorScope = $scope.$new(true);
            errorScope.error = error;
            ngDialog.open({
                template: '/static/angular_templates/ml_info_dialog.html',
                className: 'overlay_modal fixed',
                scope: errorScope,
                controller: "modification_file_upload_controller",
                showClose: false
            })
        });
    };

    $scope.showVideoUploadForm = function () {
        ngDialog.open({
            template: '/static/angular_templates/ml_video_add_modal.html',
            className: 'overlay_modal fixed',
            scope: $scope,
            controller: "modification_video_add_controller",
            showClose: false
        });
    };
});

modificationsListModule.controller("modification_video_add_controller", function ($scope, $http, $routeParams, VideoService) {
    $scope.submit_video_upload = function (form) {
        var url = form.video_url.$modelValue;
        var video_to_add = {};
        video_to_add.ml_video = url;
        video_to_add.ml_modification = $routeParams.id;

        var video = VideoService.save(video_to_add, function (data) {
            $scope.ml_videos.push(video);
            $scope.closeThisDialog();
        }, function(error) {
            $scope.error_text = error.data.ml_video[0];
        });
    };
});


modificationsListModule.controller("modification_screenshot_list_controller", function ($scope, $http, $routeParams, ImageService, ngDialog) {
    $scope.removeMedia = function (image) {
        var imageToRemove = {};
        imageToRemove.id = image.id;

        ImageService.delete(imageToRemove, function () {
            $scope.ml_screenshots.splice($scope.ml_screenshots.indexOf(image), 1);
        }, function(error) {
            var errorScope = $scope.$new(true);
            errorScope.error = error;
            ngDialog.open({
                template: '/static/angular_templates/ml_info_dialog.html',
                className: 'overlay_modal fixed',
                scope: errorScope,
                controller: "modification_file_upload_controller",
                showClose: false
            })
        });
    };

    $scope.showVideoUploadForm = function () {
        ngDialog.open({
            template: '/static/angular_templates/ml_image_add_modal.html',
            className: 'overlay_modal fixed',
            scope: $scope,
            controller: "modification_screenshot_add_controller",
            showClose: false
        })
    };
});

modificationsListModule.controller("modification_screenshot_add_controller", function ($scope, $http, $routeParams, ImageService) {
    $scope.submit_image_upload = function (form) {
        var image = $scope.image_file;
        var image_to_add = {};
        image_to_add.ml_image = image;
        image_to_add.ml_modification = $routeParams.id;

        var image_resp = ImageService.save(image_to_add, function (data) {
            $scope.ml_screenshots.push(image_resp);
            $scope.closeThisDialog();
        }, function(error) {
            $scope.error_text = error.data.ml_image[0];
        });
    };

    $scope.setFile = function(element) {
        $scope.$apply(function ($scope) {
            $scope.image_file = element.files[0];
        });
    };
});


modificationsListModule.controller("modification_settings_controller", function ($scope, $http, $routeParams, ModificationService, ngDialog) {
    $scope.setFile = function(element) {
        $scope.$apply(function ($scope) {
            $scope.image_file = element.files[0];

            var reader = new FileReader();

            reader.onload = function(event) {
                $scope.ml_preview = event.target.result;
                $scope.$apply()
            };
            reader.readAsDataURL(element.files[0]);
        });
    };
    
    $scope.submitSave = function (form) {
        var modification = {};
        modification.ml_preview = $scope.image_file;
        modification.ml_short_description = form.ml_short_description.$modelValue;
        modification.id = $routeParams.id;

        var image_resp = ModificationService.update(modification, function (data) {
            $scope.closeThisDialog();
        }, function(error) {
            $scope.error_text = error.data;
        });
    };
});