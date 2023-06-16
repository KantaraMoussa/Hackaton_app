<a href="#" class="close" data-bs-dismiss="modal" aria-label="Close"> <em class="icon ni ni-cross-sm"></em></a>
                <div class="modal-body modal-body-md">
                  
                    <form method="post" action="{{ 'admin/crud' | url }}" id="changeUser_Password" class="pt-2" data-uid="{{user.getId()}}">
                        <div class="row gy-3 gx-gs">
                        <div class="col-12">
                                <div class="form-group">
                                    <label class="form-label" for="lastPassword">Ancien Mot de Pass (*) </label>
                                    <div class="form-control-wrap">
                                        <input data-required="yes" type="text" placeholder="**********" class="form-control" name="lastPassword" id="lastPassword">
                                    </div>
                                </div><!-- .form-group -->
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label" for="newPassword">Nouveaux Mot de Pass</label>
                                    <div class="form-control-wrap">
                                        <input data-required="yes" type="password" placeholder="**********" class="form-control" name="newPassword" id="newPassword">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label class="form-label" for="confirmNewPassword">Confirmez le Mot de Pass</label>
                                    <div class="form-control-wrap">
                                        <input data-required="yes" type="password" placeholder="**********" class="form-control" id="confirmNewPassword" name="confirmNewPassword" >
                                    </div>
                                </div><!-- .form-group -->
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Enregistré</button>
                                </div><!-- .form-group -->
                            </div>
                        </div>
                    </form>
                </div>
