/**
 * React Native Email Link
 *
 * This file supports both iOS and Android、harmony.
 */

import { openInbox, openComposer, getEmailClients } from "./src/harmony";
import { EmailException } from "./src/email-exception";

export { EmailException, openInbox, openComposer, getEmailClients };
