if (window.rcmail) {
  rcmail.addEventListener('init', function() {
    // remove the user/password/... input from login
    $('form > table > tbody > tr').each(function(){
      $(this).remove();
    });

    // change task & action
    $('form').attr('action', './');
    $('input[name=_task]').attr('value', 'mail');
    $('input[name=_action]').attr('value', '');

    //determine twofactor field type based on config settings
    if(rcmail.env.twofactor_formfield_as_password)
      var twoFactorCodeFieldType = 'password';
    else
      var twoFactorCodeFieldType = 'text';

    // current roundcube skin is "elastic"
    var is_elastic_skin = rcmail.env.skin == 'elastic';

    //twofactor input form
    var text = '';
    if (is_elastic_skin) {
      var text = '';
      text += '<tr class="form-group row">';
      text += '<td class="input input-group input-group-lg"><span class="input-group-prepend"><i class="input-group-text icon pass"></i></span><input name="_code_2FA" id="2FA_code" size="40" class="form-control" autocapitalize="off" autocomplete="one-time-code" maxlength="10" type="' + twoFactorCodeFieldType + '" placeholder="'+rcmail.gettext('two_step_verification_form', 'twofactor_gauthenticator')+'"></td>';
    } else {
      text += '<tr>';
      text += '<td class="title"><label for="2FA_code">'+rcmail.gettext('two_step_verification_form', 'twofactor_gauthenticator')+'</label></td>';
      text += '<td class="input"><input name="_code_2FA" id="2FA_code" size="10" autocapitalize="off" autocomplete="off" type="' + twoFactorCodeFieldType + '" maxlength="10"></td>';
    }
    text += '</tr>';

    // remember option
    if(rcmail.env.allow_save_device_30days){
      if (is_elastic_skin) {
        text += '<tr class="form-group row">';
        text += '<td class="input input-group input-group-lg"><div class="form-check"><input name="_remember_2FA" id="remember_2FA" size="40" class="form-check-input" value="yes" type="checkbox"><label class="form-check-label" for="remember_2FA">'+rcmail.gettext('dont_ask_me_30days', 'twofactor_gauthenticator')+'</label></div></td>';
      } else {
        text += '<tr>';
        text += '<td class="title" colspan="2"><input type="checkbox" id="remember_2FA" name="_remember_2FA" value="yes"/><label for="remember_2FA">'+rcmail.gettext('dont_ask_me_30days', 'twofactor_gauthenticator')+'</label></td>';
      }
      text += '</tr>';
    }

    // create textbox
    $('form > table > tbody:last').append(text);

    // focus
    $('#2FA_code').focus();
  });
};