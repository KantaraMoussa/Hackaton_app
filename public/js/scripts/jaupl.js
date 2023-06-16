"use strict";
(function ($) {

    if ($.fn.ajaxForm == undefined) {

        $.getScript("https://malsup.github.io/jquery.form.js");

    }
    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;
    feature.working = false;

    $.fn.gnuplupf = function (options) {

        var opt = $.extend({
            url: " ",
            method: "POST",
            enctype: "multipart/form-data",
            fileName: "myfile",
            allowedTypes: "*",
            fileTypes: " ",
            statusId: "#staSUhvs",
            progresseId: "#probar",
            idAbort: '#abortpa',
            displayBlock: '#hHUSdsdae323',
            uploadClass: 'gr',
            maxFileSize: 1024,
            maxFile: 10,
            formGroup: "file-upload-" + (new Date().getTime()),
            formData: {},
            dynamicFormData: function () {
                return {};
            },
            onBeforeSend: function (xhr, o, file) { },
            onSubmit: function (files, xhr) { },
            onSuccess: function (files, response, xhr, ext) { },
            onError: function (files, status, message) { },
            onProgress: function (event, position, total, percentComplete) { },
            showProgress: true,
            showAbort: true,
            showError: true,
            onSelect: function (files) {
                return true;
            }
        }, options);

        var obj = this;
        var uploadLabel = $(this);
        (function jqueryFormLoaded() {
            if ($.fn.ajaxForm) createCutomInputFile(obj, opt, uploadLabel);
            else window.setTimeout(checkAjaxFormLoaded, 10);
        })();
        function serializeData(extraData) {
            var serialized = [];
            if (jQuery.type(extraData) == "string") {
                serialized = extraData.split('&');
            } else {
                serialized = $.param(extraData).split('&');
            }
            var len = serialized.length;
            var result = [];
            var i, part;
            for (i = 0; i < len; i++) {
                serialized[i] = serialized[i].replace(/\+/g, ' ');
                part = serialized[i].split('=');
                result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
            }
            return result;
        }
        function isFileTypeAllowed(opt, fileName) {

            var fileExtensions = $j.array_map(
                function (ext) {
                    return $j.trim(ext);
                }, opt.allowedTypes.toLowerCase().split(","));
            var ext = fileName.split('.').pop().toLowerCase();
            if (opt.allowedTypes != "*" && jQuery.inArray(ext, fileExtensions) < 0) {
                return false;
            }
            return true;
        }

        function getFileSize(size) {
            var sizeStr = "";
            var sizeKB = size / 1024;
            if (parseInt(sizeKB) > 1024) {
                var sizeMB = sizeKB / 1024;
                sizeStr = sizeMB.toFixed(2) + " MB";
            } else {
                sizeStr = sizeKB.toFixed(2) + " KB";
            }
            return sizeStr;
        }

        function createProgressDiv(opt) {

            this.progressDiv = $("<div class='file-upload-progress progress ks-progress-xs'>").hide();
            this.abort = $(opt.idAbort).hide();
            this.progressbar = $("<div class='file-upload-bar progress-bar progress-bar-striped bg-info' role='progressbar' aria-valuemin='0' aria-valuemax='100'></div>").appendTo(this.progressDiv);
            $(opt.progresseId).html('').append(this.progressDiv);



        }

        function beginUpload(opt, form, fileArray) {

            var pb = opt.progresseId ? new createProgressDiv(opt) : null;
            ajaxFormSubmit(obj, opt, form, pb, fileArray);
            $(opt.statusId).hide();
            $(opt.idAbort).show('slow');

        }

        function createCutomInputFile(obj, opt, uploadLabel) {

            if (feature.working) {
                $(opt.statusId).html('Un envoie est déjà en cours 2').show()

            } else {

                var fileUploadId = "jb-upload-id-" + (new Date().getTime());
                var form = $("<form method='" + opt.method + "' action='" + opt.url + "' enctype='" + opt.enctype + "'></form>");
                var fileInputStr = "<input type='file' id='" + fileUploadId + "' name='" + opt.fileName + "'/>";
                uploadLabel.unbind("click");
                var fileInput = $(fileInputStr).appendTo(form);

                fileInput.change(function (e) {


                    if (feature.working) {

                        $(opt.statusId).html('Un envoie est dejas en cours 3').show();
                        return;

                    } else {

                        //var fileExtensions = opt.allowedTypes.toLowerCase().split(",");
                        var fileName = null;

                        if ($j(opt.displayBlock + '> *').count() > opt.maxFile - 1) {
                            $(opt.statusId).html("Number of file <strong>" + opt.maxFile + "</strong> reached</div>").show();
                            return;
                        }
                        //alert(opt.maxFile)

                        if (this.files) //supporte l'api files
                        {

                            fileName = this.files[0].name;
                            var ext = fileName.split('.').pop().toLowerCase();
                            opt.fileTypes = ext;
                            if (!isFileTypeAllowed(opt, fileName)) {

                                if (opt.showError) $(opt.statusId).html("Les fichiers <strong>." + ext + "</strong> ne sont pas autorise, <b>" + opt.allowedTypes + "</b> sont autorise</div>").show();
                                return;

                            }
                            if (opt.onSelect(this.files) == false) return;

                            if (this.files[0].size > opt.maxFileSize) {
                                if (opt.showError) $(opt.statusId).html("Taille maximum : <strong>" + getFileSize(opt.maxFileSize) + "<strong></div>").show(); return;
                            }

                            beginUpload(opt, form, this.files);

                        } else {

                            var filenameStr = $(this).val();
                            var flist = [];
                            fileName = filenameStr;
                            var ext = fileName.split('.').pop().toLowerCase();
                            opt.fileTypes = ext;
                            if (!isFileTypeAllowed(opt, filenameStr)) {

                                if (showError) $(opt.statusId).html("<b>" + ext + " n'est pas autorise</div>").show();
                                return;

                            }
                            //fallback for browser without FileAPI
                            flist.push({
                                name: filenameStr,
                                size: 'NA'
                            });
                            if (opt.onSelect(flist) == false) return;

                            beginUpload(opt, form, this.files);

                        }

                    }

                });

                form.css({
                    'margin': 0,
                    'padding': 0
                });

                var uplwidth = uploadLabel.width();
                var uplheight = uploadLabel.height();

                uploadLabel.addClass(opt.uploadClass);

                uploadLabel.css({

                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default'

                });

                fileInput.css({
                    'position': 'absolute',
                    'cursor': 'pointer',
                    'top': '1px',
                    'width': uplwidth * 5,
                    'height': uplheight * 2,
                    'right': '0px',
                    'z-index': '100',
                    'filter': 'alpha(opacity=0)',
                    '-ms-filter': "alpha(opacity=0)",
                    '-khtml-opacity': '0.0',
                    '-ms-opacity': '0.0',
                    '-moz-opacity': '0.0',
                    'opacity': '0.0'
                });

                form.appendTo(uploadLabel);

                if (navigator.appVersion.indexOf("MSIE ") != -1) { //IE Browser

                    uploadLabel.attr('for', fileUploadId);

                } else {

                    uploadLabel.click(function () {

                        //fileInput.click();
                        fileInput.blur();

                    });
                }

            }

        }


        function ajaxFormSubmit(obj, opt, form, pb, fileArray) {

            var options = {
                cache: false,
                contentType: false,
                processData: false,
                forceSync: false,
                data: opt.formData,
                type: opt.method,
                // dataType: 'json',				

                beforeSend: function (xhr, o) {

                    feature.working = true;
                    if (pb) pb.progressDiv.show();
                    $(opt.progresseId).show('fade');


                    if (pb && opt.showAbort) {
                        pb.abort.show();
                        pb.abort.click(function () {
                            xhr.abort();
                            pb.progressDiv.hide("slow");
                            form.remove();
                            createCutomInputFile(obj, opt, uploadLabel);
                        });
                    }

                    if (pb) {
                        if (!feature.formdata) //For iframe based push
                        {
                            pb.progressbar.width('5%');
                        } else { pb.progressbar.width('1%'); } //Fix for small files
                    }

                    opt.onBeforeSend.call(this, xhr, o, fileArray[0]);

                },
                beforeSubmit: function (formData, $form, options) {
                    if (opt.onSubmit.call(this, fileArray) != false) {
                        var dynData = opt.dynamicFormData();
                        if (dynData) {
                            var sData = serializeData(dynData);
                            if (sData) {
                                for (var j = 0; j < sData.length; j++) {
                                    if (sData[j]) {
                                        if (opt.fileData != undefined) options.formData.append(sData[j][0], sData[j][1]);
                                        else options.data[sData[j][0]] = sData[j][1];
                                    }
                                }
                            }
                        }
                        return true;
                    }
                    return false;
                },
                uploadProgress: function (event, position, total, percentComplete) {

                    event.file = fileArray[0];
                    //Fix for smaller file uploads in MAC
                    if (percentComplete > 98) percentComplete = 98;

                    var percentVal = percentComplete + '%';
                    if (pb && percentComplete > 1) pb.progressbar.width(percentVal);
                    if (pb && opt.showProgress) {
                        pb.progressbar.html(percentVal);
                        pb.progressbar.css('text-align', 'center');
                    }
                    opt.onProgress.call(this, event, position, total, percentComplete);
                    //console.log(position);


                },

                success: function (data, message, xhr) {

                    if (pb) {

                        pb.progressbar.width('100%')
                        if (opt.showProgress) {
                            pb.progressbar.html('100%');
                            pb.progressbar.css('text-align', 'center');
                        }

                        pb.abort.hide('slow');
                        pb.progressDiv.hide('slow');

                        $(opt.progresseId).hide('slow');
                        
                    }


                    form.remove();
                    $(opt.statusId).html("");
                    feature.working = false;
                    createCutomInputFile(obj, opt, uploadLabel);
                    //alert(data);

                    opt.onSuccess.call(this, data, xhr, fileArray[0]);
                },

                error: function (xhr, status, errMsg) {

                    if (pb) {
                        pb.abort.hide();
                        $(opt.progresseId).hide('slow');
                        pb.progressDiv.hide();
                    }
                    $(opt.statusId).html("<span style='color:red;'>ERROR: " + errMsg + "</span>").show();
                    xhr.abort();
                    form.remove();
                    opt.onError.call(this, status, errMsg);

                }

            };

            if (feature.working) {
                $(opt.statusId).html('Un envoie est déjà en cours 1').show()

            } else {

                form.ajaxSubmit(options);
            }
            //alert(options);

        }



        //alert(jauplo.method);
        //alert($.fn.ajaxForm);

        return this;

    };

}(jQuery));











