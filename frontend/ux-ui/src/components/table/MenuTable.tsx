import {
  Box,
  Flex,
  IconButton,
  Separator,
  Tooltip,
} from "@radix-ui/themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alerts, MenuTableRefresh } from "../../ConstantsPresentation";
import { IconComponent } from "../icon/IconDynamic";
import { useToastContext } from "../toast/useToastContext";

/**
 * Componente para el menú de la tabla.
 *
 * @param loading - Indica si la tabla está cargando.
 * @param handlePaginationPresentation - Función para manejar la presentación de la paginación.
 * @param menuTableRefresh - Tipo de refresco de la tabla.
 * @param children - Elementos secundarios que se mostrarán en el menú.
 *
 * @returns
 */
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
  const [t] = useTranslation("global_ux");
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
        t("menuTable.timer.start"),
        t("menuTable.timer.startDescription"),
        Alerts.success
      );
      const intervalId = setInterval(() => {
        handlePaginationPresentation();
      }, 30000);
      window.__tableSearchOrderIntervalId = intervalId;
    } else {
      showToast(
        t("menuTable.timer.stop"),
        t("menuTable.timer.stopDescription"),
        Alerts.info
      );
      clearInterval(window.__tableSearchOrderIntervalId);
    }
  };

  return menuTableRefresh !== MenuTableRefresh.none || children ? (
    <Box>
      <Flex direction="column" gap="1" align="center">
        {children}
        {children && menuTableRefresh !== MenuTableRefresh.none && (
          <Separator orientation="horizontal" size="4" />
        )}

        {(menuTableRefresh === MenuTableRefresh.refresh ||
          menuTableRefresh === MenuTableRefresh.refreshFull) && (
          <Tooltip content={t("menuTable.refresh.label")} side="left">
            <IconButton
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
          <Tooltip content={t("menuTable.timer.label")} side="left">
            <IconButton
              loading={loading}
              variant={timer ? "solid" : "soft"}
              onClick={() => {
                workTimer(timer);
              }}
            >
              <IconComponent iconName="StopwatchIcon" width="16" height="16" />
            </IconButton>
          </Tooltip>
        )}
      </Flex>
    </Box>
  ) : (
    <></>
  );
};

export { MenuTable };
