/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import { common, Want } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import Logger from '../utils/Logger';
import { Constants, prefixes, titles } from '../utils/Constants';

export class RNEmailLinkTurboModule extends TurboModule implements TM.EmailLinkNativeModule.Spec {
  private context = getContext(this) as common.UIAbilityContext;

  getEmailClients(): Promise<{ androidPackageName: string; title: string; prefix: string; iOSAppName: string; id: string; harmonyOSBundleName: string }[]> {
    return new Promise((resolve, reject) => {
      let availableApps = [];
      for (let app in prefixes) {
        if (app === Constants.ABILITY_TYPE) {
          availableApps.push(app);
        }
      }
      if (availableApps.length === 0) {
        reject("No email apps available");
      }
      let result = [];
      availableApps.reduce((acc, app) => {
        const title = titles[app] || Constants.EMPTY;
        if (!!title) {
          acc.push({
            androidPackageName: Constants.EMPTY,
            title,
            prefix: Constants.EMPTY,
            iOSAppName: Constants.EMPTY,
            id: title,
            harmonyOSBundleName: title
          });
          result = acc;
        }
        result = acc;
      }, []);
      resolve(result);
    });
  }

  openInbox(inboxOptions: TM.EmailLinkNativeModule.InboxOptions): Promise<{ app: string; title: string; } | null> {
    return new Promise((resolve) => {
      if (!!inboxOptions.app) {
        this.openInboxSingle(inboxOptions.app);
        resolve({ app: inboxOptions.app, title: inboxOptions.title });
      } else {
        this.openInboxPanel();
        resolve(null);
      }
    });
  }

  openInboxPanel() {
    let want: Want = {
      parameters: { linkFeature: Constants.LINK_FEATURE }
    };
    this.startAbility(want);
  }

  openInboxSingle(app: string) {
    let bundleName = Constants.BUNDLE_NAME;
    if (app in prefixes) {
      bundleName = prefixes[app];
    }
    let want: Want = {
      bundleName: bundleName,
      abilityName: Constants.ABILITY_NAME,
    };
    this.startAbility(want);
  }

  openComposer(composeOptions: TM.EmailLinkNativeModule.ComposeOptions): Promise<{ app: string; title: string; } | null> {
    return new Promise((resolve) => {
      if (!!composeOptions.app) {
        this.openComposerSingle(composeOptions);
        resolve({ app: composeOptions.app, title: composeOptions.title });
      } else {
        this.openComposerPanel(composeOptions);
        resolve(null);
      }
    });
  }

  openComposerPanel(composeOptions: TM.EmailLinkNativeModule.ComposeOptions) {
    let wantParam: Record<string, Object> = {
      'sceneType': Constants.SCENE_TYPE,
      'email': [encodeURI(composeOptions.to)],
      'cc': [encodeURI(composeOptions.cc)],
      'bcc': [encodeURI(composeOptions.bcc)],
      'subject': encodeURI(composeOptions.subject),
      'body': !!composeOptions.encodeBody ? encodeURIComponent(encodeURI(composeOptions.body)) :
      encodeURI(composeOptions.body),
      'ability.want.params.uriPermissionFlag': Constants.URI_PERMISSION_FLAG
    };
    let abilityStartCallback: common.AbilityStartCallback = {
      onError: (code: number, name: string, message: string) => {
        Logger.error(`Failed to openComposerPanel abilityStartCallback: code:${code},name:${name},meessage:${message}`);
      }
    }
    this.context.startAbilityByType(Constants.ABILITY_TYPE, wantParam, abilityStartCallback, (err) => {
      if (err) {
        Logger.error(`Failed to startAbilityByType: code:${err.code},meessage:${err.message}`);
      } else {
        Logger.error(`startAbilityByType success`);
      }
    });
  }

  openComposerSingle(composeOptions: TM.EmailLinkNativeModule.ComposeOptions) {
    let bundleName = Constants.BUNDLE_NAME;
    if (composeOptions.app in prefixes) {
      bundleName = prefixes[composeOptions.app];
    }
    let uri = this.composeUri(composeOptions);
    uri = uri.substring(0, uri.length - 1);
    let want: Want = {
      deviceId: Constants.EMPTY,
      bundleName: bundleName,
      abilityName: Constants.ABILITY_NAME,
      uri: uri,
      type: Constants.EMPTY,
      flags: Constants.FLAGS,
      action: Constants.ACTION
    };
    this.startAbility(want);
  }

  composeUri(composeOptions: TM.EmailLinkNativeModule.ComposeOptions): string {
    let uriArray: Array<string> = [];
    !!composeOptions.to ? uriArray.push(Constants.MAILTO + composeOptions.to + Constants.URI_LINK) : Constants.EMPTY;
    !!composeOptions.subject ? uriArray.push(Constants.SUBJECT + composeOptions.subject + Constants.URI_AND) :
    Constants.EMPTY;
    !!composeOptions.cc ? uriArray.push(Constants.CC + composeOptions.cc + Constants.URI_AND) : Constants.EMPTY;
    !!composeOptions.bcc ? uriArray.push(Constants.BCC + composeOptions.bcc + Constants.URI_AND) : Constants.EMPTY;
    if (!!composeOptions.encodeBody) {
      !!composeOptions.body ?
      uriArray.push(Constants.BODY + encodeURIComponent(composeOptions.body) + Constants.URI_AND) : Constants.EMPTY;
    } else {
      !!composeOptions.body ? uriArray.push(Constants.BODY + composeOptions.body + Constants.URI_AND) : Constants.EMPTY;
    }
    return uriArray.join(Constants.EMPTY).replace(Constants.SPACE_REGULARITY, Constants.SPACE_VALUE);
  }

  startAbility(want: Want) {
    this.context.startAbility(want).then(() => {
      Logger.info(`startAbility success`);
    }).catch((error: BusinessError) => {
      Logger.error(`Failed to startAbility: code:${error.code},meessage:${error.message}`);
    });
  }
}
