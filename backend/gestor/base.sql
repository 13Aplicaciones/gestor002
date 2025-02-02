-- "GS_001_01".error definition

-- Drop table

-- DROP TABLE "GS_001_01".error;

CREATE TABLE "GS_001_01".error (
	id_error serial4 NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL, -- UUID del registro para busquedas
	indice varchar(128) NOT NULL, -- Indice de error
	mensaje varchar(1024) NOT NULL, -- Mensaje de error
	descripcion varchar(4098) NULL, -- Descripcion del mensaje de error
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT error_indice_key UNIQUE (indice),
	CONSTRAINT error_pkey PRIMARY KEY (id_error)
);
CREATE UNIQUE INDEX error_indice_idx ON "GS_001_01".error USING btree (indice);

-- Column comments

COMMENT ON COLUMN "GS_001_01".error."uuid" IS 'UUID del registro para busquedas';
COMMENT ON COLUMN "GS_001_01".error.indice IS 'Indice de error';
COMMENT ON COLUMN "GS_001_01".error.mensaje IS 'Mensaje de error';
COMMENT ON COLUMN "GS_001_01".error.descripcion IS 'Descripcion del mensaje de error';
COMMENT ON COLUMN "GS_001_01".error.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".error.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".error.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".informacion definition

-- Drop table

-- DROP TABLE "GS_001_01".informacion;

CREATE TABLE "GS_001_01".informacion (
	id_informacion serial4 NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL, -- UUID del registro para busquedas
	nombre varchar(128) NOT NULL, -- Nombre de la información a relatar
	valor_01 varchar(256) NOT NULL, -- Valor 01
	valor_02 varchar(256) NULL, -- Valor 02
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT informacion_pkey PRIMARY KEY (id_informacion)
);

-- Column comments

COMMENT ON COLUMN "GS_001_01".informacion."uuid" IS 'UUID del registro para busquedas';
COMMENT ON COLUMN "GS_001_01".informacion.nombre IS 'Nombre de la información a relatar';
COMMENT ON COLUMN "GS_001_01".informacion.valor_01 IS 'Valor 01';
COMMENT ON COLUMN "GS_001_01".informacion.valor_02 IS 'Valor 02';
COMMENT ON COLUMN "GS_001_01".informacion.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".informacion.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".informacion.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".modulo definition

-- Drop table

-- DROP TABLE "GS_001_01".modulo;

CREATE TABLE "GS_001_01".modulo (
	id_modulo serial4 NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL, -- UUID del registro para busquedas
	indice varchar(32) NOT NULL, -- Indice con el que se conoce al modulo de forma simplificada
	nombre varchar(128) NOT NULL, -- Nombre del indice
	contexto varchar(128) NOT NULL, -- Contexto de aplicacion
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	estado varchar(8) NULL, -- Estado del listado A=Activo, I=Inactivo y X=Eliminado
	CONSTRAINT modulo_indice_key UNIQUE (indice),
	CONSTRAINT modulo_pkey PRIMARY KEY (id_modulo)
);
CREATE UNIQUE INDEX modulo_indice_idx ON "GS_001_01".modulo USING btree (indice);

-- Column comments

COMMENT ON COLUMN "GS_001_01".modulo."uuid" IS 'UUID del registro para busquedas';
COMMENT ON COLUMN "GS_001_01".modulo.indice IS 'Indice con el que se conoce al modulo de forma simplificada';
COMMENT ON COLUMN "GS_001_01".modulo.nombre IS 'Nombre del indice';
COMMENT ON COLUMN "GS_001_01".modulo.contexto IS 'Contexto de aplicacion';
COMMENT ON COLUMN "GS_001_01".modulo.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".modulo.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".modulo.usuario_programa IS 'Programa usado para el cambio';
COMMENT ON COLUMN "GS_001_01".modulo.estado IS 'Estado del listado A=Activo, I=Inactivo y X=Eliminado';


-- "GS_001_01".usuario definition

-- Drop table

-- DROP TABLE "GS_001_01".usuario;

