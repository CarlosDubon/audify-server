const PANEL_URL = process.env.PANEL_URL || "https://dei.uca.edu.sv/audify";

const tools = {};

tools.getRegisterMailText = (username = "username") => {
  return(`
    <h1> Audify </h1>
    <h2> Make the sound flow within you <h2>
    <hr/><br/>
    <p>
      Welcome to our family, your user <i>${username}</i> was successfully created. From now you can enjoy our AR experience with audio. <b>Hope you enjoy it!</b>
    </p>
    <hr/>
    <br/>
    <p><i>From: Audify &lt;dev/&gt; team</i></p>
  `)
}

tools.getPasswordRecoveryMailText = (token) => {
  return(`
    <h1> Audify </h1>
    <h2> Make the sound flow within you <h2>
    <hr/><br/>
    <p>
      Hi! it seems like you forgot your password. Don't worry, we have a solution to your little problem. Please, click the following link and reset your password. Be more careful the next time.
    </p>
    <p>
      If you did't request for password recovery, just ignore this email. It could be a mistake or something more darker... Don't worry, we have your information safe and sound.
    </p>
    <p>
      Here is the link: <a href="${PANEL_URL}/password-recovery?t=${token}">Password recovery </a>. For security reasons, this link wiil not be available forever, so we suggest using it as soon as posible. Thank you for trusting us, stay safe.
    </p>
    <hr/>
    <br/>
    <p><i>From: Audify &lt;dev/&gt; team</i></p>
  `);
}

module.exports = tools;