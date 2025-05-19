import { StopwatchIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  IconButton,
  Separator,
  Tooltip,
} from "@radix-ui/themes";
import { useState } from "react";
import { Alerts, MenuTableRefresh } from "../../ConstantsPresentation";
import { IconComponent } from "../icon/IconDynamic";
import { useToastContext } from "../toast/useToastContext";

const MenuTable = ({
  loading,
  handlePaginationPresentation,
  menuTableRefresh,
  children,
}: {
  loading: boolean;
  handlePaginationPresentation: () => void;
  menuTableRefresh: MenuTableRefresh;
  children?: React.ReactNode;
}) => {
  const [timer, setTimer] = useState(false);
  const { showToast } = useToastContext();

  /**
   * Funcion para iniciar o detener el timer.
   *
   * @param statusTimer
   */
  const workTimer = (statusTimer: boolean) => {
    setTimer(!statusTimer);
    if (!timer) {
      showToast(
        "Inicia Timer",
        "Inicia consulta automatica cada 30 segundos",
        Alerts.success
      );
      const intervalId = setInterval(() => {
        handlePaginationPresentation();
      }, 30000);
      window.__tableSearchOrderIntervalId = intervalId;
    } else {
      showToast("Finaliza Timer", "Finaliza consulta automatica", Alerts.info);
      clearInterval(window.__tableSearchOrderIntervalId);
    }
  };

  return menuTableRefresh !== MenuTableRefresh.none || children ? (
    <Box>
      <Card>
        <Flex direction="column" gap="2" align="center">
          {children}
          {children && menuTableRefresh !== MenuTableRefresh.none && (
            <Separator orientation="horizontal" size="4" />
          )}

          {(menuTableRefresh === MenuTableRefresh.refresh ||
            menuTableRefresh === MenuTableRefresh.refreshFull) && (
            <Tooltip content="reload" side="left">
              <IconButton
                radius="full"
                variant="soft"
                loading={loading}
                onClick={() => {
                  handlePaginationPresentation();
                }}
              >
                <IconComponent iconName="ReloadIcon" width="16" height="16" />
              </IconButton>
            </Tooltip>
          )}

          {(menuTableRefresh === MenuTableRefresh.refreshTimmer ||
            menuTableRefresh === MenuTableRefresh.refreshFull) && (
            <Tooltip content="Add to library" side="left">
              <IconButton
                radius="full"
                loading={loading}
                variant={timer ? "solid" : "soft"}
                onClick={() => {
                  workTimer(timer);
                }}
              >
                <StopwatchIcon />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
      </Card>
    </Box>
  ) : (
    <></>
  );
};

export { MenuTable };
