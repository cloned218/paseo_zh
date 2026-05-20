import { useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { RotateCw } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { DesktopPermissionRow } from "@/desktop/components/desktop-permission-row";
import { useDesktopPermissions } from "@/desktop/permissions/use-desktop-permissions";
import { settingsStyles } from "@/styles/settings";
import { SettingsSection } from "@/screens/settings/settings-section";

export function DesktopPermissionsSection() {
  const { theme } = useUnistyles();
  const {
    isDesktopApp,
    snapshot,
    isRefreshing,
    requestingPermission,
    isSendingTestNotification,
    testNotificationError,
    refreshPermissions,
    requestPermission,
    sendTestNotification,
  } = useDesktopPermissions();

  const errorTextStyle = useMemo(
    () => [styles.errorText, { color: theme.colors.destructive }],
    [theme.colors.destructive],
  );

  const handleRefreshPress = useCallback(() => {
    void refreshPermissions();
  }, [refreshPermissions]);

  const handleRequestNotifications = useCallback(() => {
    void requestPermission("notifications");
  }, [requestPermission]);

  const handleRequestMicrophone = useCallback(() => {
    void requestPermission("microphone");
  }, [requestPermission]);

  const handleSendTestNotification = useCallback(() => {
    void sendTestNotification();
  }, [sendTestNotification]);

  const isBusy = isRefreshing || requestingPermission !== null;
  const notificationsGranted = snapshot?.notifications.state === "granted";

  const refreshIcon = useMemo(
    () => <RotateCw size={theme.iconSize.md} color={theme.colors.foregroundMuted} />,
    [theme.iconSize.md, theme.colors.foregroundMuted],
  );

  const refreshButton = useMemo(
    () => (
      <Button
        variant="ghost"
        size="sm"
        leftIcon={refreshIcon}
        onPress={handleRefreshPress}
        disabled={isBusy}
        accessibilityLabel="刷新桌面权限"
      >
        {isRefreshing ? "刷新中..." : "刷新"}
      </Button>
    ),
    [refreshIcon, handleRefreshPress, isBusy, isRefreshing],
  );

  if (!isDesktopApp) {
    return null;
  }

  return (
    <SettingsSection title="权限" trailing={refreshButton}>
      <View style={settingsStyles.card}>
        <DesktopPermissionRow
          title="通知"
          status={snapshot?.notifications ?? null}
          isRequesting={requestingPermission === "notifications"}
          onRequest={handleRequestNotifications}
          extraActionLabel="测试"
          isExtraActionBusy={isSendingTestNotification}
          isExtraActionDisabled={!notificationsGranted || isBusy}
          onExtraAction={handleSendTestNotification}
        />
        {testNotificationError ? <Text style={errorTextStyle}>{testNotificationError}</Text> : null}
        <DesktopPermissionRow
          title="麦克风"
          showBorder
          status={snapshot?.microphone ?? null}
          isRequesting={requestingPermission === "microphone"}
          onRequest={handleRequestMicrophone}
        />
      </View>
    </SettingsSection>
  );
}

const styles = StyleSheet.create((theme) => ({
  errorText: {
    fontSize: theme.fontSize.xs,
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[2],
  },
}));