CREATE TABLE "GS_001_01".usuario (
	id_usuario serial4 NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	id_archivo int4 NULL, -- Codigo de archivos que no tiene obligatoriedad
	nick varchar(128) NULL, -- Nick de Usuario
	nombre varchar(128) NOT NULL, -- Nombre de Usuario
	apellido varchar(128) NOT NULL, -- Apellido de Usuario
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	validador varchar(512) NOT NULL, -- Campo de validacion para los registros
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	estado varchar(8) NULL, -- Listado de CDU + A=Activo, X=Borrado, S=Suspendido
	contador_ingreso int4 NULL, -- Contador de ingreso para validar el bloqueo tercer intento fallido.
	contador_fecha timestamp NULL, -- Fecha de actualizadion del concontar para bloquear por  (parametrizad)  horas o dias de inactividad
	CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
);
CREATE UNIQUE INDEX usuario_nick_idx ON "GS_001_01".usuario USING btree (nick);

-- Column comments

COMMENT ON COLUMN "GS_001_01".usuario.id_archivo IS 'Codigo de archivos que no tiene obligatoriedad';
COMMENT ON COLUMN "GS_001_01".usuario.nick IS 'Nick de Usuario';
COMMENT ON COLUMN "GS_001_01".usuario.nombre IS 'Nombre de Usuario';
COMMENT ON COLUMN "GS_001_01".usuario.apellido IS 'Apellido de Usuario';
COMMENT ON COLUMN "GS_001_01".usuario.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".usuario.validador IS 'Campo de validacion para los registros';
COMMENT ON COLUMN "GS_001_01".usuario.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".usuario.usuario_programa IS 'Programa usado para el cambio';
COMMENT ON COLUMN "GS_001_01".usuario.estado IS 'Listado de CDU + A=Activo, X=Borrado, S=Suspendido';
COMMENT ON COLUMN "GS_001_01".usuario.contador_ingreso IS 'Contador de ingreso para validar el bloqueo tercer intento fallido.';
COMMENT ON COLUMN "GS_001_01".usuario.contador_fecha IS 'Fecha de actualizadion del concontar para bloquear por  (parametrizad)  horas o dias de inactividad';


-- "GS_001_01".codigo_definido_usuario definition

-- Drop table

-- DROP TABLE "GS_001_01".codigo_definido_usuario;

CREATE TABLE "GS_001_01".codigo_definido_usuario (
	id_codigo_definido_usuario serial4 NOT NULL,
	id_modulo int4 NOT NULL, -- Id del modulo al que pertenece el listado
	grupo varchar(8) NOT NULL, -- Grupo que es un recursivo de CDU
	codigo_texto varchar(8) NOT NULL, -- Codigo Texto que sera devuelto
	codigo_numero int4 NOT NULL, -- Codigo Numerico que sera usado
	nombre varchar(64) NOT NULL, -- Nombre Visble en el combo box
	descripcion varchar(512) NULL, -- Descripcion de ser necesario
	orden int4 NOT NULL, -- Orden del codigo
	estado varchar(8) NOT NULL, -- Si el campo esta o no activo
	usuario varchar(128) NOT NULL, -- Usuario que ingresado el codigo
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT codigo_definido_usuario_pkey PRIMARY KEY (id_codigo_definido_usuario),
	CONSTRAINT codigo_definido_usuario_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES "GS_001_01".modulo(id_modulo)
);
CREATE INDEX codigo_definido_usuario_codigo_numero_idx ON "GS_001_01".codigo_definido_usuario USING btree (codigo_numero);
CREATE INDEX codigo_definido_usuario_codigo_texto_idx ON "GS_001_01".codigo_definido_usuario USING btree (codigo_texto);
CREATE INDEX codigo_definido_usuario_id_modulo_idx ON "GS_001_01".codigo_definido_usuario USING btree (id_modulo, grupo);

-- Column comments

COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.id_modulo IS 'Id del modulo al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.grupo IS 'Grupo que es un recursivo de CDU';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.codigo_texto IS 'Codigo Texto que sera devuelto';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.codigo_numero IS 'Codigo Numerico que sera usado';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.nombre IS 'Nombre Visble en el combo box';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.descripcion IS 'Descripcion de ser necesario';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.orden IS 'Orden del codigo';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.estado IS 'Si el campo esta o no activo';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.usuario IS 'Usuario que ingresado el codigo';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".codigo_definido_usuario.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".menu definition

