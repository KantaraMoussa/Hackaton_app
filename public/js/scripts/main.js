import Cropper from '../libs/cropper.min.js';

var Main = {
    loadingInst: null,
    lang: null,
    appConfig: {
        Lang: 'EN',
    },
    delay: ms => {
        return new Promise(resolve => setTimeout(resolve, ms * 1000));
    },
    persistant: {
        persistantTimer: null,
        on: (caller) => {
            Main.persistant.persistantTimer = setInterval(() => {
                caller.call(Main.snippetScript);
            }, 100);
        },
        off: (caller) => {
            clearInterval(Main.persistant.persistantTimer);
            caller.call(Main.snippetScript);
        }
    },
    dataTable: (elem = "#xmdt") => {
        $(elem).DataTable({
            searching: false,
            lengthChange: false,
            info: false
        });
    },
    dataTable2: (elem = "#xmdt") => {
        $(elem).DataTable({
            searching: false,
            lengthChange: false,
            info: false,
            columnDefs: [{
                orderable: false,
                targets: -1
            }]
        });
    },
    customizeDatatable: () => {
        $(".datatable-filter-cell").find(".input").addClass('form-control').wrap("<div class='control input-group'></div>");
        $(".datatable-filter-cell").find(".control.input-group").append('\n <div class="input-group-text">\n <span class="feather feather-search"></span>\n </div>\n');
        $(".datatable-filter-cell").find("select").wrap("<div class='field'><div class='control input-group'><div class='select'></div></div></div>");
        $(".datatable-filter-cell").find(".control.input-group").append('\n <div class="icon is-small is-left">\n <i class="lnil lnil-menu-circle"></i>\n</div>\n');
        $(".datatable-filter-cell").find("select option:first-child").html("Filter by");

        $(".is-datatable tbody td .checkbox input").on("change", (function () {
            $(this).closest("tr").toggleClass("is-selected");
            $(".is-datatable td .checkbox input:checked").length > 0 ? $(".field.has-addons").removeClass("is-disabled") : $(".field.has-addons").addClass("is-disabled");
        }));

        $(".is-datatable th .checkbox input").on("change", (function () {
            !0 === $(this).prop("checked") ? ($(".is-datatable td .checkbox input").prop("checked", !0).trigger("change"), $(".field.has-addons").removeClass("is-disabled")) : ($(".is-datatable td .checkbox input").prop("checked", !1).trigger("change"), $(".field.has-addons").addClass("is-disabled"));
        }));

        $(".pagination li").click((function () {
            $(".pagination li.is-selected").removeClass("is-selected"), $(this).addClass("is-selected")
        }));
    },

    dataURLToBlob: (dataURL) => {
        // Code taken from https://github.com/ebidel/filer.js
        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(":")[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    },
    download: (dataURL, filename) => {
        if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
            window.open(dataURL);
        } else {
            var blob = Main.dataURLToBlob(dataURL);
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        }
    },
    downloadBase64: (b64, filename) => {

        let s = atob(b64)
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

        var blob = new Blob([buf], {
            type: ''
        });

        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);

    },
    notify: (text, type = 'info', position = 'topCenter', time = 2000) => {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: time,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: type,
            title: text
        })
    },
    loadingClose: (text, type = 'info') => {
        if (Main.loadingInst) Main.loadingInst.close();
    },
    loading: (text, type = 'info') => {
        Main.loadingInst = new Noty({
            type: 'alert',
            text: '<p class="text-center p-0 m-0">' + text + '</p>',
            layout: 'topCenter',
            timeout: 0,
            theme: 'mint',
            animation: {
                open: 'animate__animated animate__fadeInDown',
                close: 'animate__animated animate__fadeOutUp'
            }
        });

        Main.loadingInst.show();
    },

    /**
     * 
     * @param {Object} message - {confirmButtonText: any, text : any}
     * @param {CallableFunction} onConfirm 
     */
    confirm: (message, onConfirm) => {

        message = $j.overwrite({
            confirmButtonText: 'Oui',
            text: "Vous ne pourrez pas revenir en arrière !",
        }, message || {});

        onConfirm = onConfirm || function () { };

        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: message.text,
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: message.confirmButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            }
        })

    },
    get: (url) => {
        return new Promise((reslv, err) => {
            $j.ajax({
                url: url,
                onSuccess: function (data) {
                    reslv(data)
                }
            });
        });
    },
    post: (url, data) => {
        return new Promise((reslv, err) => {
            $j.ajax({
                method: 'POST',
                url: url,
                data: data,
                onSuccess: function (data) {
                    reslv(data)
                }
            });
        });

    },
    formControl: (el, callback, preventDefault = true) => {

        $j(el).formControl({
            preventDefault,
            style: {
                error: 'is-invalid',
                success: 'is-valid'
            },
            onSuccess: (obj, submitBtn) => {
                let data = $j(obj).formValue();
                if(callback) callback({ obj, submitBtn, data }) 
            },
            onError: function () {
                Main.notify('Champ Incorrect !', 'warning');
            }
        });
    },
    breakStr: (str, nb, endText, spBreak) => {
        endText = endText || '...';
        spBreak = undefined == spBreak ? true : spBreak;
        var text;

        if ($j.strlen(str) > nb) {

            str = $j.substr(str, 0, nb);
            if (spBreak) {
                var position_espace = $j.strrpos(str, " ");
                text = $j.substr(str, 0, position_espace);
            } else
                text = str;

            str = text + endText;
        }

        return str;
    },
    convert: {
        blobToBase64: blob => {

            return new Promise(async resolve => {

                var fileReader = new FileReader();

                fileReader.onloadend = () => {
                    resolve(fileReader.result);
                }
                fileReader.readAsDataURL(blob);

            });
        },
        blobToArrayBuffer: blob => {

            return new Promise(async resolve => {

                var fileReader = new FileReader();

                fileReader.onloadend = () => {
                    var bin = new Uint8Array(fileReader.result);
                    resolve(bin);
                }
                fileReader.readAsArrayBuffer(blob);

            });

        }
    },
    refreshImg: (el) => {
        var img = (undefined !== el) ? el + ' img' : 'img';
        $j(img).foreach(function () {
            console.log($j(this).attr('src'));
            $j(this).attr('src', $j(this).attr('src') + '?' + new Date() * Math.random());
        });

    },
    getFileSize(size) {
        var sizeStr = "";
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        } else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }
        return sizeStr;
    },
    getCureentSession() {
        return $j.date('Y') + '-' + (parseInt($j.date('Y')) + 1);
    },
    upload: {
        file: (opt) => {

            opt = $j.overwrite({
                'ext': 'Png, Jpeg, Jpg, Gif',
                'theme': null,
                'type': 'image',
                'id': null,
                'maxFileSize': 10,
                'displayBlock': '#hHUSdsdae323',
                'numFile': 10,
                'forceTo': null,
                'after': function () { },
            }, opt || {});

            let _url = '/media/upload/' + opt.type;
            if (opt.type == 'any') _url = '/media/upload/';

            $('#fileUpdWEJd663').gnuplupf({
                maxFileSize: 1048576 * opt.maxFileSize,
                maxFile: opt.numFile,
                statusId: '#status',
                displayBlock: opt.displayBlock,
                progresseId: opt.theme ? null : '#proSUhvs',
                url: _url,
                allowedTypes: opt.ext,
                onBeforeSend: function (data, xhr, file) {
                    console.log('file beforeSend');
                    // console.log(file);
                },
                formData: {
                    id: opt.id,
                    forceTo: opt.forceTo
                },
                onSuccess: function (data, xhr, file) {
                    console.log(file);
                    data.success = true;
                    data.opt = opt;
                    opt.after.call(this, data, { name: file.name, ext: $j.strrchr(file.name, '.') });

                },
                onError: function (status, errMsg) {
                    console.log(errMsg);
                    //reslv({ errMsg, opt, success: false });
                }


            });

        }
    },
    loaderImg: (el) => {
        $j(el).html('<h1 style="text-align:center"><img style="margin:10px;width:40px" src="' + baseUrl + 'images/icons/loading.gif" /></h1>');
    },
    webcam: {
        cropper: null,
        beforeTakePhoto: (webcam, picture) => {
            $('.flash')
                .show()
                .animate({
                    opacity: 0.3
                }, 500)
                .fadeOut(500)
                .css({
                    'opacity': 0.7
                });
            //window.scrollTo(0, 0);
            $j('#webcam-control').addClass('d-none');
            $j('#cameraControls').addClass('d-none');
        },
        removeCapture: (webcam) => {
            $j('#canvas').addClass('d-none');
            $j('#webcam-control').removeClass('d-none');
            $j('#cameraControls').removeClass('d-none');
            $j('#take-photo').removeClass('d-none');
            $j('#resume-camera').addClass('d-none');
            $j("#errorMsgCam").addClass("d-none");
            Main.webcam.cropper.destroy();
        },
        afterTakePhoto: (webcam, picture) => {
            webcam.stop();
            $j('#canvas').removeClass('d-none');
            $j('#take-photo').addClass('d-none');
            $j('#exit-app').removeClass('d-none');
            $j('#resume-camera').removeClass('d-none');
            $j('#cameraControls').removeClass('d-none');

            //console.log(picture);

            const image = document.getElementById('canvas');
            Main.webcam.cropper = new Cropper(image, {
                minCropBoxHeight: 250,
                aspectRatio: 3 / 4,
                crop(event) { },
            });

        }

    }


};

export default Main;