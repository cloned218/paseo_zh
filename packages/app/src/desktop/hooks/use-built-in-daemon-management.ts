import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  type DesktopDaemonStatus,
  startDesktopDaemon,
  stopDesktopDaemon,
} from "@/desktop/daemon/desktop-daemon";
import {
  executeDaemonManagementToggle,
  type DaemonManagementToggleResult,
} from "@/desktop/daemon/daemon-management-toggle";
import { useDesktopIpcErrorReporter } from "@/desktop/hooks/desktop-ipc-error";
import type { DesktopSettings } from "@/desktop/settings/desktop-settings";
import { confirmDialog } from "@/utils/confirm-dialog";

type DesktopDaemonSettings = DesktopSettings["daemon"];

interface UseBuiltInDaemonManagementInput {
  daemonStatus: DesktopDaemonStatus | null;
  settings: DesktopDaemonSettings;
  updateSettings: (next: Partial<DesktopDaemonSettings>) => Promise<unknown>;
  setStatus: (status: DesktopDaemonStatus) => void;
  refreshStatus: () => void;
}

interface UseBuiltInDaemonManagementResult {
  isUpdating: boolean;
  toggle: () => void;
}

export function useBuiltInDaemonManagement(
  input: UseBuiltInDaemonManagementInput,
): UseBuiltInDaemonManagementResult {
  const { daemonStatus, settings, updateSettings, setStatus, refreshStatus } = input;
  const reportError = useDesktopIpcErrorReporter();
  const { mutate: toggleDaemonManagement, isPending: isUpdating } = useMutation<
    DaemonManagementToggleResult,
    Error
  >({
    mutationFn: () =>
      executeDaemonManagementToggle(settings.manageBuiltInDaemon, daemonStatus, {
        confirm: () =>
          confirmDialog({
            title: "暂停内置守护进程",
            message:
              "这会立即停止内置守护进程。所有连接到该守护进程的运行中智能体和终端都会被停止。",
            confirmLabel: "暂停并停止",
            cancelLabel: "取消",
            destructive: true,
          }),
        persistSettings: (next) => updateSettings(next) as Promise<void>,
        startDaemon: startDesktopDaemon,
        stopDaemon: stopDesktopDaemon,
      }),
    onError: (error) => {
      reportError({
        error,
        message: settings.manageBuiltInDaemon
          ? "已暂停内置守护进程管理，但 Paseo 无法停止该守护进程。"
          : "无法更新内置守护进程管理设置。",
        logLabel: "[Settings] Failed to update built-in daemon management",
      });
    },
    onSuccess: (result) => {
      if (result.kind === "cancelled") {
        return;
      }
      if (result.newStatus) {
        setStatus(result.newStatus);
      }
      refreshStatus();
    },
  });

  const toggle = useCallback(() => {
    if (isUpdating) {
      return;
    }

    toggleDaemonManagement();
  }, [isUpdating, toggleDaemonManagement]);

  return { isUpdating, toggle };
}
