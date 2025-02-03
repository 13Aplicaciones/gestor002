package com.aplicaciones13.gestor.payload.common;

import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class DateAppResponse {

    @Schema(description = "Fecha de registro del user", example = "2022-02-02T10:00:00")
    private Date userDate;

    @Schema(description = "App usado para el cambio", example = "AppEjemplo")
    private String userApp;

}
