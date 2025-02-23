package com.aplicaciones13.base.payload.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserDateAppResponse extends DateAppResponse {

    @Schema(description = "user que realizó el cambio", example = "root")
    private String user;

}
