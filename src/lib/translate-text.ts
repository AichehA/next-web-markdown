import appConfig from "app-config";

function findValueByKey(object, key) {
  let value;
  if (object !== undefined && object !== null) {
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === "object") {
        value = findValueByKey(object[k], key);
        return value !== undefined;
      }
    });
  }
  return value;
}

export const translateText = (currentLang: string, keyTranslate: string) => {
  const data = appConfig.langTranslates[currentLang];

  const t = (key: string) => {
    const keys = key.split(".");
    let parentData = data;
    if (keys.length > 1) {
      parentData = data[keys[0]];
    }

    return findValueByKey(parentData, keys.slice(-1).toString());
  };

  return t(keyTranslate);
};
