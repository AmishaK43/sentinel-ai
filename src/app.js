import app from "./config/slack.js";

import registerAppMention from "./events/appMention.js";
import registerButtons from "./actions/buttons.js";

registerAppMention(app);
registerButtons(app);

(async () => {
  await app.start();

  console.log("🚀 Sentinel AI is running...");
})();
