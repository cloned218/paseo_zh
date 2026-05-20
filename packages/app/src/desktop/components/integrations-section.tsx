import { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { ArrowUpRight, Terminal, Blocks, Check } from "lucide-react-native";
import { settingsStyles } from "@/styles/settings";
import { SettingsSection } from "@/screens/settings/settings-section";
import { Button } from "@/components/ui/button";
import { openExternalUrl } from "@/utils/open-external-url";
import { confirmDialog } from "@/utils/confirm-dialog";
import {
  shouldUseDesktopDaemon,
  type SkillOp,
  type SkillsStatus,
} from "@/desktop/daemon/desktop-daemon";
import { useCliInstall, useSkillsStatus } from "@/desktop/hooks/use-install-status";

const CLI_DOCS_URL = "https://paseo.sh/docs/cli";
const SKILLS_DOCS_URL = "https://paseo.sh/docs/skills";
const ROW_WITH_BORDER_STYLE = [settingsStyles.row, settingsStyles.rowBorder];
const UNINSTALL_MESSAGE = "这会从 ~/.agents、~/.claude、~/.codex 中移除所有 Paseo 编排技能。";

const OP_KIND_ORDER: Record<SkillOp["kind"], number> = { add: 0, update: 1, delete: 2 };
const OP_KIND_LABEL: Record<SkillOp["kind"], string> = {
  add: "新增技能",
  update: "更新技能",
  delete: "删除技能",
};

function formatUpdateMessage(ops: readonly SkillOp[]): string {
  const sorted = [...ops].sort((a, b) => {
    const kindOrder = OP_KIND_ORDER[a.kind] - OP_KIND_ORDER[b.kind];
    return kindOrder !== 0 ? kindOrder : a.name.localeCompare(b.name);
  });
  return sorted.map((op) => `${OP_KIND_LABEL[op.kind]} ${op.name}`).join("\n");
}

export function IntegrationsSection() {
  const { theme } = useUnistyles();
  const showSection = shouldUseDesktopDaemon();
  const {
    status: cliStatus,
    isInstalling: isInstallingCli,
    install: installCli,
    refresh: refreshCliStatus,
  } = useCliInstall();
  const {
    status: skillsStatus,
    isWorking: isSkillsWorking,
    install: installSkills,
    update: updateSkills,
    uninstall: uninstallSkills,
    refresh: refreshSkillsStatus,
  } = useSkillsStatus();

  useFocusEffect(
    useCallback(() => {
      if (!showSection) return undefined;
      refreshCliStatus();
      void refreshSkillsStatus();
      return undefined;
    }, [refreshCliStatus, refreshSkillsStatus, showSection]),
  );

  const handleInstallCli = useCallback(() => {
    if (isInstallingCli) return;
    installCli();
  }, [installCli, isInstallingCli]);

  const handleInstallSkills = useCallback(() => {
    if (isSkillsWorking) return;
    void installSkills();
  }, [installSkills, isSkillsWorking]);

  const handleUpdateSkills = useCallback(async () => {
    if (isSkillsWorking) return;
    const ops = skillsStatus?.ops ?? [];
    const confirmed = await confirmDialog({
      title: "更新 Paseo 技能？",
      message: ops.length > 0 ? formatUpdateMessage(ops) : "将内置技能同步到你的设备。",
      confirmLabel: "更新",
    });
    if (!confirmed) return;
    await updateSkills();
  }, [isSkillsWorking, skillsStatus, updateSkills]);

  const handleUninstallSkills = useCallback(async () => {
    if (isSkillsWorking) return;
    const confirmed = await confirmDialog({
      title: "卸载 Paseo 技能？",
      message: UNINSTALL_MESSAGE,
      confirmLabel: "卸载",
      destructive: true,
    });
    if (!confirmed) return;
    await uninstallSkills();
  }, [isSkillsWorking, uninstallSkills]);

  const handleOpenCliDocs = useCallback(() => {
    void openExternalUrl(CLI_DOCS_URL);
  }, []);

  const handleOpenSkillsDocs = useCallback(() => {
    void openExternalUrl(SKILLS_DOCS_URL);
  }, []);

  const arrowIcon = useMemo(
    () => <ArrowUpRight size={theme.iconSize.sm} color={theme.colors.foregroundMuted} />,
    [theme.iconSize.sm, theme.colors.foregroundMuted],
  );

  const trailing = useMemo(
    () => (
      <View style={styles.headerLinks}>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={arrowIcon}
          textStyle={settingsStyles.sectionHeaderLinkText}
          style={settingsStyles.sectionHeaderLink}
          onPress={handleOpenCliDocs}
          accessibilityLabel="打开 CLI 文档"
        >
          CLI 文档
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={arrowIcon}
          textStyle={settingsStyles.sectionHeaderLinkText}
          style={settingsStyles.sectionHeaderLink}
          onPress={handleOpenSkillsDocs}
          accessibilityLabel="打开技能文档"
        >
          技能文档
        </Button>
      </View>
    ),
    [arrowIcon, handleOpenCliDocs, handleOpenSkillsDocs],
  );

  if (!showSection) {
    return null;
  }

  const skillsState = skillsStatus?.state ?? null;

  return (
    <SettingsSection title="集成" trailing={trailing}>
      <View style={settingsStyles.card}>
        <View style={settingsStyles.row}>
          <View style={settingsStyles.rowContent}>
            <View style={styles.rowTitleRow}>
              <Terminal size={theme.iconSize.md} color={theme.colors.foreground} />
              <Text style={settingsStyles.rowTitle}>命令行</Text>
            </View>
            <Text style={settingsStyles.rowHint}>在终端中控制和编排智能体</Text>
          </View>
          {cliStatus?.installed ? (
            <View style={styles.installedLabel}>
              <Check size={14} color={theme.colors.foregroundMuted} />
              <Text style={styles.mutedText}>已安装</Text>
            </View>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onPress={handleInstallCli}
              disabled={isInstallingCli}
            >
              {isInstallingCli ? "安装中..." : "安装"}
            </Button>
          )}
        </View>
        <View style={ROW_WITH_BORDER_STYLE}>
          <View style={settingsStyles.rowContent}>
            <View style={styles.rowTitleRow}>
              <Blocks size={theme.iconSize.md} color={theme.colors.foreground} />
              <Text style={settingsStyles.rowTitle}>编排技能</Text>
            </View>
            <Text style={settingsStyles.rowHint}>
              {skillsState === "drift" ? "有可用更新" : "让你的智能体通过 CLI 进行编排"}
            </Text>
          </View>
          <SkillsActions
            state={skillsState}
            isWorking={isSkillsWorking}
            onInstall={handleInstallSkills}
            onUpdate={handleUpdateSkills}
            onUninstall={handleUninstallSkills}
          />
        </View>
      </View>
    </SettingsSection>
  );
}

interface SkillsActionsProps {
  state: SkillsStatus["state"] | null;
  isWorking: boolean;
  onInstall: () => void;
  onUpdate: () => void;
  onUninstall: () => void;
}

function SkillsActions({ state, isWorking, onInstall, onUpdate, onUninstall }: SkillsActionsProps) {
  const { theme } = useUnistyles();

  if (state === "up-to-date") {
    return (
      <View style={styles.actionsRow}>
        <View style={styles.installedLabel}>
          <Check size={14} color={theme.colors.foregroundMuted} />
          <Text style={styles.mutedText}>已安装</Text>
        </View>
        <Button variant="outline" size="sm" onPress={onUninstall} disabled={isWorking}>
          卸载
        </Button>
      </View>
    );
  }

  if (state === "drift") {
    return (
      <View style={styles.actionsRow}>
        <Button variant="outline" size="sm" onPress={onUpdate} disabled={isWorking}>
          {isWorking ? "处理中..." : "更新"}
        </Button>
        <Button variant="outline" size="sm" onPress={onUninstall} disabled={isWorking}>
          卸载
        </Button>
      </View>
    );
  }

  return (
    <Button variant="outline" size="sm" onPress={onInstall} disabled={isWorking}>
      {isWorking ? "安装中..." : "安装"}
    </Button>
  );
}

const styles = StyleSheet.create((theme) => ({
  headerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[0],
  },
  rowTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
  installedLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mutedText: {
    color: theme.colors.foregroundMuted,
    fontSize: theme.fontSize.sm,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
}));