-- Drop table

-- DROP TABLE "GS_001_01".menu;

CREATE TABLE "GS_001_01".menu (
	id_menu serial4 NOT NULL,
	id_modulo int4 NULL, -- Id del modulo al que pertenece el listado
	tipo varchar(8) NOT NULL, -- Tipo de menu que se presenta D=Dashboard, E=encabezado, P=pie, ets
	indice varchar(32) NOT NULL, -- Indice del menu
	nombre varchar(128) NOT NULL, -- Nombre del menu
	ruta_flujo varchar(128) NOT NULL, -- Ruta o flujo del menu
	estado varchar(8) NULL, -- Listado de CDU + X=inactivo A=Activo, U=Bloqueado por Uso
	orden int4 DEFAULT 0 NULL, -- Orden del menu
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT menu_indice_key UNIQUE (indice),
	CONSTRAINT menu_pkey PRIMARY KEY (id_menu),
	CONSTRAINT menu_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES "GS_001_01".modulo(id_modulo)
);
CREATE UNIQUE INDEX menu_indice_idx ON "GS_001_01".menu USING btree (indice);

-- Column comments

COMMENT ON COLUMN "GS_001_01".menu.id_modulo IS 'Id del modulo al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".menu.tipo IS 'Tipo de menu que se presenta D=Dashboard, E=encabezado, P=pie, ets';
COMMENT ON COLUMN "GS_001_01".menu.indice IS 'Indice del menu';
COMMENT ON COLUMN "GS_001_01".menu.nombre IS 'Nombre del menu';
COMMENT ON COLUMN "GS_001_01".menu.ruta_flujo IS 'Ruta o flujo del menu';
COMMENT ON COLUMN "GS_001_01".menu.estado IS 'Listado de CDU + X=inactivo A=Activo, U=Bloqueado por Uso';
COMMENT ON COLUMN "GS_001_01".menu.orden IS 'Orden del menu';
COMMENT ON COLUMN "GS_001_01".menu.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".menu.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".menu.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".parametro definition

-- Drop table

-- DROP TABLE "GS_001_01".parametro;

CREATE TABLE "GS_001_01".parametro (
	id_parametro serial4 NOT NULL,
	id_modulo int4 NULL, -- Id del modulo al que pertenece el listado
	indice varchar(32) NOT NULL, -- Indice del parametro
	clave varchar(8) NULL, -- Listado de CDU + E=encriptado, TP=texto plano
	nombre varchar(128) NOT NULL, -- Nombre del parametro
	descripcion varchar(512) NULL, -- Desdripcion de parametro y su uso
	valor_texto_01 varchar(256) NULL, -- Valor texto del parametro
	valor_texto_02 varchar(256) NULL, -- Valor texto del parametro
	valor_numero_01 float8 NULL, -- Valor numerico del parametro
	valor_numero_02 float8 NULL, -- Valor numerico del parametro
	default_texto_01 varchar(256) NULL, -- Descripcion default del parametro para informacion
	default_texto_02 varchar(256) NULL, -- Descripcion default del parametro para informacion
	default_numero_01 float8 NULL, -- Descripcion default del parametro para informacion
	default_numero_02 float8 NULL, -- Descripcion default del parametro para informacion
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT parametro_indice_key UNIQUE (indice),
	CONSTRAINT parametro_pkey PRIMARY KEY (id_parametro),
	CONSTRAINT parametro_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES "GS_001_01".modulo(id_modulo)
);
CREATE UNIQUE INDEX parametro_indice_idx ON "GS_001_01".parametro USING btree (indice);

-- Column comments

