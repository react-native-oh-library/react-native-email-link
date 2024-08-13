import { EmailException } from "./email-exception";
import EmailLinkNativeModule from './NativeEmailLink';


let emailLinkModules = EmailLinkNativeModule;


export async function getEmailClients() {
 return emailLinkModules.getEmailClients();
}


export async function openInbox(options = {}) {
  return emailLinkModules.openInbox(options);
}


export async function openComposer(options = {}) {
  return emailLinkModules.openComposer(options);
}
