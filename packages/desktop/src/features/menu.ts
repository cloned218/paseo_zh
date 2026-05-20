import { app, Menu, BrowserWindow, ipcMain } from "electron";
import { getWorkspaceActivePaseoBrowserWebContents } from "./browser-webviews.js";

interface ShowContextMenuInput {
  kind?: "terminal";
  hasSelection?: boolean;
}

function withBrowserWindow(
  callback: (win: BrowserWindow) => void,
): (_item: Electron.MenuItem, baseWin: Electron.BaseWindow | undefined) => void {
  return (_item, baseWin) => {
    const win = baseWin instanceof BrowserWindow ? baseWin : BrowserWindow.getFocusedWindow();
    if (win) callback(win);
  };
}

function getReloadTargetBrowserWebContents(): Electron.WebContents | null {
  return getWorkspaceActivePaseoBrowserWebContents();
}

function reloadFocusedContentsOrWindow(win: BrowserWindow, options?: { ignoreCache?: boolean }) {
  const browserContents = getReloadTargetBrowserWebContents();
  if (browserContents) {
    if (options?.ignoreCache) {
      browserContents.reloadIgnoringCache();
      return;
    }
    if (browserContents.isLoadingMainFrame()) {
      browserContents.stop();
      return;
    }
    browserContents.reload();
    return;
  }

  if (options?.ignoreCache) {
    win.webContents.reloadIgnoringCache();
    return;
  }
  win.webContents.reload();
}

export function setupApplicationMenu(): void {
  const isMac = process.platform === "darwin";

  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" as const },
              { type: "separator" as const },
              { role: "services" as const },
              { type: "separator" as const },
              { role: "hide" as const },
              { role: "hideOthers" as const },
              { role: "unhide" as const },
              { type: "separator" as const },
              { role: "quit" as const },
            ],
          },
        ]
      : []),
    {
      label: "编辑",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
    {
      label: "视图",
      submenu: [
        {
          label: "放大",
          accelerator: "CmdOrCtrl+=",
          click: withBrowserWindow((win) => {
            win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.5);
          }),
        },
        {
          label: "缩小",
          accelerator: "CmdOrCtrl+-",
          click: withBrowserWindow((win) => {
            win.webContents.setZoomLevel(win.webContents.getZoomLevel() - 0.5);
          }),
        },
        {
          label: "实际大小",
          accelerator: "CmdOrCtrl+0",
          click: withBrowserWindow((win) => {
            win.webContents.setZoomLevel(0);
          }),
        },
        { type: "separator" },
        {
          label: "重新加载",
          accelerator: "CmdOrCtrl+R",
          click: withBrowserWindow((win) => {
            reloadFocusedContentsOrWindow(win);
          }),
        },
        {
          label: "强制重新加载",
          accelerator: "CmdOrCtrl+Shift+R",
          click: withBrowserWindow((win) => {
            reloadFocusedContentsOrWindow(win, { ignoreCache: true });
          }),
        },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "窗口",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [{ type: "separator" as const }, { role: "front" as const }]
          : [{ role: "close" as const }]),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  ipcMain.handle("paseo:menu:showContextMenu", (event, input?: ShowContextMenuInput) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return;
    }

    if (input?.kind !== "terminal") {
      return;
    }

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "复制",
        role: "copy",
        enabled: input.hasSelection === true,
      },
      {
        label: "粘贴",
        role: "paste",
      },
      {
        type: "separator",
      },
      {
        label: "全选",
        role: "selectAll",
      },
    ]);

    contextMenu.popup({ window: win });
  });
}
