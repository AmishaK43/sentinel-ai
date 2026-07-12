import app from "./config/slack.js";

import registerAppMention from "./events/appMention.js";
import registerButtons from "./actions/buttons.js";

registerAppMention(app);
registerButtons(app);

app.receiver.router.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log(
    `🚀 Sentinel AI running on port ${process.env.PORT || 3000}`
  );
})();