COMMENT ON COLUMN "GS_001_01".parametro.id_modulo IS 'Id del modulo al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".parametro.indice IS 'Indice del parametro';
COMMENT ON COLUMN "GS_001_01".parametro.clave IS 'Listado de CDU + E=encriptado, TP=texto plano';
COMMENT ON COLUMN "GS_001_01".parametro.nombre IS 'Nombre del parametro';
COMMENT ON COLUMN "GS_001_01".parametro.descripcion IS 'Desdripcion de parametro y su uso';
COMMENT ON COLUMN "GS_001_01".parametro.valor_texto_01 IS 'Valor texto del parametro';
COMMENT ON COLUMN "GS_001_01".parametro.valor_texto_02 IS 'Valor texto del parametro';
COMMENT ON COLUMN "GS_001_01".parametro.valor_numero_01 IS 'Valor numerico del parametro';
COMMENT ON COLUMN "GS_001_01".parametro.valor_numero_02 IS 'Valor numerico del parametro';
COMMENT ON COLUMN "GS_001_01".parametro.default_texto_01 IS 'Descripcion default del parametro para informacion';
COMMENT ON COLUMN "GS_001_01".parametro.default_texto_02 IS 'Descripcion default del parametro para informacion';
COMMENT ON COLUMN "GS_001_01".parametro.default_numero_01 IS 'Descripcion default del parametro para informacion';
COMMENT ON COLUMN "GS_001_01".parametro.default_numero_02 IS 'Descripcion default del parametro para informacion';
COMMENT ON COLUMN "GS_001_01".parametro.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".parametro.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".parametro.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".rol definition

-- Drop table

-- DROP TABLE "GS_001_01".rol;

CREATE TABLE "GS_001_01".rol (
	id_rol serial4 NOT NULL,
	id_modulo int4 NULL, -- Id del modulo al que pertenece el listado
	nombre varchar(128) NOT NULL, -- Nombre del rol
	tipo varchar(8) NOT NULL, -- Listado de CDU + ROLES Maestro de roles es un CDU
	estado varchar(8) NULL, -- Listado de CDU + A=Activo, X=Borrado, etc
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT rol_pkey PRIMARY KEY (id_rol),
	CONSTRAINT rol_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES "GS_001_01".modulo(id_modulo)
);

-- Column comments

COMMENT ON COLUMN "GS_001_01".rol.id_modulo IS 'Id del modulo al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".rol.nombre IS 'Nombre del rol';
COMMENT ON COLUMN "GS_001_01".rol.tipo IS 'Listado de CDU + ROLES Maestro de roles es un CDU';
COMMENT ON COLUMN "GS_001_01".rol.estado IS 'Listado de CDU + A=Activo, X=Borrado, etc';
COMMENT ON COLUMN "GS_001_01".rol.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".rol.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".rol.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".rol_usuario definition

-- Drop table

-- DROP TABLE "GS_001_01".rol_usuario;

CREATE TABLE "GS_001_01".rol_usuario (
	id_rol_usuario serial4 NOT NULL,
	id_rol int4 NOT NULL, -- Id de roles al que pertenece el listado
	id_usuario int4 NOT NULL, -- Id de usuario  al que pertenece el listado
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT rol_usuario_pkey PRIMARY KEY (id_rol_usuario),
	CONSTRAINT rol_usuario_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES "GS_001_01".rol(id_rol),
	CONSTRAINT rol_usuario_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES "GS_001_01".usuario(id_usuario)
);

-- Column comments

COMMENT ON COLUMN "GS_001_01".rol_usuario.id_rol IS 'Id de roles al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".rol_usuario.id_usuario IS 'Id de usuario  al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".rol_usuario.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".rol_usuario.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".rol_usuario.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01"."token" definition

-- Drop table

-- DROP TABLE "GS_001_01"."token";

CREATE TABLE "GS_001_01"."token" (
	id_token serial4 NOT NULL,
	id_usuario int4 NOT NULL, -- Id de usuario al que pertenece el listado
	tipo varchar(8) NOT NULL, -- Listado de CDU + Tipo de token servidor o la encripcion utilizada para guardar el campo
	social_nick varchar(256) NOT NULL, -- Nick social
	correo varchar(256) NULL, -- Correo del usuario para interacciones del seguridad
	"token" varchar(512) NOT NULL, -- Token
	validador varchar(512) NOT NULL, -- Validador
	estado varchar(8) NOT NULL, -- Listado de CDU + A=Activo, C=Cambio Clave, ETC
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT token_pkey PRIMARY KEY (id_token),
	CONSTRAINT token_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES "GS_001_01".usuario(id_usuario) ON DELETE CASCADE
);
CREATE INDEX token_correo_idx ON "GS_001_01".token USING btree (correo);
CREATE INDEX token_social_nick_idx ON "GS_001_01".token USING btree (social_nick);

