import { useEffect, useState } from "react";
import { SidebarCalloutDescriptionText } from "@/components/sidebar-callout";
import { getIsElectronMac } from "@/constants/platform";
import { useSidebarCallouts } from "@/contexts/sidebar-callout-context";
import {
  buildMacAppleSiliconDownloadUrl,
  getDesktopRuntimeInfo,
  type DesktopRuntimeInfo,
} from "@/desktop/updates/desktop-updates";
import { useStableEvent } from "@/hooks/use-stable-event";
import { openExternalUrl } from "@/utils/open-external-url";

const FALLBACK_DOWNLOAD_URL = "https://paseo.sh/download";

function RosettaCalloutDescription() {
  return (
    <>
      <SidebarCalloutDescriptionText>
        你正在 Apple Silicon 设备上通过 Rosetta 运行 Paseo 的 Intel 版本。
      </SidebarCalloutDescriptionText>
      <SidebarCalloutDescriptionText>
        这会导致较高的 CPU 占用。下载 Apple Silicon 版本即可解决。
      </SidebarCalloutDescriptionText>
    </>
  );
}

export function RosettaCalloutSource() {
  const callouts = useSidebarCallouts();
  const [runtimeInfo, setRuntimeInfo] = useState<DesktopRuntimeInfo | null>(null);
  const isElectronMac = getIsElectronMac();

  const openDownload = useStableEvent(() => {
    const downloadUrl =
      buildMacAppleSiliconDownloadUrl(runtimeInfo?.appVersion) ?? FALLBACK_DOWNLOAD_URL;
    void openExternalUrl(downloadUrl);
  });

  useEffect(() => {
    if (!isElectronMac) {
      return;
    }

    let cancelled = false;

    void getDesktopRuntimeInfo()
      .then((nextRuntimeInfo) => {
        if (!cancelled) {
          setRuntimeInfo(nextRuntimeInfo);
        }
        return nextRuntimeInfo;
      })
      .catch((error) => {
        console.warn("[RosettaCallout] Failed to load desktop runtime info", error);
      });

    return () => {
      cancelled = true;
    };
  }, [isElectronMac]);

  useEffect(() => {
    if (!isElectronMac || runtimeInfo?.runningUnderARM64Translation !== true) {
      return;
    }

    return callouts.show({
      id: "desktop-rosetta-warning",
      priority: 300,
      title: "下载 Apple Silicon 版本",
      description: <RosettaCalloutDescription />,
      variant: "error",
      dismissible: false,
      actions: [
        {
          label: "下载",
          onPress: openDownload,
          variant: "primary",
        },
      ],
      testID: "rosetta-callout",
    });
  }, [callouts, isElectronMac, openDownload, runtimeInfo]);

  return null;
}
