const tools = {};

tools.getRegisterMailText = (username = "username") => {
  return(`
    <h1> Audify </h1>
    <h2> Make the sound flow in you <h2>
    <hr/><br/>
    <p>
      Welcome to our family, your user <i>${username}</i> was successfully created. From now you can enjoy our AR experience with audio. <b>Hope you enjoy it!</b>
    </p>
    <hr/>
    <br/>
    <p><i>From: Audify dev team</i></p>
  `)
}

module.exports = tools;