-- Column comments

COMMENT ON COLUMN "GS_001_01"."token".id_usuario IS 'Id de usuario al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01"."token".tipo IS 'Listado de CDU + Tipo de token servidor o la encripcion utilizada para guardar el campo';
COMMENT ON COLUMN "GS_001_01"."token".social_nick IS 'Nick social';
COMMENT ON COLUMN "GS_001_01"."token".correo IS 'Correo del usuario para interacciones del seguridad';
COMMENT ON COLUMN "GS_001_01"."token"."token" IS 'Token';
COMMENT ON COLUMN "GS_001_01"."token".validador IS 'Validador';
COMMENT ON COLUMN "GS_001_01"."token".estado IS 'Listado de CDU + A=Activo, C=Cambio Clave, ETC';
COMMENT ON COLUMN "GS_001_01"."token".usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01"."token".usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01"."token".usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".token_servidor definition

-- Drop table

-- DROP TABLE "GS_001_01".token_servidor;

CREATE TABLE "GS_001_01".token_servidor (
	id_token_servidor serial4 NOT NULL,
	id_token int4 NULL, -- Id del token al que pertenece el listado
	tipo varchar(8) NOT NULL, -- Listado de CDU + Tipo de token servidor o la encripcion utilizada para guardar el campo
	"token" varchar(512) NULL, -- Token
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT token_servidor_pkey PRIMARY KEY (id_token_servidor),
	CONSTRAINT token_servidor_id_token_fkey FOREIGN KEY (id_token) REFERENCES "GS_001_01"."token"(id_token)
);

-- Column comments

COMMENT ON COLUMN "GS_001_01".token_servidor.id_token IS 'Id del token al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".token_servidor.tipo IS 'Listado de CDU + Tipo de token servidor o la encripcion utilizada para guardar el campo';
COMMENT ON COLUMN "GS_001_01".token_servidor."token" IS 'Token';
COMMENT ON COLUMN "GS_001_01".token_servidor.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".token_servidor.usuario_programa IS 'Programa usado para el cambio';


-- "GS_001_01".permiso definition

-- Drop table

-- DROP TABLE "GS_001_01".permiso;

CREATE TABLE "GS_001_01".permiso (
	id_permiso serial4 NOT NULL,
	id_menu int4 NULL, -- Id del menu al que pertenece el listado
	id_rol int4 NULL, -- Id del rol al que pertenece el listado
	crear varchar(8) NOT NULL, -- Permiso de crear
	actualizar varchar(8) NOT NULL, -- Permiso de actualizar
	borrar varchar(8) NOT NULL, -- Permiso de borrar
	ver_auditoria varchar(8) NOT NULL, -- Permiso de ver auditoria
	usuario varchar(128) NOT NULL, -- Usuario que realizo el cambio
	usuario_fecha timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Fecha de insercion del registro
	usuario_programa varchar(256) NOT NULL, -- Programa usado para el cambio
	CONSTRAINT permiso_pkey PRIMARY KEY (id_permiso),
	CONSTRAINT permiso_id_menu_fkey FOREIGN KEY (id_menu) REFERENCES "GS_001_01".menu(id_menu) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT permiso_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES "GS_001_01".rol(id_rol) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Column comments

COMMENT ON COLUMN "GS_001_01".permiso.id_menu IS 'Id del menu al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".permiso.id_rol IS 'Id del rol al que pertenece el listado';
COMMENT ON COLUMN "GS_001_01".permiso.crear IS 'Permiso de crear';
COMMENT ON COLUMN "GS_001_01".permiso.actualizar IS 'Permiso de actualizar';
COMMENT ON COLUMN "GS_001_01".permiso.borrar IS 'Permiso de borrar';
COMMENT ON COLUMN "GS_001_01".permiso.ver_auditoria IS 'Permiso de ver auditoria';
COMMENT ON COLUMN "GS_001_01".permiso.usuario IS 'Usuario que realizo el cambio';
COMMENT ON COLUMN "GS_001_01".permiso.usuario_fecha IS 'Fecha de insercion del registro';
COMMENT ON COLUMN "GS_001_01".permiso.usuario_programa IS 'Programa usado para el cambio';