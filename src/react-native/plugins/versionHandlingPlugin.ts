import { WebViewBridgePlugin } from "@/src/shared/core/Plugin";

type Version = `${number}.${number}.${number}`;
type HandlerFunction = (...params: any[]) => any;
interface VersionHandlers {
  [version: Version]: {
    [functionName: string]: HandlerFunction;
  };
}

export const versionHandlingPlugin = new WebViewBridgePlugin(
  (
    versionHandlers: VersionHandlers,
    currentVersion: Version,
    functionName: keyof VersionHandlers[keyof VersionHandlers],
    ...params: any[]
  ) => {
    const sortedVersions = (Object.keys(versionHandlers) as Version[]).sort(
      compareVersions
    );

    for (let i = 0; i < sortedVersions.length; i++) {
      const version = sortedVersions[i];

      if (compareVersions(version, currentVersion) <= 0) {
        const handlers = versionHandlers[version];
        const handler = handlers[functionName];

        if (handler) {
          handler(...params);
          return;
        }
      }
    }

    console.warn(
      `No handler found for function "${functionName}" and version "${currentVersion}"`
    );
  }
);

const compareVersions = (v1: Version, v2: Version) => {
  const [major1, minor1, patch1] = v1.split(".").map(Number);
  const [major2, minor2, patch2] = v2.split(".").map(Number);

  if (major1 !== major2) return major1 - major2;
  if (minor1 !== minor2) return minor1 - minor2;
  return patch1 - patch2;
};
