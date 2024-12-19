/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

const withLSApplicationQueriesSchemes = (config, schemes) => {
  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }
  if (!Array.isArray(config.ios.infoPlist.LSApplicationQueriesSchemes)) {
    config.ios.infoPlist.LSApplicationQueriesSchemes = [];
  }

  config.ios.infoPlist.LSApplicationQueriesSchemes = [
    ...new Set([
      ...config.ios.infoPlist.LSApplicationQueriesSchemes,
      ...schemes,
    ]),
  ];

  return config;
};

/**
 * Configures Expo
 */
const withEmailLink = (config) => {
  config = withLSApplicationQueriesSchemes(config, [
    "mailto",
    "message",
    "readdle-spark",
    "airmail",
    "ms-outlook",
    "googlegmail",
    "inbox-gmail",
    "ymail",
    "superhuman",
    "yandexmail",
    "fastmail",
    "protonmail",
  ]);
  return config;
};

exports.default = withEmailLink;
