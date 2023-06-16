import Main from "./main.js";
import Webcam from "./webcam.js";

window.UGEST = {
  user: {
    init: () => {
      UGEST.user.addUser();
      UGEST.user.updateUser();
      UGEST.user.ChangePassword();
      UGEST.user.validToken();
      UGEST.user.login();
    },
    addUser: () => {
      let subBtn = $("#add-user-btn");
      if ($j("#add-user").count() != 0) {
        subBtn.click(() => {
          $("#add-user").submit();
        });
        Main.formControl("#add-user", async (form) => {
          Main.confirm({ text: "" }, async () => {       
            form.data.action = "add_user";
           // subBtn.addClass("ks-is-loading");
           let res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
                      Main.notify("Votre compte a été créer avec success");
            } else {
              Main.notify(res.msg, "error");
            }
            subBtn.removeClass("ks-is-loading");
          });
        });
      }
    },
    login: () => {
      if ($j("#loginUser").count() != 0) {
        Main.formControl("#loginUser", async (form) => {
          form.data.action = "login";
          //$j(form.submitBtn).addClass("ks-is-loading");
          let res = JSON.parse(
            await Main.post($j(form.obj).attr("action"), form.data)
          );
          if (res.success == true) {
            location.href = "user/auth2/"+res.session.id_user;
          } else {
            Main.notify("Login ou mot de passe incoreecte");
          }
         // $j(form.submitBtn).removeClass("ks-is-loading");
        });
      }
    },
    validToken: () => {
      let subBtn = $("#AuthConfirmation-btn");
      if ($j("#AuthConfirmation").count() != 0) {
        subBtn.click(() => {
          $("#AuthConfirmation").submit();
        });
        Main.formControl("#AuthConfirmation", async (form) => {
          Main.confirm({ text: "" }, async () => {       
            form.data.action = "valide_token";
            form.data.id = $j(form.obj).data("id");
           // subBtn.addClass("ks-is-loading");
           let res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
              location.href = "../../dashboard";
            } else {
              Main.notify(res.msg, "error");
            }
            subBtn.removeClass("ks-is-loading");
          });
        });
      }
    },

    updateUser: () => {
      let subBtn = $("#edit-profil-btn");
      if ($j("#edit-profil").count() != 0) {
        subBtn.click(() => {
          $("#edit-profil").submit();
        });

        Main.formControl("#edit-profil", async (form) => {
          Main.confirm({ text: "" }, async () => {
            form.data.action = "edit-profil";
            form.data.id = $j(form.obj).data("id");
            subBtn.addClass("ks-is-loading");
           let res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
                  Main.notify("Modifié avec success", "success");
            } else {
              Main.notify(res.msg, "error");
            }
            subBtn.removeClass("ks-is-loading");
          });
        });
      }
    },
    ChangePassword: () => {
      if ($j("#Change-password").count() != 0) {
        let subBtn = $("#Change-password-btn");

        subBtn.click(() => {
          $("#Change-password").submit();
        });

        Main.formControl("#Change-password", async (form) => {
          Main.confirm({ text: "" }, async () => {
            form.data.action = "change_Password";
            let res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
              Main.notify("Mot de pass Modifié avec success");
            } else {
              Main.notify(res.msg, "error");
            }
            subBtn.removeClass("ks-is-loading");
          });
        });
      }
    },addAvatar: () => {
      let subBtn = $("#add-avatar-btn");
        Main.formControl("#add-avatar", async (form) => {
          Main.confirm({ text: "" }, async () => {
            form.data.action = "add-avatar";
            form.data.id = $j(form.obj).data("id");
           
           let res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
                  Main.notify("Importé avec succéss", "success");
            } else {
              Main.notify(res.msg, "error");
            }
            subBtn.removeClass("ks-is-loading");
          });
        });
      },
  },
  rdv: {
    init: () => {
      UGEST.rdv.addrdv();
      UGEST.rdv.updaterdv();
    },
    addrdv: () => {
      let subBtn = $("#add-rdv-btn");
      if ($j("#add-rdv").count() != 0) {
        subBtn.click(() => {
          $("#add-rdv").submit();
        });

        Main.formControl("#add-rdv", async (form) => {
          Main.confirm({ text: "" }, async () => {       
            form.data.action = "add_rdv";
           // subBtn.addClass("ks-is-loading");
           let res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
                      Main.notify("Votre compte a été créer avec success");
            } else {
              Main.notify(res.msg, "error");
            }
            subBtn.removeClass("ks-is-loading");
          });
        });
      }
    }, 
    updaterdv: () => {
      let subBtn = $("#update-rdv-btn");
      if ($j("#update-rdv").count() != 0) {
        subBtn.click(() => {
          $("#update-rdv").submit();
        });

        Main.formControl("#update-rdv", async (form) => {
          Main.confirm({ text: "" }, async () => {
            form.data.action = "update_rdv";
            form.data.id = $j(form.obj).data("rid");
            //subBtn.addClass("ks-is-loading");
          let  res = JSON.parse(
              await Main.post($j(form.obj).attr("action"), form.data)
            );
            if (res.success) {
                  Main.notify("Randez vous modifié avec succéess");
            } else {
              Main.notify(res.msg, "error");
            }
           // subBtn.removeClass("ks-is-loading");
          });
        });
      }
    },

  }
};

$j(window).load(() => {
  UGEST.user.init();
  UGEST.rdv.init();
});

export default UGEST;
