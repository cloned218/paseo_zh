import { Gift } from "lucide-react-native";
import { type ReactNode, useEffect, useRef } from "react";
import { useUnistyles } from "react-native-unistyles";
import {
  type SidebarCalloutAction,
  SidebarCalloutDescriptionText,
} from "@/components/sidebar-callout";
import { useSidebarCallouts } from "@/contexts/sidebar-callout-context";
import { useDesktopAppUpdater } from "@/desktop/updates/use-desktop-app-updater";
import { useStableEvent } from "@/hooks/use-stable-event";
import { openExternalUrl } from "@/utils/open-external-url";

const CHECK_INTERVAL_MS = 30 * 60 * 1000;
const CHANGELOG_URL = "https://paseo.sh/changelog";

function resolveUpdateCalloutTitle(args: { isInstalling: boolean; isError: boolean }): string {
  if (args.isInstalling) return "正在安装更新";
  if (args.isError) return "更新失败";
  return "发现可用更新";
}

function resolveUpdateCalloutDescription(args: {
  isInstalling: boolean;
  isError: boolean;
  errorMessage: string | null;
  latestVersion: string | undefined;
}): ReactNode {
  if (args.isInstalling) return "正在安装并重启...";
  if (args.isError) return args.errorMessage ?? "出了点问题。";
  if (args.latestVersion) {
    return (
      <UpdateAvailableDescription versionLabel={`v${args.latestVersion.replace(/^v/i, "")}`} />
    );
  }
  return <UpdateAvailableDescription />;
}

function buildUpdateCalloutActions(args: {
  isInstalling: boolean;
  isError: boolean;
  openChangelog: () => void;
  retry: () => void;
  install: () => void;
}): SidebarCalloutAction[] {
  const actions: SidebarCalloutAction[] = [{ label: "查看更新内容", onPress: args.openChangelog }];
  if (args.isError) {
    actions.push({ label: "重试", onPress: args.retry, variant: "primary" });
  } else {
    actions.push({
      label: args.isInstalling ? "安装中..." : "安装并重启",
      onPress: args.install,
      variant: "primary",
      disabled: args.isInstalling,
    });
  }
  return actions;
}

export function UpdateCalloutSource() {
  const callouts = useSidebarCallouts();
  const { theme } = useUnistyles();
  const {
    isDesktopApp,
    status,
    availableUpdate,
    errorMessage,
    checkForUpdates,
    installUpdate,
    isInstalling,
  } = useDesktopAppUpdater();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openChangelog = useStableEvent(() => {
    void openExternalUrl(CHANGELOG_URL);
  });
  const install = useStableEvent(() => {
    void installUpdate();
  });
  const retry = useStableEvent(() => {
    void checkForUpdates();
  });
  useEffect(() => {
    if (!isDesktopApp) return;

    void checkForUpdates({ silent: true });

    intervalRef.current = setInterval(() => {
      void checkForUpdates({ silent: true });
    }, CHECK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDesktopApp, checkForUpdates]);

  useEffect(() => {
    if (!isDesktopApp) {
      return;
    }
    if (status !== "available" && status !== "installing" && status !== "error") {
      return;
    }

    const isError = status === "error";
    const isAvailable = !isInstalling && !isError;

    const title = resolveUpdateCalloutTitle({ isInstalling, isError });
    const description = resolveUpdateCalloutDescription({
      isInstalling,
      isError,
      errorMessage,
      latestVersion: availableUpdate?.latestVersion ?? undefined,
    });
    const actions = buildUpdateCalloutActions({
      isInstalling,
      isError,
      openChangelog,
      retry,
      install,
    });

    return callouts.show({
      id: "desktop-update",
      dismissalKey: `desktop-update:${status}:${availableUpdate?.latestVersion ?? "unknown"}`,
      priority: 200,
      title,
      description,
      icon: isAvailable ? (
        <Gift size={theme.iconSize.sm} color={theme.colors.foregroundMuted} />
      ) : undefined,
      variant: isError ? "error" : "default",
      actions,
      testID: "update-callout",
    });
  }, [
    availableUpdate?.latestVersion,
    callouts,
    errorMessage,
    install,
    isDesktopApp,
    isInstalling,
    openChangelog,
    retry,
    status,
    theme.colors.foregroundMuted,
    theme.iconSize.sm,
  ]);

  return null;
}

function UpdateAvailableDescription({ versionLabel }: { versionLabel?: string }) {
  return (
    <>
      <SidebarCalloutDescriptionText>
        {versionLabel ? `${versionLabel} 已可安装。` : "新版本已可安装。"}
      </SidebarCalloutDescriptionText>
      <SidebarCalloutDescriptionText>
        升级应用会停止正在运行的智能体并关闭终端会话。
      </SidebarCalloutDescriptionText>
    </>
  );
}
