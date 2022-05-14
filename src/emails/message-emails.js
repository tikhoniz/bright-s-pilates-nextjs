const sendUserMessage = ({
	userName,
	userEmail,
	coach,
	subject,
	message,
	whatsappNumber,
	telegramAccount,
}) => {
	return {
		to: "admin@brightspilates.com",
		from: process.env.info_email_from,
		subject: coach
			? `Заявка на персональную тренировку от пользователя ${userName} (${userEmail})`
			: `Сообщение от пользователя ${userName}`,
		html: coach
			? `
			<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="width:90%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0 auto; max-width:500px;">
  <tbody>
    <tr>
      <td colspan="100%" align="center" style="padding-top:30px; ">
        <img src="https://media.publit.io/file/statics/message_icon.png" alt="" width="164px" height="164px" />
      </td>
    </tr>
    <tr>
      <td align="center" colspan="100%">
        <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 200;line-height: 130%;color:#171717;margin-bottom: 15px;">Новая заявка на персональную тренировку от пользователя ${userName}</p>
      </td>
    </tr>
    <tr>
      <td>
        <p style="color: #666666;font-size: 16px; font-weight: 400;  line-height: 170%;">Тренер: ${coach}</p>
      </td>
      <td colspan="2">
        <p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;">Клиент: ${userName} ${userEmail}</p>
      </td>
    </tr>
    <tr style="margin-bottom: 15px;">
      <td colspan="100%">
        <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 22px;font-weight: 400; color:#171717; line-height: 110%;">Способ связи:</p>
      </td>
    </tr>
    <tr>
      <td>
        <p style="color: #666666;font-size: 16px; font-weight: 500;  line-height: 170%;">Whats App:</p>
				<p>${whatsappNumber}</p>

				</td>
      <td>
        <p style="color: #666666;font-size: 16px; font-weight: 500;  line-height: 170%;">Telegram:</p>
				<p>${telegramAccount}</p>
				</td>
      <td>
        <p style="color: #666666;font-size: 16px; font-weight: 500;  line-height: 170%;">Email:</p>
				<p>${userEmail}</p>
				</td>
    </tr>
    <tr>
      <td colspan="100%">
        <p style="color: #666666;font-size: 16px; font-weight: 500; line-height: 170%;">Альтернативный способ связи:</p>
				<p>${message}</p>
      </td>
    </tr>
  </tbody>
</table>
`
			: `
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
        <table border="0" cellpadding="0" cellspacing="0" style="width:100%; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <tbody>
            <tr>
              <td align="center" style="padding-top:30px;">
                <img src="https://media.publit.io/file/statics/message_icon.png" alt="" width="164px" height="164px" />
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 26px;font-weight: 200;line-height: 130%;color:#171717;margin-bottom: 5px;">Новое сообщение от пользователя ${userName} (${userEmail})</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="color: #666666;font-size: 16px; font-weight: 400; line-height: 170%;">Тема сообщения: ${subject}</p>
                  <p style="border: 3px solid #e4e4e4; padding: 15px">${message}</p>
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
};

module.exports = { sendUserMessage };
