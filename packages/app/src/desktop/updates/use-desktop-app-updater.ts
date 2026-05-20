import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  checkDesktopAppUpdate,
  formatVersionWithPrefix,
  installDesktopAppUpdate,
  shouldShowDesktopUpdateSection,
  type DesktopAppUpdateCheckResult,
  type DesktopAppUpdateInstallResult,
} from "@/desktop/updates/desktop-updates";
import { useDesktopSettings } from "@/desktop/settings/desktop-settings";
import { useDesktopIpcErrorReporter } from "@/desktop/hooks/desktop-ipc-error";

export type DesktopAppUpdateStatus =
  | "idle"
  | "checking"
  | "pending"
  | "up-to-date"
  | "available"
  | "installing"
  | "installed"
  | "error";

const PENDING_RECHECK_MS = 10_000;

export interface UseDesktopAppUpdaterReturn {
  isDesktopApp: boolean;
  status: DesktopAppUpdateStatus;
  statusText: string;
  availableUpdate: DesktopAppUpdateCheckResult | null;
  errorMessage: string | null;
  lastCheckedAt: number | null;
  isChecking: boolean;
  isInstalling: boolean;
  checkForUpdates: (options?: { silent?: boolean }) => Promise<DesktopAppUpdateCheckResult | null>;
  installUpdate: () => Promise<DesktopAppUpdateInstallResult | null>;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && typeof error.message === "string") {
    return error.message;
  }
  return String(error);
}

function formatStatusText(input: {
  status: DesktopAppUpdateStatus;
  availableUpdate: DesktopAppUpdateCheckResult | null;
  installMessage: string | null;
}): string {
  const { status, availableUpdate, installMessage } = input;

  if (status === "checking") {
    return "正在检查应用更新...";
  }

  if (status === "installing") {
    return "正在安装应用更新...";
  }

  if (status === "up-to-date") {
    return "应用已是最新版本。";
  }

  if (status === "pending") {
    return "更新准备就绪后我们会通知你。";
  }

  if (status === "available") {
    if (availableUpdate?.latestVersion) {
      return `更新已就绪：${formatVersionWithPrefix(availableUpdate.latestVersion)}`;
    }
    return "应用更新已可安装。";
  }

  if (status === "installed") {
    return installMessage ?? "应用更新已安装，需要重启。";
  }

  if (status === "error") {
    return "更新应用失败。";
  }

  return "尚未检查更新状态。";
}

export function useDesktopAppUpdater(): UseDesktopAppUpdaterReturn {
  const isDesktopApp = shouldShowDesktopUpdateSection();
  const { settings: desktopSettings } = useDesktopSettings();
  const releaseChannel = desktopSettings.releaseChannel;
  const reportError = useDesktopIpcErrorReporter();
  const requestVersionRef = useRef(0);
  const [status, setStatus] = useState<DesktopAppUpdateStatus>("idle");
  const [availableUpdate, setAvailableUpdate] = useState<DesktopAppUpdateCheckResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [installMessage, setInstallMessage] = useState<string | null>(null);
  const [lastCheckedAt, setLastCheckedAt] = useState<number | null>(null);
  const { mutateAsync: installAppUpdate, isPending: isInstallingAppUpdate } = useMutation<
    DesktopAppUpdateInstallResult,
    Error
  >({
    mutationFn: () => installDesktopAppUpdate({ releaseChannel }),
    onError: (error) => {
      reportError({
        error,
        message: "无法安装桌面应用更新。",
        logLabel: "[DesktopUpdater] Failed to install app update",
      });
    },
  });

  const checkForUpdates = useCallback(
    async (options: { silent?: boolean } = {}) => {
      if (!isDesktopApp) {
        return null;
      }

      const requestVersion = requestVersionRef.current + 1;
      requestVersionRef.current = requestVersion;

      if (!options.silent) {
        setStatus("checking");
      }
      setErrorMessage(null);

      try {
        const result = await checkDesktopAppUpdate({ releaseChannel });
        if (requestVersion !== requestVersionRef.current) {
          return result;
        }

        setInstallMessage(null);
        setLastCheckedAt(Date.now());

        if (result.readyToInstall) {
          setAvailableUpdate(result);
          setStatus("available");
        } else if (result.hasUpdate) {
          setAvailableUpdate(null);
          setStatus("pending");
        } else {
          setAvailableUpdate(null);
          setStatus("up-to-date");
        }

        return result;
      } catch (error) {
        if (requestVersion !== requestVersionRef.current) {
          return null;
        }

        const message = getErrorMessage(error);
        if (options.silent) {
          console.warn("[DesktopUpdater] Silent update check failed", message);
        } else {
          setStatus("error");
          setErrorMessage(message);
        }
        return null;
      }
    },
    [isDesktopApp, releaseChannel],
  );

  useEffect(() => {
    if (!isDesktopApp) {
      return;
    }

    void checkForUpdates({ silent: true });
  }, [checkForUpdates, isDesktopApp]);

  useEffect(() => {
    if (!isDesktopApp || status !== "pending") {
      return undefined;
    }

    const intervalId = setInterval(() => {
      void checkForUpdates({ silent: true });
    }, PENDING_RECHECK_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [checkForUpdates, isDesktopApp, status]);

  const installUpdate = useCallback(async () => {
    if (!isDesktopApp) {
      return null;
    }

    setStatus("installing");
    setErrorMessage(null);

    try {
      const result = await installAppUpdate();
      setLastCheckedAt(Date.now());

      if (result.installed) {
        setAvailableUpdate(null);
        setInstallMessage(result.message);
        setStatus("installed");
      } else {
        setAvailableUpdate(null);
        setInstallMessage(result.message);
        setStatus("up-to-date");
      }

      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      setStatus("error");
      setErrorMessage(message);
      return null;
    }
  }, [installAppUpdate, isDesktopApp]);

  return {
    isDesktopApp,
    status,
    statusText: formatStatusText({
      status,
      availableUpdate,
      installMessage,
    }),
    availableUpdate,
    errorMessage,
    lastCheckedAt,
    isChecking: status === "checking",
    isInstalling: status === "installing" || isInstallingAppUpdate,
    checkForUpdates,
    installUpdate,
  };
}
