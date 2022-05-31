const successSingup = (email, name, locale = "ru") => {
	if (locale === "ru") {
		return {
			to: email,
			from: process.env.info_email_from,
			subject: "Успешная регистрация",
			html: `
      <h1>Мы рады приветствовать Вас!</h1>
      <p>Ваша регистрация прошла успешно</p>
      <p>Ваш Email - ${email}</p>
      <p>Ваше имя - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	} else if (locale === "en-US") {
		return {
			to: email,
			from: process.env.info_email_from,
			subject: "Successful registration",
			html: `
      <h1>Welcome!</h1>
      <p>Your account was successful created</p>
      <p>Your Email - ${email}</p>
      <p>Your name - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	} else {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Successful registration",
			html: `
      <h1>Welcome!</h1>
      <p>Your account was successful created</p>
      <p>Your Email - ${email}</p>
      <p>Your name - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	}
};

const newUserMail = (user, locale = "ru") => {
	if (locale === "ru") {
		return {
			to: "brightspilates@gmail.com",
			from: process.env.info_email_from,
			subject: `Регистрация нового пользователя ${user?.name} ${user?.lastName}`,
			html: `
			<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="width:90%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0 auto; max-width:500px;">
  <tbody>
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0" style="width:100%; border-bottom: 1px solid #e4e4e4; padding-bottom: 10px">
          <tbody>
            <tr>
              <td align="left">
                <img src="https://media.publit.io/file/statics/logo-brights-pilates.png" alt="" width="32px" height="32px" />
              </td>
              <td align="right">
                <a href="${process.env.NEXTAUTH_URL}/admin-dashboard" style="text-decoration:none; text-transform:uppercase; color: #797979;font-size: 12px; display:block">Вход в личный кабинет</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border-bottom: 1px solid #e4e4e4;">
          <tbody>
            <tr>
              <td align="center" style="padding-top:30px;">
                <img src="https://media.publit.io/file/statics/user-icon.png" alt="" width="84px" height="84px" />
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 200;line-height: 130%;color:#171717;margin-bottom: 5px;">Новый пользователь</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;"> Имя: ${user?.name}</p>
                <p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;"> Фамилия: ${user?.lastName}</p>
                <p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;"> Почта: ${user?.email}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    `,
		};
	}
};

const resetPasswordMail = (userEmail, token, locale = "ru") => {
	if (locale === "ru") {
		return {
			to: userEmail,
			from: process.env.no_replay_email_from,
			subject: "Изменение пароля от личного кабинета Bright's Pilates",
			html: `
		<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="width:90%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0 auto; max-width:500px;">
  <tbody>
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0" style="width:100%; border-bottom: 1px solid #e4e4e4; padding-bottom: 10px">
          <tbody>
            <tr>
              <td align="left">
                <img src="https://media.publit.io/file/statics/logo-brights-pilates.png" alt="" width="32px" height="32px" />
              </td>
              <td align="right">
                <a href="${process.env.NEXTAUTH_URL}/profile" style="text-decoration:none; text-transform:uppercase; color: #797979;font-size: 12px; display:block">Вход в личный кабинет</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border-bottom: 1px solid #e4e4e4;">
          <tbody>
            <tr>
              <td align="center" style="padding-top:30px;">
                <img src="https://media.publit.io/file/statics/reset_password_icon.png" alt="" width="64px" height="64px" />
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 200;line-height: 130%;color:#171717;margin-bottom: 5px;">Изменение пароля от личного кабинета</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;"> Мы получили запрос на изменение пароля от личного кабинета ${userEmail} на сайте <a href='${process.env.NEXTAUTH_URL}' style="text-decoration:none; color: #51c5cf;font-size: 15px;">brightspilates.com</a>. Для создания нового пароля нажмите на кнопку ниже </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#51c5cf" align="center" style="border-radius: 4px;">
                <a href="${process.env.NEXTAUTH_URL}/auth/new-password/${token}" style="text-transform:uppercase;background:#51c5cf;font-size:13px;font-weight:700;font-family:Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none!important;padding:14px 25px;border-radius:4px;display:block"> Создать новый пароль</a>
              </td>
            </tr>
            <tr>
              <td>
                <p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> Если Вы не запрашивали изменение пароля, проигнорируйте это письмо. </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <tbody>
            <tr>
              <td>
                <p style="color: #666666;font-size: 16px; font-weight: 400;line-height: 170%;"> С уважением, команда <a href='${process.env.NEXTAUTH_URL}' style="text-decoration:none; color: #51c5cf;font-size: 15px;">Bright's Pilates</a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    `,
		};
	} else if (locale === "en") {
		return {
			to: userEmail,
			from: process.env.email_fromM,
			subject: "Reset password",
			html: `
  <h1>Do yuo want change your password?</h1>
  <p>If not, ignore this message</p>
  <p>Or, click this link below:</p>
  <p><a href="${process.env.NEXTAUTH_URL}/auth/new-password/${token}">Создать новый пароль</a></p>
  <hr/>
  <a href='${process.env.NEXTAUTH_URL}'>Shop</a>
  `,
		};
	} else {
		return {
			to: userEmail,
			from: process.env.info_email_from,
			subject: "Reset password",
			html: `
  <h1>Do yuo want change your password?</h1>
  <p>If not, ignore this message</p>
  <p>Or, click this link below:</p>
  <p><a href="${process.env.NEXTAUTH_URL}/auth/new-password/${token}">Создать новый пароль</a></p>
  <hr/>
  <a href='${process.env.NEXTAUTH_URL}'>Shop</a>
  `,
		};
	}
};

module.exports = { successSingup, resetPasswordMail, newUserMail };
